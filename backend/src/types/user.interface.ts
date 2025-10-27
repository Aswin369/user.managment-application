import { Types } from "mongoose";

export interface User {
    _id?: Types.ObjectId;
    firstName:string;
    secondName:string;
    email:string;
    password:string;
    profileImage?: string;
    isAdmin?:boolean;
    isBlocked?:boolean;
    createdAt?:Date;
    updatedAt?:Date;
}