import { createReducer, on } from "@ngrx/store";
import { initialState } from "./admin.store.state";
import { loadUser, loadUserFailure, loadUserSuccess } from "./admin.store.action";

export const adminUserReducer = createReducer(
    initialState,
    on(loadUser,(state)=>{
        console.log("Thsi is from reducer")
        return {
            ...state,
            loading:true,
            error:null
        }
    }),
    on(loadUserSuccess,(state,{users})=>{
        return {
            ...state,
            users,
            loading:false,
            error:null
        }
    }),
    on(loadUserFailure,(state,{error})=>{
        return {
            ...state,
            loading:false,
            error
        }
    })
)