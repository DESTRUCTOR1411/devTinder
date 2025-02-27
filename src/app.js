const express= require("express");
const connectDB=require('./config/database.js')
const User= require('./models/user.js')
const {validateSignUpData}=require('./utils/validation.js')
const bcrypt= require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt= require("jsonwebtoken");
const {userAuth}= require("./middlewares/auth.js")
const app=express();

app.use(express.json());
app.use(cookieParser());


//adding new person
app.post('/signup',async(req,res)=>{
  try{
    //first validating the data
    validateSignUpData(req);
    // ..second encrypting the passwords
    const {firstName,lastName,emailId,password}= req.body;
    const passwordHash= await bcrypt.hash(password,10);//10  here is salt!!!!!


    // creating new instance to the User model
      const user= new User({
        firstName,lastName,emailId,password: passwordHash,
      })

      await user.save();
      res.send("User Added succesfuly!!!");
    }catch(err){
      res.status(400).send("Error saving the data"+err.message);
    }

})

//login user
app.post('/login', async (req,res)=>{
  try{
    const { emailId, password}= req.body;

    const user= await User.findOne({emailId:emailId});
    //is user exist
    if(!user){
      throw new error("invalid credentials");
    }
    //if yes ? check pssword
    const isPasswordValid= await bcrypt.compare(password,user.password);
    
    if(isPasswordValid){
       
      //creaing a jwt token
      const token= await jwt.sign({_id:user._id},"DevTinder@",{expiresIn: "1d"});
      console.log(token);
      
      //adding the token to the response and send it to user;
      res.cookie("token",token);
      res.send("login successfully!!!");
    }else{
      throw new error("invalid credentials");
    }
    
  }catch(err){
    res.status(400).send("Error logging "+err.message);
  }
})

//getting the profile
app.get("/profile",userAuth,async (req,res)=>{

  try{
    const user= req.user;
    res.send(user);
  }
  catch(err){
    res.status(400).send("Error logging "+err.message);
  }
})

app.post('/sendConnectionRequest',(req,res)=>{

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


