import { createAction, props } from "@ngrx/store";
import { userModel } from "../../../../model/signup.model";

export const signup = createAction('[UserAuth] Signup', props<{signupData:userModel}>())
export const signupSuccess = createAction('[UserAuth] Signup Success', props<{user:userModel, token:string}>())
export const signupFailure  = createAction('[userAuth] Signup Failure',props<{error:string}>())