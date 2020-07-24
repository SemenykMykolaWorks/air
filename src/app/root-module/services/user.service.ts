import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from './base-api';
import { User } from '../../models/user';

@Injectable()
export class UserService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.get(`/users?email=${email}`);
  }

}
