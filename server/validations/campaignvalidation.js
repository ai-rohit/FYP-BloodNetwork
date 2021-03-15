const {body} = require("express-validator");

function campaignValidationRules(){
    return [
        body('campaignName').exists().withMessage("Name/Tile is missing").isString().isLength({min: 3, max: 50}).withMessage("The title/name of the campaign should not exceed 50 characters and should be more than 2 charcters"),
        body('campaignDetails').exists().withMessage("Details of campaign is missing").isString().isLength({min: 30, max:150}).withMessage("The details of the campaign should not exceed 150 characters and should be more than 30 charcters"),
        body('campaignDistrict').exists().withMessage("District is missing").isString().isLength({min:3, max:35}).withMessage("The District of the campaign should not exceed 35 characters and should be more than 2 charcters"),
        body('campaignLocation').exists().withMessage("Location is missing").isString().isLength({min:3, max:70}).withMessage("The location of the campaign should not exceed 70 characters and should be more than 2 charcters")
    ];
}

module.exports = campaignValidationRules;
