import { createReducer, on } from "@ngrx/store";
import { initialState } from "./user.store.state";
import {
  autoLoginSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  logout,
  signup,
  signupFailure,
  signupSuccess,
  updateUser,
  updateUserSuccess,
  updateUserError
} from "./user.store.action";

export const userAuthReducer = createReducer(
  initialState,

  on(signup, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(signupSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null,
  })),

  on(signupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(autoLoginSuccess, (state, { user }) => ({
    ...state,
    user,
  })),

  on(logout, (state) => ({
    ...state,
    user: null,
    token: null,
  })),

  on(loginUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loginUserSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null,
  })),

  on(loginUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(updateUser, (state) => ({
    ...state,
    loading: true,
  })),
on(updateUserSuccess, (state, { user }) => {
  console.log("Reducer received updated user:", user);
  const user1 = {...state.user, ...user}
  
  return {
    ...state,
    user: user, // ✅ merge updated data
    loading: false,
    error: null
  };
}),

  on(updateUserError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
