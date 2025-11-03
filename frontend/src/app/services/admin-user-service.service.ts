import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminUserModel } from '../../model/adminUserModel.model';
import { AdminGetUserResponse } from '../admin-response-model/admin.response.model';
import { ADMIN_USER_API } from '../../constants/userapi.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminUserServiceService {
  constructor(private http: HttpClient) { }

  getAllUsers():Observable<AdminGetUserResponse> {

    const data =  this.http.get<AdminGetUserResponse>(`${ADMIN_USER_API}/Userslist`)
    // console.log("This is resposne dfrom serive",data)
    return data
  }

}
