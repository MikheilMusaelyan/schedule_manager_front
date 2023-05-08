import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanActivateChildFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";

import { selectIsLoggedIn } from "src/app/login/login.selectors";

export const activateAuth: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
    map((isLoggedIn: boolean) => {
      if(!isLoggedIn) { router.navigate(['login']) };
      return isLoggedIn;
    }),
    catchError(() => {
      router.navigate(['login']);
      return of(false);
    })
  );
};

export const activateChildAuth: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => activateAuth(route, state);
