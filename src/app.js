console.log("App started");
//entry point of our program
const express=require('express');
const {adminAuth, userAuth}=require('./Middlewares/auth')

//created a server
const app= express();


app.use('/admin',adminAuth);
app.use('/users',userAuth);


app.use('/admin/getContent',(req,res)=>{
 res.send("Content fetched");
});

app.get('/users/getContent',(req,res)=>{
    console.log(req.params);
    res.send("Processed successfully!!");
})

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
