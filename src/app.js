//entry point of our program
const express=require('express');

//created a server
const app= express();

app.get('/test',(req,res)=>{
    res.json({
        "name":"Sakshi",
        "age":"24"
})
});

app.post('/test',(req,res)=>{
    res.send("Data stored in DB successfully !!");
})

//this helps listening to the incoming request
app.listen(3003,()=>{
    console.log("Server listening on port 3003 !");
});























































































































































//app.use('/hello',(req,res)=>{
//     res.send("this is for hello route");
// });

// //use() method is a request handler, we can create as many request handlers we want for different routes
// app.use('/',(req,res)=>{
//     res.send("this is a general request handler");
// });
