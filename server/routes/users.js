const express = require('express');
const db = require("../dbconfig");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {isLoggedIn} = require("../middleware/user-authentication");
const {campaignsAuthorization} = require("../middleware/authorization");
router.get("/", async(req, res)=>{
    const table = "user_details";
    try{
        await db.query("Select * from ??", [table], async(error, user)=>{
            if(error) return res.status(400).send({status: "error", message:error.message});

            return res.status(200).send({status: "success", data:{user: user}});
        });
    }catch(ex){
        return res.status(400).send({status: "error", message:ex.message});
    }
});

router.post("/", isLoggedIn, campaignsAuthorization, async(req, res)=>{
    const {firstName, lastName, address, emailAddress, password, role} = req.body;
    db.query("SELECT emailAddress From user_details where emailAddress = ?", [emailAddress], async (error,result)=>{
        if(error){
            return res.status(400).send({status: "error", message: error.message});
        }

        if(result.length > 0){
            return res.send({status: false, message: "User already registered."})

        }else{
            var encryptedPassword = await bcrypt.hash(password, 8);
            db.query("Insert INTO user_details SET ? ", {firstName: firstName, lastName: lastName, address: address, emailAddress: emailAddress, password: encryptedPassword, role: role}, (error, result)=>{
                if(error) return res.send(error.message);
                else {
                    res.redirect("/admin/add_users");
                }
            });
            //const user = {firstName: firstName, lastName:lastName, address:address, emailAddress:emailAddress, password: encryptedPassword};
        }
});
});

module.exports = router;