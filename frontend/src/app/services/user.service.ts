import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { userModel } from '../../model/signup.model';
import { USER_API } from '../../constants/userapi.constants';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserLoginModel } from '../../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(data:userModel):Observable<{user: userModel, token:string}> {
    return this.http.post<{user:userModel,token:string}>(`${USER_API}/register`,data)
  }

  getToken():string | null{
    return localStorage.getItem('token')
  }

  removeToken():void {
    localStorage.removeItem('token')
  }

  getUser():Observable<userModel> {
    return this.http.get<userModel>(`${USER_API}/me`)
  }

  isLoggedIn():boolean {
    return !!localStorage.getItem('token')
  }
  login(data:UserLoginModel):Observable<{user: userModel, token:string}> {
    console.log("Usdresdfas", data)
    return this.http.post<{user:userModel, token:string}>(`${USER_API}/login`,data)
  }

  uploadImage(formData: FormData) {
  return this.http.post(`${USER_API}/uploadImage`, formData);
}
  updateUser(updatedData: Partial<userModel>): Observable<userModel> {
    console.log("THidsjfk", updatedData)
  return this.http.put<userModel>(`${USER_API}/updateuser`, updatedData);
}


}
