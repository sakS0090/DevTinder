const validator=require('validator');

function userValidation(req)
{
    const {firstName, emailId, password, gender,age} = req.body;
    
    if(!firstName || !emailId || !password || !gender )
    throw new Error ("Required fields empty")
    

    if(!validator.isEmail(req.body.emailId))
    throw new Error ("Incorrect email id");
    

    if(!validator.isStrongPassword(password))
    throw new Error ("Weak Password");
    

    if(!(age >= 18))
    throw new Error ("You are not eligible yet!");

}

module.exports={
    userValidation
};