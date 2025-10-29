import mongoose, { Schema } from "mongoose";
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
    profileImage:{
        type:String,
        required:false
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

userSchema.set("toJSON", {
  transform: function (doc, ret: any) {
    delete ret.password;
    return ret;
  },
});

export const UserModel = mongoose.model<User>('User',userSchema)
