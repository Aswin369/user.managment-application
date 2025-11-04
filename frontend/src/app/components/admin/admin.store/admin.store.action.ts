import { createAction, props } from "@ngrx/store";
import { AdminUserModel } from "../../../../model/adminUserModel.model";

export const loadUser = createAction('[Admin Users] load Users');
export const loadUserSuccess = createAction('[Admin Users] load Users Success', props<{users:AdminUserModel[]}>())
export const loadUserFailure = createAction('[Admin User] load User failure',props<{error:string}>())

export const updateUser = createAction('[Admin User] Update User',props<{userData:any, userId:string}>())
export const updateUserSuccess = createAction("[Admin User] Update User Success", props<{updatedUser:AdminUserModel}>())
export const upadateUserFailure = createAction('[Admin User] Update User Failure', props<{error:string}>())

export const blockUser = createAction('[Admin User] BlockUser',props<{userId: string; isBlocked: boolean}>())
export const updateUserBlockSuccess = createAction('[Admin User] Update user block status Success',props<{updatedUser:AdminUserModel}>())
export const updateUserBlockFailure = createAction('[Admin User], Update user block status failure',props<{error:string}>())

export const createUser = createAction('[Admin User] Create User',props<{user:AdminUserModel}>())
export const createUserSuccess = createAction('[Admin user] Create User Success',props<{user:AdminUserModel}>())
export const createUserFailure = createAction('[Admin user] Create User Failure',props<{error:string}>())

export const searchUsers = createAction('[Admin Users] Search user',props<{query:string}>())
export const searchUserSuccess = createAction('[Admin Users] Search users success',props<{users:AdminUserModel[]}>())
export const searchUserFailure = createAction('[Admin Users] search users failure',props<{error:string}>())

export const adminLogout = createAction('[Admin User] logout')