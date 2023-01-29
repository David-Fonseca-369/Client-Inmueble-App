import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { environment } from 'environments/environment';
import {  Observable, of,} from 'rxjs';
import { catchError, map,  switchMap, tap } from 'rxjs/operators';
import * as fromActions from './user.actions';
import { UserResponse } from './user.models';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private httpClient: HttpClient,
    private actions: Actions,
    private notification: NotificationService,
    private router: Router
  ) {}

  signUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      //acción
      ofType(fromActions.Types.SIGN_UP_EMAIL),
      //parámetros para llamada
      map((action: fromActions.SignUpEmail) => action.user),
      switchMap(userData =>
        //llamada al servicio
        this.httpClient.post<UserResponse>(`${environment.url}api/usuario/registrar`, userData)
          .pipe(
            //exitoso
            tap((response: UserResponse) => {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/']);
            }),
            //aquí no se envuelve en of, porque ya es observable
            map((response: UserResponse) => new fromActions.SignUpEmailSuccess(response.email, response || null)),
            //catchError(err => of(new fromActions.SignUpEmailError(err.message)))

            //error
            //aquí se envuelve en of porque espera un observable
            catchError(err => {

              this.notification.error("Errores al registrar nuevo usuario");
              return of(new fromActions.SignUpEmailError(err.message))

            })


          )
      )
    )
  );


  signInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => action.credentials),
      switchMap(credentials =>
        this.httpClient.post<UserResponse>(`${environment.url}api/usuario/login`, credentials)
          .pipe(
            tap((response: UserResponse) => {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/']);
            }),
            map((response: UserResponse) => new fromActions.SignInEmailSuccess(response.email, response || null)),
            //catchError(err => of(new fromActions.SignInEmailError(err.message)))
            catchError(err => {

              this.notification.error("Credenciales incorrectas");
              return of(new fromActions.SignInEmailError(err.message))

            })

          )
      )
    )
  );


  init: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.INIT),
      switchMap(async () => localStorage.getItem('token')),
      switchMap(token => {

        if (token) {
          return this.httpClient.get<UserResponse>(`${environment.url}api/usuario`)
            .pipe(
              tap((user: UserResponse) => {
                console.log('data del usuario en sesion que viene del servidor=>', user);
              }),
              map((user: UserResponse) => new fromActions.InitAuthorized(user.email, user || null)),
              catchError(err => of(new fromActions.InitError(err.message)))
            )
        } else {
          return of(new fromActions.InitUnauthorized());
        }
      }
      )
    )
  );



}
