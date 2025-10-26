import { Schema } from "mongoose";
import { User } from "../types/user.interface";

const userSchema = new Schema<User>({
    firstName:{
        type:String,
        required:true,
    },
    secondName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default: ''
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

export default userSchema
