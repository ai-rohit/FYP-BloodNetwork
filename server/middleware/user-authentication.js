var db = require("../dbconfig");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const isLoggedIn = async(req, res, next)=>{
    if(req.cookies.jwt){

        try{

            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                "bld_network_jwtPrivateKey"
            );

            db.query("SELECT * FROM user_details WHERE userId = ?", [decoded.userId], (error, result) =>{
                if(error){
                    return res.status(400).send({status: "error", message: error.message});
                }

                if(!result){ 
                    return res.status(400).send({status: "fail", data:{user: "User not found"}});
                }
                req.user = result[0];
                return next();
            });
        }catch(err){
            return res.status(400).send({status: "error", message: err.message});

        }
    }else{
        return res.status(400).send({status: "fail", data:{user: "User not logged in"}});
    }

};


module.exports.isLoggedIn = isLoggedIn