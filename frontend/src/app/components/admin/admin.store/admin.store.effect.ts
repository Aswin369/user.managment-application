import { inject, Injectable } from "@angular/core";
import { AdminUserServiceService } from "../../../services/admin-user-service.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadUser, loadUserFailure, loadUserSuccess, upadateUserFailure, updateUser, updateUserSuccess } from "./admin.store.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class AdminUserEffect {
    private actions$ = inject(Actions)
    constructor(private adminUserService: AdminUserServiceService) {}


    loadUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadUser),
    mergeMap(() =>{
      console.log("This is response from the frontend")
      return this.adminUserService.getAllUsers().pipe(
        map((response) =>{
          return loadUserSuccess({ users: response.users }) 

}),
        catchError((error) =>
          of(loadUserFailure({ error: error.message }))
        )
      )
})
  )
);


updateUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(updateUser),
    mergeMap(({ userId, userData }) =>
      this.adminUserService.updateUser(userId, userData).pipe(
        map((response) =>
          updateUserSuccess({ updatedUser: response.updatedUser })
        ),
        catchError((error) =>
          of(upadateUserFailure({ error: error.message || 'Update failed' }))
        )
      )
    )
  )
);



}