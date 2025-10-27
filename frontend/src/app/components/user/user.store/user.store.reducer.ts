import { createReducer, on } from "@ngrx/store";
import { initialState } from "./user.store.state";
import { signup, signupSuccess } from "./user.store.action";

export const userAuthReducer = createReducer(
    initialState,
    on(signup,(state,action)=>{
        return {
            ...state,
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
    })
)