import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TableService } from '../../services/table.service';
import { Table } from '../../../models/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public tableData: any = [];
  public searchValue = '';
  public searchPlaceholder = 'Id';
  public searchField = 'id';
  public displayedColumns: string[] = ['id', 'name', 'weight', 'symbol'];
  public dataSource: MatTableDataSource<Table>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public tableService: TableService) {
  }

  public ngOnInit(): void {
    this.tableService.getTable().subscribe( item => {
      this.tableData = item;
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public changeCriteria(field: string): void {
    this.searchPlaceholder = field;
    this.searchField = field.toLocaleLowerCase();
  }
}
