const {body} = require("express-validator");

function donorValidationRules(){
    return [
        body("firstName").exists().withMessage("First Name missing").isLength({min:2, max: 50}).withMessage("First Name should be 2 to 50 charcters"),
        body("lastName").exists().withMessage("Last Name missing").isLength({min:2, max: 50}).withMessage("Last Name should be 2 to 50 charcters"),
        body("address").exists().withMessage("Address missing").isLength({min:3, max: 70}).withMessage("Address should be 3 to 70 charcters"),
        body("district").exists().withMessage("District Name missing").isLength({min:2, max: 50}).withMessage("District should be 2 to 50 charcters"),
        body("province").exists().withMessage("Province missing").isLength({min:3, max: 40}).withMessage("Province should be 3 to 40 charcters"),
        body("mobileNum").exists().withMessage("Contact missing").isLength({min:9, max: 13}).withMessage("Enter a valid contact"),
        body("bloodType").exists().withMessage("Blood Type missing").isLength({min:1, max: 10}).withMessage("Blood Type should be 1 to 10 charcters"),
        body("gender").exists().withMessage("Gender missing").isLength({min:2, max: 10}).withMessage("Gender should be 2 to 10 charcters"),
        body('dob').exists().withMessage("DOB missing").trim().isDate().withMessage("Date not valid"),
        body("showContact").exists().withMessage("Missing option for displaying contatc").isLength({min:4, max:5})
    ]
}

module.exports = donorValidationRules;