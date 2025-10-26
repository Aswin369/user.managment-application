export interface User {
    firstName:string;
    secondName:string;
    email:string;
    password:string;
    profileImage?: string;
    isAdmin:boolean;
    isBlocked:boolean;
    createdAt:Date;
    updatedAt:Date;
}