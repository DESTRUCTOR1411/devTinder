const validator= require('validator');

const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}= req.body;
    if(!firstName || !lastName){
        throw new error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new error("emailId is not valid");
    }
    // else if(!validator.isStrongPassword(password)){
    //     throw new error("Password is not strong Enough");
    // }
}

module.exports={
    validateSignUpData,
}