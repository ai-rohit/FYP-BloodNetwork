const express = require("express");
const db = require("../dbconfig");
const {validationResult} = require("express-validator");
const isLoggedIn = require("../middleware/user-authentication");
const validationRules = require("../validations/campaignvalidation");
const {campaignsAuthorization} = require("../middleware/authorization");

const router = express.Router();

router.get("/",isLoggedIn.isLoggedIn, (req, res)=>{
    db.query("SELECT * FROM campaign_details", (error, result)=>{
        if(error) return res.send({status: false, message: error.message}); 

        return res.send({status: true, message: "found something", data: result});
    })
});

router.post("/",isLoggedIn.isLoggedIn, campaignsAuthorization, validationRules(), (req, res)=>{
    const campaignDetails={
        campaignName : req.body.campaignName,
        campaignDetails: req.body.campaignDetails,
        campaignDistrict: req.body.campaignDistrict,
        campaignLocation: req.body.campaignLocation,
        campaignDate: req.body.campaignDate
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

router.post("/update", (req,res)=>{
    if(!req.body){
        return res.json({message: "Data cant be empty"});
    }
    const id = req.body.id;
    db.query("Select * from campaign_details where campaignId = ?", [id], (error, result)=>{
        if(!result){
            return res.json({message: "No data found"});
        }else{
            db.query("Update campaign_details set campaignName='"+req.body.campaignName+"',campaignDetails='"+req.body.campaignDetails+"',campaignDistrict='"+req.body.campaignDistrict+"',campaignLocation='"+req.body.campaignLocation+"',campaignDate='"+req.body.campaignDate+"' where campaignId=?",[id],(error, results)=>{
                if(error){
                   return res.json({message: "Something went wrong"});
                }
                console.log(req.body);
                return res.redirect("/admin/campaigns");
            })
        }
    })
});

router.get("/delete/:id", (req, res)=>{
   
        const id = req.params.id;
        db.query("Select * from campaign_details where campaignId = ?", [id], (error, result)=>{
            if(error) return res.json({status: "error", message: "Something went wrong"});
            if(!result) return res.json({status: "fail", message:"Data didn't exist"});
            db.query("Delete from campaign_details where campaignId=?",[id], (error, result)=>{
                if(error){
                    return res.json({message:"Something went wrong"});
                }else{
                    return res.redirect("/admin/campaigns");
                }
            }); 
        });
});

module.exports = router;