const express = require("express");
const bcrypt = require("bcryptjs");
const logout = require("../middleware/logoutMiddleware");
var db = require("../dbconfig");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post("/", (req, res)=>{
    var email = req.body.emailAddress;
    var password = req.body.password;

    db.query('SELECT * FROM user_details WHERE emailAddress = ?', [email], async (error, results)=>{

        if(error){

            res.send({
                status: false,
                message: "Something went wrong"
            }) 
        }else{
            if(results.length>0){
            
                if(await bcrypt.compare(password, results[0].password)){ 
                   const token = jwt.sign({"userId": results[0].userId}, "bld_network_jwtPrivateKey", {expiresIn: "30d"});
                    const cookieOptions = {
                        expires: new Date(Date.now()+90*24*60*60*1000),
                        httpOnly: true
                    };
                    res.cookie("jwt", token, cookieOptions);
                    return res.send({
                        status: true,
                        message: "Authenticated",
                        user: results[0].userId                       
                    });
                     
                }else{
                    return res.send({
                        status: false,
                        message: "Password does not match"
                        })
                }
            }else{
                    return res.send({
                        status: false,
                        message: results + "Enter a valid name or username"
                    });    
            }

        }
    });

}
);

router.get("/out", logout.loggedOut, (req, res)=>{

    return res.send({status: true, details: "logged out successfully"});
});

module.exports = router;
