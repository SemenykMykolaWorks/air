import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BASE_URL } from '../../constants/api';

@Injectable()
export class BaseApi {
  private baseUrl = BASE_URL;

  constructor(public http: HttpClient) {
  }

  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url));
  }

  public post(url: string = '', data: any = []): Observable<any> {
    return this.http.post(this.getUrl(url), data);
  }
}
