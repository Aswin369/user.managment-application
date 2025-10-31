import { userModel } from "../../../../model/signup.model";

export interface AuthState {
    user: userModel | null;
    token: string | null;
    error: string | null;
    loading: boolean;
    role:string | null;
}

export const initialState: AuthState = {
    user: null,
    token:null,
    error: null,
    loading:false,
    role:null
}


