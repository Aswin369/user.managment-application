export interface AdminUserModel {
    _id:string;
    firstName:string;
    secondName:string;
    email:string;
    profileImage?:string;
    isAdmin:boolean;
    role: 'user' | 'admin';
    isBlocked:boolean;
    createdAt:Date;
    updatedAt:Date
}