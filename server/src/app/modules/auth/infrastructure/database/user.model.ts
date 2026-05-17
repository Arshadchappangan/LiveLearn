import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["learner", "instructor", "mentor", "admin"],
        required : true,
        default : "learner"
    },
    isVerified : {
        type : Boolean,
        default : false
    },
}, { timestamps : true });

export const UserModel = mongoose.model("User", UserSchema);