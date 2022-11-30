import { Component, OnInit, ViewChild } from '@angular/core';
import { StrapiBabylon2Service } from '../../../services/strapi-babylon2.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RowTableActionHover } from '../../../shared/interfaces';

@Component({
  selector: 'app-strapi-categories',
  templateUrl: './strapi-categories.component.html',
  styleUrls: ['./strapi-categories.component.scss']
})
export class StrapiCategoriesComponent implements OnInit {
  limit:  number = 10;
  skip: number = 0;
  totalLength: number = 0;

  columns: any[] = ['id', 'title', 'labels', 'created_at', 'actions'];
  columnList: string[] = ['id', 'title', 'labels', 'created_at', 'actions'];

  actions: any[] = [
    {
      label: 'Copy',
      icon: 'clipboard',
      action: (row: any) => this.actionTable(row, 'copy'),
    },
    {
      label: 'Edit',
      icon: 'pencil',
      action: (row: any) => this.actionTable(row, 'edit'),
    },
    {
      label: 'Delete',
      icon: 'trash',
      action: (row: any) => this.actionTable(row, 'delete'),
    }
  ];

  rowHover: RowTableActionHover = {
    actionIndex: null,
    elementIndex: null
  };

  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private strapiService: StrapiBabylon2Service) {}

  ngOnInit(): void {
    this.strapiService.getTableCollectionItems("application::category.category", this.skip, this.limit, "category_title", "ASC").subscribe((responseData: any) => {
      this.changeTableColumns();
      this.dataSource.data = responseData.results;
      this.totalLength = responseData.results?.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }), (error: any) => {
      console.log(error);
    }
  }

  public getData(event: any) {
    const limit = event.pageSize;
    const skip = event.pageIndex * limit;
    this.strapiService.getTableCollectionItems("application::category.category", skip, limit, "category_title", "ASC").subscribe((responseData: any) => {
      this.changeTableColumns();
      this.dataSource.data = responseData.results;
      this.totalLength = responseData.results?.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }), (error: any) => {
      console.log(error);
    }
  }

  public changeTableColumns(): void {
    this.displayedColumns = this.columns;
  }

  private actionTable(element: any, section: string): void {
    console.log(section, element);
  }
}
