import { Component, OnInit, ViewChild } from '@angular/core';
import { StrapiBabylon2Service } from '../../../services/strapi-babylon2.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-strapi-categories',
  templateUrl: './strapi-categories.component.html',
  styleUrls: ['./strapi-categories.component.scss']
})
export class StrapiCategoriesComponent implements OnInit {
  limit:  number = 10;
  skip: number = 0;
  totalLength: number = 0;

  displayedColumns: string[] = ['id', 'title', 'labels', 'created_at'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  categories: any[] = [];

  constructor(private strapiService: StrapiBabylon2Service) {}

  ngOnInit(): void {
    this.strapiService.getCategoriesItems(1, 10).subscribe((responseData: any) => {
      console.log('---getCategoriesItems---', responseData, '---getCategoriesItems---');

      this.dataSource.data = responseData.results;
      this.totalLength = responseData.results?.length;
      this.dataSource.paginator = this.paginator;
    }), (error: any) => {
      console.log(error);
    }
  }

  public getData(event: any) {
    const limit = event.pageSize;
    const skip = event.pageIndex * limit;
    this.strapiService.getCategoriesItems(skip, limit).subscribe((responseData: any) => {
      this.dataSource.data = responseData.results;
      this.totalLength = responseData.results?.length;
      this.dataSource.paginator = this.paginator;
    }), (error: any) => {
      console.log(error);
    }
  }

}
