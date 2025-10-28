import { createReducer, on } from "@ngrx/store";
import { initialState } from "./user.store.state";
import { signup, signupFailure, signupSuccess } from "./user.store.action";

export const userAuthReducer = createReducer(
    initialState,
    on(signup,(state,action)=>{
        return {
            ...state,
            loading:true,
            error:null,
            user:action.signupData,
        }
    }),
    on(signupSuccess, (state, {user, token})=>{
        return {
            ...state,
            user,
            token,
            loading:false,
            error:null
        }
    }),
    on(signupFailure,(state, {error})=>{
        console.log("asfda",error)
        return {
            ...state,
            loading:false,
            error
        }
    })
)