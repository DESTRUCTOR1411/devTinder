const mongoose = require('mongoose');

//creating the schema first
const userSchema= new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
    },
    password:{
        type: String,
    },
    age:{
        type: Number,
    },
    gender:{
        type: String,
    },
})

//creating the model then
const User= mongoose.model("User", userSchema); //(name of model, schema of model that is defined above)

module.exports= User;