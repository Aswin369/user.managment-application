import { createReducer, on } from "@ngrx/store";
import { initialState } from "./user.store.state";
import { autoLogin, autoLoginSuccess, loginUser, loginUserFailure, loginUserSuccess, logout, signup, signupFailure, signupSuccess } from "./user.store.action";

export const userAuthReducer = createReducer(
    initialState,
    on(signup,(state,action)=>{
        return {
            ...state,
            loading:true,
            error:null
        }
    }),
    on(signupSuccess, (state, {user, token})=>{
        console.log("When singup success",user)
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
    }),
    on(autoLoginSuccess,(state,{user})=>{
        console.log("THis is sdasdfjasdf login",user)
        const {firstName} = user
        console.log(firstName)
        return {
            ...state,
            user,
        }
    }),
    on(logout,(state)=>{
        return {
            ...state,
            user:null,
            token:null
        }
    }),
    on(loginUser, (state)=>{
        return {
            ...state,
            loading:true,
            error: null
        }
    }),
    on(loginUserSuccess,(state, {user, token})=>{
        return {
            ...state,
            user: user,
            token: token,
            loading:false,
            error:null
        }
    }),
    on(loginUserFailure,(state,{error})=>{
        return {
            ...state,
            loading:false,
            error
        }
    })
)