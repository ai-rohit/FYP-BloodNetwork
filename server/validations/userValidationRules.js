const {body} = require("express-validator");

const userValidationRules=()=>{
    return [
        body('firstName').exists().withMessage("First name is missing").isLength({min: 2, max:50}).withMessage("First name should be 2 to 50 charcaters"),
        body('lastName').exists().withMessage("Last name is missing").isLength({min: 2, max:50}).withMessage("Last name should be 2 to 50 charcaters"),
        body('address').exists().withMessage("Address is missing").isLength({min: 3, max:50}).withMessage("Address should be 3 to 50 charcaters"),
        body('emailAddress').exists().withMessage("Email Address is missing").isLength({min: 2, max:100}).withMessage("Email should be 2 to 50 charcaters").isEmail().withMessage("Email is not valid"),
        body('password').exists().withMessage("Password is missing").isLength({min: 8, max:16}).withMessage("First name should be 8 to 16 charcaters")
    ];
}

module.exports = userValidationRules;