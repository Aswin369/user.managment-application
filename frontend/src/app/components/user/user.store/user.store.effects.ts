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
          map((user) =>
            // console.log(user)
            autoLoginSuccess({ user })
          ),
          catchError(() => of(logout()))
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.userService.removeToken();
          this.router.navigate(['/singup']);
        })
      ),
    { dispatch: false }
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap((action) => {
        console.log('THis action from effect', action);
        return this.userService.login(action.userData).pipe(
          map((response) => {
            console.log('This is resosd from this effect', response);
            if(response.user){
              this.toast.success("Login Success")
            }
            return loginUserSuccess({
              user: response.user,
              token: response.token,
            });
            
          }),
          catchError((error) => {
            console.error('Backend error:', error);
            const backendMessage = error?.error?.message || 'Something went wrong';
            if(error){
              this.toast.error(backendMessage)
            }
            return of(loginUserFailure({ error: backendMessage }));
          })
        );
      })
    )
  );

  loginUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginUserSuccess),
        tap(({ token }) => {
          localStorage.setItem('token', token)
          this.router.navigate(['/profile'])
        })
      ),
    { dispatch: false }
  )

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







}
