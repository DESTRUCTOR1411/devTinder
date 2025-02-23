const express= require("express");
const connectDB=require('./config/database.js')
const User= require('./models/user.js')
const app=express();


app.post('/signup',async(req,res)=>{

    //creating new instance to the User model
    const user= new User({
        firstName:"Raj",
        lastName:"Rai",
        emailId:"1234@gmial.com",
        password:"1234567889",
    })
    

    await user.save();
    res.send("User is saved successfully!!!!");

})


connectDB()
  .then(()=>{
    //first connecting to the database----------
    console.log("Database is connected successfully!!!");

    //then listening to the server--------
    const port=8000;
    app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
    })
  })
  .catch((err)=>{
    console.error("Databse cannot be connected",err);
  })


