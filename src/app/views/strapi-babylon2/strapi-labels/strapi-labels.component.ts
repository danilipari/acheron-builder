import { Component, OnInit, ViewChild } from '@angular/core';
import { StrapiBabylon2Service } from '../../../services/strapi-babylon2.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RowTableActionHover } from '../../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-strapi-labels',
  templateUrl: './strapi-labels.component.html',
  styleUrls: ['./strapi-labels.component.scss']
})
export class StrapiLabelsComponent implements OnInit {
  limit:  number = 10;
  skip: number = 0;
  totalLength: number = 0;

  columns: any[] = ['id', 'label_title', 'created_at', "actions"];
  columnList: string[] = ['id', 'label_title', 'created_at', "actions"];

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

  constructor(
    private strapiService: StrapiBabylon2Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.strapiService.getTableCollectionItems("application::label.label", this.skip, this.limit, "label_title", "ASC").subscribe((responseData: any) => {
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
    this.strapiService.getTableCollectionItems("application::label.label", skip, limit, "label_title", "ASC").subscribe((responseData: any) => {
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
    switch (section) {
      case "copy":
        this.router.navigate(['strapi', 'labels', 'detail', element.id], { queryParams: { cp: element.id } });
        break;
        case "edit":
        this.router.navigate(['strapi', 'labels', 'detail', element.id]);
        break;
      case "delete":
        if (confirm("Are you sure you want to delete this entry?")) {
          this.strapiService.deleteTableCollectionItem("application::label.label", element.id).subscribe((responseData: any) => {
            const newList = this.dataSource.data.filter((el: any) => el.id !== element.id);
            this.dataSource.data = newList;
            this.totalLength = newList?.length;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }), (error: any) => {
            console.log(error);
          }
        }
        break;
      default:
        break;
    }
  }

}
