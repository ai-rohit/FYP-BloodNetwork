const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "blood_network_app"
});

db.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("connected");

    }

})

module.exports = db;