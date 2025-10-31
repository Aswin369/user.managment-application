import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./user.store.state";
// import { AUTH_STATE } from "../../../../constants/auth.constants";

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(getAuthState, (state)=> {
    console.log("thsi sidf selector",state.user)
   return  state.user
}
)
export const getToken = createSelector(getAuthState, (state)=>state.token)
export const getAuthError = createSelector(getAuthState,(state)=>state.error)
export const getAuthLoading = createSelector(getAuthState,(state)=>state.loading)
export const getRole = createSelector(getAuthState,(state)=>state.role)
