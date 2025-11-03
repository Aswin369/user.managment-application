import { AdminUserModel } from "../../../../model/adminUserModel.model";

export interface AdminUserState {
    users:AdminUserModel[];
    loading:boolean;
    error:string | null
}

export const initialState: AdminUserState = {
    users:[],
    loading:false,
    error:null
}
