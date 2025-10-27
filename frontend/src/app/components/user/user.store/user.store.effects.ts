import {  inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../../services/user.service";
import { of } from "rxjs";
import {signup, signupSuccess, signupFailure} from './user.store.action';
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { userModel } from "../../../../model/signup.model";
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
    constructor( private userService: UserService) {}

signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      switchMap(action =>
        this.userService.addUser(action.signupData).pipe(
          map(res => 
            signupSuccess({ user: res.user, token: res.token }) // ✅ Extract correctly
          ),
          catchError(err =>
            of(signupFailure({ error: err.error?.message || "Signup failed" }))
          )
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
        })
      ),
    { dispatch: false }
  );

}