export interface userModel {
    firstName:string;
    secondName:string;
    email:string;
    password:string;
    profileImage?: string;
    isAdmin?:boolean,
    role:"user" | "admin"
}