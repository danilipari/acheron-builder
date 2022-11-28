import { Component, OnInit, ViewChild } from '@angular/core';
import { StrapiBabylon2Service } from '../../../services/strapi-babylon2.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-strapi-countries',
  templateUrl: './strapi-countries.component.html',
  styleUrls: ['./strapi-countries.component.scss']
})
export class StrapiCountriesComponent implements OnInit {
  limit:  number = 10;
  skip: number = 0;
  totalLength: number = 0;

  columns: any[] = ['id', 'Country', 'labels', 'created_at'];
  columnList: string[] = ['id', 'Country', 'labels', 'created_at'];

  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private strapiService: StrapiBabylon2Service) {}

  ngOnInit(): void {
    this.strapiService.getTableCollectionItems("application::country.country", this.skip, this.limit, "Country", "ASC").subscribe((responseData: any) => {
      this.displayedColumns = this.columns;
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
    this.strapiService.getTableCollectionItems("application::country.country", skip, limit, "Country", "ASC").subscribe((responseData: any) => {
      this.displayedColumns = this.columns;
      this.dataSource.data = responseData.results;
      this.totalLength = responseData.results?.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }), (error: any) => {
      console.log(error);
    }
  }

  public selectionChangeTableColumns(): void {
    this.displayedColumns = this.columns;
  }

}
