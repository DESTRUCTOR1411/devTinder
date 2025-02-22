const express= require("express");

const app=express();

// app.use("/users",(req,res)=>{
//     res.send("hello from server")
//     console.log("hello from server");
// })

app.get("/user", (req,res)=>{
    res.send({firstName:"Raj Rai", email:"rairaj1411@gmial.com"});
})

app.post("/user",(req,res)=>{
    //saving database to DB
    res.send("user data is saved successfully!");
})

app.delete("/user",(req,res)=>{
    //saving database to DB
    res.send("user data is deleted successfully!");
})


const port=8000;
app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
})

