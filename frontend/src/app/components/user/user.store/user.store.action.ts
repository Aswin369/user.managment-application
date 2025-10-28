import { createAction, props } from "@ngrx/store";
import { userModel } from "../../../../model/signup.model";
import { UserLoginModel } from "../../../../model/login.model";

export const signup = createAction('[UserAuth] Signup', props<{signupData:userModel}>())
export const signupSuccess = createAction('[UserAuth] Signup Success', props<{user:userModel, token:string}>())
export const signupFailure  = createAction('[userAuth] Signup Failure',props<{error:string}>())

export const autoLogin = createAction('[Auth] Auto Login');
export const autoLoginSuccess = createAction('[Auth] Auto login Success', props<{user: userModel}>())
export const logout = createAction('[Auth] Logout')


export const loginUser = createAction('[Auth] Login User', props<{userData:UserLoginModel}>())
export const loginUserSuccess = createAction('[Auth Loign User Success', props<{user:userModel, token:string}>())
export const loginUserFailure = createAction('[Auth], Login User Failure',props<{error:string}>())
