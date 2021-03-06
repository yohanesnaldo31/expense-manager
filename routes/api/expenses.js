const express = require('express');
const router = express.Router();
const passport = require('passport');

const Expense = require('../../models/Expense');


//get expenses
router.get('/getAll', passport.authenticate('jwt', { session: false }), (req, res) => {
    const ownerId = req.user.id;
    
    Expense.find({ owner: ownerId })
        .then(expense => {
        
            res.status(200).json(expense);
        })
        .catch(err => {
            console.log(err);
        })

});


//insert expense
router.post(
    "/insert",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const ownerId = req.user.id;
  
      const newExpense = new Expense({
        owner: ownerId,
        description: req.body.description,
        value: req.body.value,
        month: req.body.month,
        year: req.body.year
      });
  
      newExpense.save()
        .then(expense => res.json(expense));
    }
  );


  module.exports = router;