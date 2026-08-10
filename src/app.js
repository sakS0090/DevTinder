//entry point of our program
const express=require('express');
const {adminAuth, userAuth}=require('./Middlewares/auth')
const {makeConnection}=require('./config/database');
const {User}=require('./models/user');
//created a server
const app= express();

app.use(express.json());


app.post('/signup',async(req,res)=>{
    const entry=new User(req.body);
    
    
    //creating an instance of our User model named as entry and passing an object in the same
    // const myObj={
    //     firstName:'Suraj',
    //     lastName:'Bisht',
    //     emailId:'Suar.Bisht@google.com',
    //     password:'sakshi@123'
    // };
    
    // const entry=new User(myObj);
     try{
         await entry.save();
        res.send('User added successfully');
     }

     catch(err){
         res.status(400).send("User cannot be added",err);
     }

});


//a simple GET API to get the user data based on their email from the db
app.get('/getUser',async(req,res)=>{
    try{

    console.log(req.body);
        
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



makeConnection().then(()=>{
console.log("Connected successfully to the database! ");

//this helps listening to the incoming request
app.listen(3003,()=>{
    console.log("Server listening on port 3003!");
})
}).catch((err)=>{
    console.log("Cannot connect to the db",err);
})

























































































































































