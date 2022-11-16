import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthUtils } from '../utils/auth.utils';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { Data } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;
  helper = new JwtHelperService();
  userInfo: Data;
  constructor(private _httpClient: HttpClient, private router: Router) {
    this.token = window.localStorage.getItem('access_token');
    this.userInfo = this.helper.decodeToken(this.token);
  }

  private _authenticated: boolean = false;
  set accessToken(token: string) {
    localStorage.setItem('access_token', token);
  }
  get accessToken(): string {
    return localStorage.getItem('access_token') ?? '';
  }

  signIn(token: string) {
    // Throw error, if the user is already logged in
    if (this._authenticated)
      return throwError(() => new Error('El usuario ya inició sesión'));

    this.accessToken = token;
    // Set the authenticated flag to true
    this._authenticated = true;
    this.userInfo = this.helper.decodeToken(token);
  }

  signInUsingToken(): Observable<any> {
    // Renew token
    return this._httpClient
      .post('api/auth/refresh-access-token', { access_token: this.accessToken })
      .pipe(
        catchError(() => {
          return of(false);
        }),
        switchMap((_response: any) => {
          this.accessToken;
          this.userInfo = this.helper.decodeToken(this.accessToken);
          console.clear();
          console.debug(this.userInfo);
          // Set the authenticated flag to true
          this._authenticated = true;
          // Return true
          return of(true);
        })
      );
  }

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('access_token');
    // Set the authenticated flag to false
    this._authenticated = false;
    // Return the observable
    return of(true);
  }

  getToken() {
    return this.accessToken;
  }

  getUserInfo() {
    return this.userInfo;
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    return this.signInUsingToken();
  }
}
