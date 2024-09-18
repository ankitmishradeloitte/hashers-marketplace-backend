
import mongoose from "mongoose";

// mongoose.Schema Defines the shape of a User , A user has an email and password 
const userSchema  = new mongoose.Schema({
    email : {
       type : String ,
       required : true ,
       unique : true , 
    },

    password : {
        type : String ,
        required : true ,
    },

}) ;

// mongoose model : creates a user model based on the Schema , which we can later use to interact with database 
const User = mongoose.model('User',userSchema);

export default User ; 

