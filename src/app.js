const express= require("express");
const connectDB=require('./config/database.js')
const User= require('./models/user.js')
const app=express();

app.use(express.json());

app.post('/signup',async(req,res)=>{

    // creating new instance to the User model
    const user= new User(req.body)
    // console.log(req.body);

    try{
      await user.save();
      res.send("User Added succesfuly!!!");
    }catch(err){
      res.status(400).send("Error saving the data"+err.message);
    }

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


