import { createAction, props } from "@ngrx/store";
import { AdminUserModel } from "../../../../model/adminUserModel.model";

export const loadUser = createAction('[Admin Users] load Users');
export const loadUserSuccess = createAction('[Admin Users] load Users Success', props<{users:AdminUserModel[]}>())
export const loadUserFailure = createAction('[Admin User] load User failure',props<{error:string}>())
