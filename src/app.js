//entry point of our program
const express=require('express');
const {adminAuth, userAuth}=require('./Middlewares/auth')
const {makeConnection}=require('./config/database');
const {User}=require('./models/user');
const validator=require('validator');
const Validation=require('./utils/validate');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');


require('dotenv').config();
//created a server
const app= express();

app.use(express.json());
app.use(cookieParser());


app.post('/signup',async(req,res)=>{
    
     try{
        
        console.log(req.body);
        Validation.userValidation(req)

        const entry=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            emailId:req.body.emailId,
            password:req.body.password,
            age:req.body.age,
            gender:req.body.gender
        });
          
        //hash the user password
        entry.password= await bcrypt.hash(req.body.password,10);

        await entry.save();

        res.send('User added successfully');
     }

     catch(err){
         res.status(400).send("ERR MSG : "+ err);
     }

});

app.post('/login',async (req,res)=>{

try{
    
 const{ emailId, password} = req.body;

 if(!validator.isEmail(emailId))
    throw new Error("Invalid Email");

const data=await User.findOne({emailId:emailId});

if(data==null)
    throw new Error("Invalid credentials");

const isValidId=await bcrypt.compare(password,data.password);  


if(isValidId){
   //creating payload for the token
     const payload={
        'ID':'data._id',
        'EmailID':'data.emailId'
    };

    //creating token that is to be sent
    const token=jwt.sign(payload,process.env.secret_key);
    
    console.log(typeof(token));

    //sending the token in the cookie back to the browser
    res.cookie("TOKEN", token);
    res.send("Cookie sent and login Successful");
}
    else{
    throw new Error("Unsucessful login! User doesn't exist");
}

}
catch(err)
{
    res.status(400).send(err.message);
}
});


//a simple GET API to get the user data based on their email from the db
app.get('/getUser',async(req,res)=>{
    try{
        
    const email=req.query.emailId;
    const data=await User.find({emailId:email});
   
    res.send(data);
   }
   catch(err)
   {
    console.log("Hitting catch block");
    res.status(404).send("User doesn't exist with us!");
   }
});    

app.get('/getFeed', async (req,res)=>{
    try{
     const users= await User.find({});
     res.send(users);
    }
    catch(err)
    {
        res.status(400).send("Something went wrong");
    }
})

app.get('/getUserbyId',async(req,res)=>{
    try{    
    
    const ID=req.query._id;
    //console.log(ID);
    const val=await User.findById({_id:ID});

    if(val)
    {
        res.send(val);
    }
    else
        res.send("Does not exist");
}

catch(err)
{
    res.status(400).send("Something went Wrong");
}
});


app.get('/profile',async(req,res)=>{

const {TOKEN} = req.cookies;

const decoded= jwt.verify(TOKEN,process.env.secret_key);

res.send(User.findOne(decoded.ID));

})


app.patch('/updateUser/:_id',async (req,res)=>{
    try{
        
    const ID=req.params._id;
    const val=req.body;

    const allowed=['skills','photo','lastName','gender'];
    
    const updates=Object.keys(val); //it returns an array of string

    const isAllowed=updates.every((key)=> allowed.includes(key));

    if(!isAllowed){
     throw new Error("Invalid Operation : Update not allowed");
    }

    if(val.skills.length>5)
    {
       throw new Error("Invalid Operation : Skills cannot be greater than 5"); 
    }
    
    await User.findByIdAndUpdate(ID,val,{
        runValidators:true
    });

    res.send("User updated successfully!!");
    }
    catch(err)
    {
        console.log(err);
         res.status(400).send(err.message);
    }

});


makeConnection().then(()=>{
console.log("Connected successfully to the database! ");

//this helps listening to the incoming request
app.listen(process.env.PORT,()=>{
    console.log("Server listening on port 3003!");
})
}).catch((err)=>{
    console.log("Cannot connect to the db",err);
})

























































































































































