//entry point of our program
const express=require('express');
const {adminAuth, userAuth}=require('./Middlewares/auth')
const {makeConnection}=require('./config/database');
const {User}=require('./models/user');
//created a server
const app= express();

app.post('/signup',async(req,res)=>{
    //creating an instance of our User model named as entry and passing an object in the same
    const myObj={
        firstName:'Sakshi',
        lastName:'Singh',
        emailId:'sakshi.singh@google.com',
        password:'sakshi@123'
    };
    
    const entry=new User(myObj);
try{
   await entry.save();
   res.send('User added successfully');
}

catch(err){
    res.status(400).send("User cannot be added",err);
}
});




makeConnection().then(()=>{
console.log("Connected successfully to the database! ");

//this helps listening to the incoming request
app.listen(3003,()=>{
    console.log("Server listening on port 3003!");
})
}).catch((err)=>{
    console.log("Cannot connect to the db",err);
})

























































































































































