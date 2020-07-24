import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../root-module/services/base-api';
import { Table } from '../../models/table';

@Injectable()
export class TableService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getTable(): Observable<Table> {
    return this.get('/table');
  }

}
