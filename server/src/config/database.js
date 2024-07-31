const mongoose = require('mongoose');


require('dotenv').config();

exports.connect=()=>{
    mongoose.connect(process.env.DB_URL,{})
    .then(()=>{console.log("DB connection established");})
    .catch((error)=>{
        console.log("Issue in DB connection");
        console.log(error.message);
    })
}