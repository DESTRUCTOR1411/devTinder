const express= require("express");
const requestRouter= express.Router();
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest= require("../models/connectionRequest")
const User= require("../models/user")

requestRouter.post('/request/send/:status/:toUserId',userAuth, async (req,res)=>{

    try{
        const fromUserId=req.user._id;
        const toUserId= req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"invalid status type",
            })
        }

        //checking wheather the user exist or not
        const user= await User.findById(toUserId);
        if(!user){
            // throw new error("User not exists")
            return res.status(400).json({
                message:"user not found",
            })
        }


        //checking wheather the request is already exist or not
        const existingConnectionRequest= await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId: toUserId, toUserId: fromUserId},
            ]
        })
        if(existingConnectionRequest){
            return res.status(400).send({
                message:"Connection Request Already exists"
            })
        }

        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })
        
        // const touser= await User.findById(toUserId);
        const data= await connectionRequest.save();
        res.json({
            message: req.user.firstName + " is " + status + " in " + user.firstName,
            data,
        })

    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }


})

module.exports= requestRouter;