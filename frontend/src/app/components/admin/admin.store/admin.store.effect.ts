import { inject, Injectable } from "@angular/core";
import { AdminUserServiceService } from "../../../services/admin-user-service.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { blockUser, loadUser, loadUserFailure, loadUserSuccess, upadateUserFailure, updateUser, updateUserBlockFailure, updateUserBlockSuccess, updateUserSuccess } from "./admin.store.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AdminUserEffect {
    private actions$ = inject(Actions)
    constructor(private adminUserService: AdminUserServiceService, private toast: ToastrService) {}


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
        map((response) =>{
          this.toast.success("User updated")
          return updateUserSuccess({ updatedUser: response.updatedUser })
}),
        catchError((error) =>{
          this.toast.error(error)
          return of(upadateUserFailure({ error: error.message || 'Update failed' }))
})
      )
    )
  )
);

updateUserBlockStatus$ = createEffect(() =>
  this.actions$.pipe(
    ofType(blockUser),
    mergeMap(({ userId, isBlocked }) =>
      this.adminUserService.userBlockAndUnblock(userId, isBlocked ).pipe(
        map((response) =>{
          this.toast.success("User updated")
          return updateUserBlockSuccess({ updatedUser: response.updatedUser })
 } ),
        catchError((error) =>{
            this.toast.error(error)
          return of(updateUserBlockFailure({
            error: error.message || 'Failed to update user status'
          }))
})
      )
    )
  )
);


}