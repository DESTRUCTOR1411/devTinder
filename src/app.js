const express= require("express");
const connectDB=require('./config/database.js')
const cookieParser = require("cookie-parser")
const app=express();

app.use(express.json());
app.use(cookieParser());

const authRouter= require("./routes/auth.js");
const profileRouter= require("./routes/profile.js");
const requestRouter= require("./routes/request.js");

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);

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


