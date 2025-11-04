import { createReducer, on } from "@ngrx/store";
import { initialState } from "./admin.store.state";
import { adminLogout, createUser, createUserFailure, createUserSuccess, loadUser, loadUserFailure, loadUserSuccess, searchUserFailure, searchUsers, searchUserSuccess, upadateUserFailure, updateUserBlockFailure, updateUserBlockSuccess, updateUserSuccess } from "./admin.store.action";

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
    }),
    on(updateUserSuccess, (state, { updatedUser }) => {
  const users = state.users.map(user =>
    user._id === updatedUser._id ? updatedUser : user
  );

  return {
    ...state,
    users,
    error:null
  };
}),
on(upadateUserFailure,(state,{error})=>{
    return {
        ...state,
        error
    }
}),

on(updateUserBlockSuccess,(state,{updatedUser})=>{
    const updateUser = state.users.map(user=>user._id === updatedUser._id ? updatedUser : user)
    return {
        ...state,
        users:updateUser
    }
}),
on(updateUserBlockFailure,(state,{error})=>{
    return {
        ...state,
        error
    }
}),
on(createUserSuccess,(state,{user})=>{
    return {
        ...state,
        users:[...state.users,user],
        error:null
    }
}),
on(createUserFailure,(state,{error})=>{
    return{
        ...state,
        error
    }
}),
on(searchUsers,(state)=>{
    return {
        ...state,
        loading:true,
        error:null
    }
}),
on(searchUserSuccess,(state,{users})=>{
    return {
        ...state,
        users,
        loading:false,
        error:null
    }
}),
on(searchUserFailure,(state,{error})=>{
    return {
        ...state,
        loading:false,
        error
    }
})
)