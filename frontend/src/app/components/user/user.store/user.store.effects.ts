import {  inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../../services/user.service";
import { of } from "rxjs";
import {signup, signupSuccess, signupFailure} from './user.store.action';
import { switchMap, map, catchError } from "rxjs/operators";
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
    constructor( private userService: UserService) {}

signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signup),
      switchMap(action => {
        console.log("Signup effect triggered with:", action.signupData);
        return this.userService.addUser(action.signupData).pipe(  // ✅ Added return here
          map(res => signupSuccess({ user: res.user, token: res.token })),
          catchError(err =>
            of(signupFailure({ error: err.error?.message || 'Signup failed' }))
          )
        );
      })
    );
  });

}