//entry point of our program
const express=require('express');

//created a server
const app= express();


app.use("/test",(req,res)=>{
    res.send("This is for test route");
});

//use() method is a request handler, we can create as many request handlers we want for different routes
app.use((req,res)=>{
    res.send("this is a general request handler");
});




//this helps listening to the incoming request
app.listen(3003,()=>{
    console.log("Server listening on port 3003 !");
});


