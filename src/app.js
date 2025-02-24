const express= require("express");
const connectDB=require('./config/database.js')
const User= require('./models/user.js')
const app=express();

app.use(express.json());

//adding new person
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

//GET user info by emailId
app.get('/userById',async (req,res)=>{
  const userEmail=req.body.emailId;
  
  try{
    const userinfo = await User.find({emailId: userEmail});
    if(userinfo.length === 0){
      res.status(404).send("User not found!!");
    }else{
      res.status(200).send(userinfo);
    }
  }catch(err){
    res.status(400).send("Something went wrong!!");
  }
  

})

//feed api- get/feed- get all the user from the database
app.get('/feed',async (req,res)=>{
  
  try{
    const allUsers= await User.find({});
    res.status(200).send(allUsers);

  }catch(err){
    res.status(400).send("Something went wrong!!");
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


