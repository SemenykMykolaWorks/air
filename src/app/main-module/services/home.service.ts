import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../root-module/services/base-api';
import { Home } from '../../models/home';

@Injectable()
export class HomeService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getHome(): Observable<Home> {
    return this.get('/home');
  }

}
