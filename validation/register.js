const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInputData(data) {
    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2= !isEmpty(data.password2) ? data.password2 : "";

    //username check
    if(validator.isEmpty(data.username)) {
        errors.username = "Name field is required";
    }

    //email check
    if(validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }else if(!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //password check
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } else if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password must be at least 5 characters";
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    } else if(!validator.equals(data.password, data.password2)){
        errors.password2 = "Passwords must match";
    }
    
    

    return {
        errors, 
        isValid: isEmpty(errors)
    };
}