/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({
  providedIn: "root",
})
export class AuthorizatedGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
  helper = new JwtHelperService();
  token: string | null = null;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private notification: NzNotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.ExpiredToken()) return false;
    if (!this.InvalidRole(route)) return false;
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.ExpiredToken()) return false;
    if (!this.InvalidRole(childRoute)) return false;
    return true;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  private ExpiredToken(): boolean {
    if (this.helper.isTokenExpired(this.AuthService.getToken())) {
      this.router.navigateByUrl("auth/login");
      this.createNotification(
        "info",
        "Su sesión ha expirado, vuelva a iniciar sesión"
      );
      return false;
    }
    return true;
  }

  private InvalidRole(route: ActivatedRouteSnapshot): boolean {
    this.token = window.localStorage.getItem("access_token");
    let user = this.helper.decodeToken(this.token!);
    if (
      route.data["roles"] &&
      route.data["roles"].indexOf(user.info.userType) === -1
    ) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }

  private createNotification(type: string, message?: string): void {
    this.notification.create(type, `Error`, `${message}`);
  }
}
