const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

//register end point
router.post('/register', (req, res) => {
    const validationResult = validateRegisterInput(req.body);
    console.log(validationResult);
    //check validation
    if(!validationResult.isValid) {
        return res.status(400).json(validationResult.errors);
    } 

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            //hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    }); 
});

//login
router.post('/login', (req, res) => {
    const validationResult = validateLoginInput(req.body);

    if(!validationResult.isValid){
        return res.status(400).json(validationResult.errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email }).then(user => {
        if(!user) {
            return res.status(404).json({ emailnotfound: "Email not found"});
        }

        // check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                //create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username
                }

                //sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400)
                    .json({ passwordincorrect: "Password incorrect"});
            }
        })
    });
});


module.exports = router;