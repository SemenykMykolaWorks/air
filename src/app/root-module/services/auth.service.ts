import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';
import { ROUTES_STRINGS } from '../../constants/routing';
import { EMAIL_KEY, TOKEN_KEY, USER_KEY } from '../../constants/api';
import { AuthPayload } from '../../models/auth';
import { User } from '../../models/user';
import { BaseApi } from './base-api';

@Injectable()
export class AuthService extends BaseApi {
  public isLoggedIn$: BehaviorSubject<boolean>;

  constructor(public http: HttpClient,
              private localStorageService: LocalStorageService,
              private router: Router) {
    super(http);
    this.isLoggedIn$ = new BehaviorSubject<boolean>(!!this.token && !!this.email);
  }

  // Generates a request body and sends a request for the login.
  public login(requestBody: AuthPayload): Observable<User[]> {
    return this.get(`/users?email=${requestBody.email}`).pipe(
      tap(authData => {
        if (authData.length !== 0 && requestBody.password === authData[0].password) {
          this.setUserData(authData);
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  public logout(): void {
    this.localStorageService.clear();
    sessionStorage.clear();
    this.isLoggedIn$.next(false);
    this.router.navigate([ROUTES_STRINGS.LOGIN]);
  }

  // Sends a request to the server to register a new user.
  public registerUser(requestBody: AuthPayload): Observable<User> {
    const user = {email: requestBody.email, password: requestBody.password, name: requestBody.name};
    return this.post('/users', user).pipe(
      tap(authData => {
        this.setUserData(authData);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  public setUserData(authData) {
    if (authData.length) {
      authData = authData[0];
    }
    this.localStorageService.set(TOKEN_KEY, this.getTokenKey(32).toString());
    this.localStorageService.set(EMAIL_KEY, authData.email);
    this.localStorageService.set(USER_KEY, authData.name);
    this.isLoggedIn$.next(true);
  }

  public get token(): string {
    return this.localStorageService.get(TOKEN_KEY);
  }

  public get user(): User {
    return this.localStorageService.get(USER_KEY);
  }

  public get email(): string {
    return this.localStorageService.get(EMAIL_KEY);
  }

  private getTokenKey(length) {
    const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const b = [];
    for (let i = 0; i < length; i++) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join('');
  }

}
