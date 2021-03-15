const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../dbconfig");

const router = express.Router();

router.get("/login", (req, res)=>{
    res.render("admin_login");
});

router.post("/login", (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM user_details WHERE emailAddress = ?', [email], async (error, results)=>{

        if(error){
            return res.send({
                status: false,
                message: "Something went wrong"
            }) 
        }else{
            
            if(results.length>0){
                // if(results[0].role=="admin")
                    if(await bcrypt.compare(password, results[0].password)){ 
                    const token = jwt.sign({"userId": results[0].userId}, "bld_network_jwtPrivateKey", {expiresIn: "30d"});
                        const cookieOptions = {
                            expires: new Date(Date.now()+90*24*60*60*1000),
                            httpOnly: true
                        };
                        res.cookie("jwt", token, cookieOptions);
                        return res.redirect("/admin");
                        
                    }else{
                        return res.send({
                            status: false,
                            message: "Password does not match"
                            })
                    }
                // else{
                //     return res.status(401).send({status: "fail", data:{user:'Unauthorized user'}})
                      
                // }
                
            }else{
                    return res.send({
                        status: false,
                        message: results + "Enter a valid name or username"
                    });    
            }

        }
    });

});

router.get("/", (req, res)=>{
    axios.get("http://localhost:3000/api/users")
    .then(response=> {
        res.render(
        'index', {users: response.data.data.user})})
    .catch(error=> {return res.status(400).send({status: "error", message: error.message})})
});

router.get("/add_users", (req,res)=>{
    res.render('add_user');
});

router.get("/update_user", (req, res)=>{
    res.render('update_user');
})

module.exports = router;