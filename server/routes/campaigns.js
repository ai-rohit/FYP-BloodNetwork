const express = require("express");
const db = require("../dbconfig");
const {validationResult} = require("express-validator");
const isLoggedIn = require("../middleware/user-authentication");
const validationRules = require("../validations/campaignvalidation");
const {campaignsAuthorization} = require("../middleware/authorization");

const router = express.Router();

router.get("/",isLoggedIn.isLoggedIn, (req, res)=>{
    db.query("SELECT * FROM campaigns_details", (error, result)=>{
        if(error) return res.send({status: false, message: "No capmpaigns till date"}); 

        return res.send({status: true, message: "found something", result: result});
    })
});

router.post("/",isLoggedIn.isLoggedIn, campaignsAuthorization, validationRules(), (req, res)=>{
    const campaignDetails={
        campaignName : req.body.campaignName,
        campaignDetails: req.body.campaignDetails,
        campaignDistrict: req.body.campaignDistrict,
        campaignLocation: req.body.campaignLocation,
        campaignDate: Date.now()
    };

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const param = errors.array()[0].param;
        const error = errors.array()[0].msg;
        return res.status(400).send({status: "fail", data:{[param]:error}});
    }
    try{
        db.query("Insert into campaign_details set ?", [campaignDetails], (error, campaign)=>{
            if(error){
                return res.status(400).send({status: "error", message: error.message});
            }

            return res.status(200).send({status:"success", data:{campaign: campaign}});
        });
    }catch(ex){
        return res.status(400).send({status: error, message: ex.message});
    }
});

module.exports = router;