import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@app/store';

//importar la data del usuario
import * as fromUser from '@app/store/user';
import { filter, map, Observable, tap } from 'rxjs';
import { createInjectableType } from '@angular/compiler';
import { Injectable } from '@angular/core';



//Que lo inyecte desde el modulo
@Injectable({
  providedIn: 'root'
})

export class UnauthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private store: Store<fromRoot.State>) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.check();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.check();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.check();
  }

  //autorizado funciona con email
  private check(): Observable<boolean> {
    return this.store.pipe(select(fromUser.getUserState)).pipe(
      filter((state) => !state.loading),
      tap((state) => {
        //Si no existe el 'id' no está en sesión
        if (state.email) {
          this.router.navigate(['/']);
        }
      }),

      //devuelvo el valor booleano
      map((state) => !state.email)
    );
  }
}
