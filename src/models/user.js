//importing mongoose object and schema is its property
const {Schema, mongoose}=require('mongoose');


//creating a new schema
const userSchema=new Schema(
    {
        firstName:{
            type:String
        },
        lastName:{
            type: String
        },
        emailId:{
            type: String
        },
        password:{
            type:String
        },
        age:{
            type:Number
        },
        gender:{
            type:String
        }
    }
);

//creating a model for the userSchema named as User
const User=mongoose.model('User',userSchema);

module.exports={
    User
}