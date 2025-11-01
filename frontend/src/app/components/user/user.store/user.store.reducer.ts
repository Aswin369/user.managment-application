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
  user: user,
  token,
  role: user.role,
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
  token: state.token ?? localStorage.getItem('token'),
  role: user.role, 
  loading: false,
  error: null,
}))
,
  on(updateUser, (state) => ({
    ...state,
    loading: true,
  })),

on(loginUser,(state)=>{
  return {
    ...state,
    loading:true,
    error:null
  }
}),
on(loginUserSuccess,(state,{user,token})=>{
  console.log("This is reducer",user)
  return {
    ...state,
    user,
    token,
    role:user.role,
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
}),

on(updateUserSuccess, (state, { user }) => {
  console.log("Reducer received updated user:", user);
  const user1 = {...state.user, ...user}
  
  return {
    ...state,
    user: user, 
    loading: false,
    error: null
  };
}),

  on(updateUserError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(logout,(state)=>{
    return {
      ...state,
      user: null,
  token: null,
  role: null,
  loading: false,
  error: null

    }
  })

);
