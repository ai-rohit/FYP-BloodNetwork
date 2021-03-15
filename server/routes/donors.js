const express = require("express");
const router = express.Router();

const db = require("../dbconfig");
const isLoggedIn = require("../middleware/user-authentication");

router.get("/:location/:bloodType", isLoggedIn.isLoggedIn, (req,res)=>{

    var district = req.params.location;
    var bloodType = req.params.bloodType;
    var userId = req.user.userId;
    db.query("SELECT * FROM donor_details inner join user_details on donor_details.donorId = user_details.userId where donor_details.donorDistrict = ? and donor_details.bloodType=? and user_details.userId !=?",[district, bloodType, userId], (error,results)=>{
        if(error){
            return res.send({status: false, message:"Something went wrong"});
        }

        if(results.length>0){
            return res.send(results);
        }else{
            return res.send({message: "Not available",
                    status: false})
        }
    });

});

module.exports = router;