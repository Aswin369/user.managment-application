import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { userModel } from '../../model/signup.model';
import { USER_API } from '../constants/userapi.constants';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(data:userModel):Observable<{user: userModel, token:string}> {
    return this.http.post<{user:userModel,token:string}>(`${USER_API}/register`,data)
  }

}
