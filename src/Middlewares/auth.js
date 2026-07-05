const adminAuth= (req,res,next)=>{
    const token='abc';
    const auth='abc';

    if(auth===token)
    {
        next();
    }
    else{
        res.status(401).send("Unauthorized!");
    }

};

const userAuth= (req,res,next)=>{
   const token='abc';
    const auth='abcd';

    if(auth===token)
    {
        next();
    }
    else{
        res.status(401).send("Unauthorized!");
    } 
};

module.exports={
adminAuth,
userAuth
}