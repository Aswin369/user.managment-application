import {  inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../../services/user.service";
import { of } from "rxjs";
import {signup, signupSuccess, signupFailure} from './user.store.action';
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { userModel } from "../../../../model/signup.model";
import { Router } from "@angular/router";
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
    constructor( private userService: UserService, private router: Router) {}

signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      switchMap(action =>
        this.userService.addUser(action.signupData).pipe(
          map(res =>{ 
            console.log("user data in effect", res.user)
            return signupSuccess({ user: res.user, token: res.token }) // ✅ Extract correctly
          }),
          catchError(err =>{
            console.log("This is error form effect",err);
           return of(signupFailure({ error: err.error?.message || "Signup failed" }))
          })
        )
      )
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupSuccess),
        tap(({ user, token }:{ user: userModel; token: string }) => {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/profile'])
        })
      ),
    { dispatch: false }
  );
}