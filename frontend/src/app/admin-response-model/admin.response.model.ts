import { AdminUserModel } from "../../model/adminUserModel.model";

export interface AdminGetUserResponse {
    success:boolean;
    message:string;
    users:AdminUserModel[]
}

export interface adminUserBlockUnblockResponse {
    success:boolean;
    message:string
}