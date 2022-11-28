import { Component, OnInit, ViewChild } from '@angular/core';
import { StrapiBabylon2Service } from '../../../services/strapi-babylon2.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-strapi-labels',
  templateUrl: './strapi-labels.component.html',
  styleUrls: ['./strapi-labels.component.scss']
})
export class StrapiLabelsComponent implements OnInit {
  limit:  number = 10;
  skip: number = 0;
  totalLength: number = 0;

  displayedColumns: string[] = ['id', 'label_title', 'created_at'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private strapiService: StrapiBabylon2Service) {}

  ngOnInit(): void {
    this.strapiService.getTableCollectionItems("application::label.label", this.skip, this.limit, "label_title", "ASC").subscribe((responseData: any) => {
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
      this.dataSource.data = responseData.results;
      this.totalLength = responseData.results?.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }), (error: any) => {
      console.log(error);
    }
  }

}
