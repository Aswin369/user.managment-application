import { createAction, props } from "@ngrx/store";
import { AdminUserModel } from "../../../../model/adminUserModel.model";

export const loadUser = createAction('[Admin Users] load Users');
export const loadUserSuccess = createAction('[Admin Users] load Users Success', props<{users:AdminUserModel[]}>())
export const loadUserFailure = createAction('[Admin User] load User failure',props<{error:string}>())

export const updateUser = createAction('[Admin User] Update User',props<{userData:any, userId:string}>())
export const updateUserSuccess = createAction("[Admin User] Update User Success", props<{updatedUser:AdminUserModel}>())
export const upadateUserFailure = createAction('[Admin User] Update User Failure', props<{error:string}>())