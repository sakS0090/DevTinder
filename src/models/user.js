//importing mongoose object and schema is its property
const {Schema, mongoose}=require('mongoose');


//creating a new schema
const userSchema=new Schema({
        firstName:{
            type:String,
            required:true,
            maxLength:30
        },
        lastName:{
            type: String,
            
        },
        emailId:{
            type: String,
            required:true, //defines that the field is mandatory
            unique:true,   //defines that the field cannot be duplicate
            trim:true,     //trims whitespaces
            lowercase:true //ensures that the data is lowercase

        },
        password:{
            type:String,
            required:true,
            unique:true
        },
        age:{
            type:Number,
            min:18
        },
        gender:{
            type:String,
            validate(value)    //this is a custom validation function 
            {
                if(value!="M" && value!="F" && value!="Others")
                {
                    throw new Error("Invalid gender type");
                }
            }
        },
        photo:{
            type:String,
            default:"https://www.magnific.com/free-photos-vectors/avatar-svg"
        },
        
        skills:{
            
            type:[String],
            maxLength:5
        }

        
    },{ timestamps:true});

//creating a model for the userSchema named as User
const User=mongoose.model('User',userSchema);

module.exports={
    User
}