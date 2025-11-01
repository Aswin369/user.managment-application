import { inject, Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../services/user.service';
import { of } from 'rxjs';
import {
  signup,
  signupSuccess,
  signupFailure,
  autoLogin,
  autoLoginSuccess,
  logout,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  updateUser,
  updateUserError,
  updateUserSuccess
} from './user.store.action';
import { switchMap, map, catchError, tap, mergeMap} from 'rxjs/operators';
import { userModel } from '../../../../model/signup.model';
import { Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  constructor(private userService: UserService, private router: Router, private toast: ToastrService) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      switchMap((action) =>
        this.userService.addUser(action.signupData).pipe(
          map((res) => {
            console.log('user data in effect', res.user);
            return signupSuccess({ user: res.user, token: res.token })
          }),
          catchError((err) => {
            console.log('This is error form effect', err);
            return of(
              signupFailure({ error: err.error?.message || 'Signup failed' })
            );
          })
        )
      )
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupSuccess),
        tap(({ user, token }: { user: userModel; token: string }) => {
          localStorage.setItem('token', token);
          this.toast.success("Success")
          this.router.navigate(['/profile']);
        })
      ),
      { dispatch: false }
    );
    
    autoLogin$ = createEffect(() =>
      this.actions$.pipe(
        ofType(autoLogin),
        switchMap(() => {
          const token = this.userService.getToken();
          if (!token) return of(logout());
          
          return this.userService.getUser().pipe(
            map((user: any) => {
              console.log("this is auto login", user)
              // this.router.navigate(['/profile']);
              return autoLoginSuccess({ user });
        }),
        catchError(() => of(logout()))
      );
    })
  )
);



 login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap(({ userData }) =>{
        // console.log("This login user data from effect",userData)
       return  this.userService.login(userData).pipe(
          map((resp: any) => {
            console.log("This login user data from effect",resp)
            return loginUserSuccess({ user: resp.user, token: resp.token });
          }),
          catchError((error) => of(loginUserFailure({ error: error.message })))
        )
})
    )
  );

  
  redirectAfterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginUserSuccess),
        tap(({ user, token }) => {
          localStorage.setItem('token', token)
          if (user.role === 'admin') {
            this.router.navigate(['/admindashboard']);
          } else {
            this.router.navigate(['/profile']);
          }
        })
      ),
    { dispatch: false }
  );
 

updateUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(updateUser),
    mergeMap(({ userData }) =>
      this.userService.updateUser(userData).pipe(
        map((res: any) => {
          this.toast.success("User updated")
          return updateUserSuccess({ user: res.user })}),
        catchError(err =>{
          const er = err.error?.message || 'Update failed'
          this.toast.error(er)
          return of(updateUserError({ error: er }))
})
      )
    )
  )
);


logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(logout),
    tap(() => {
      localStorage.removeItem('token');
    })
  ),
  { dispatch: false } // ✅ no new action is dispatched
);


}