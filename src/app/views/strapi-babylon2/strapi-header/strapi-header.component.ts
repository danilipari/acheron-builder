import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-strapi-header',
  templateUrl: './strapi-header.component.html',
  styleUrls: ['./strapi-header.component.scss']
})
export class StrapiHeaderComponent implements OnInit {

  constructor(private location: Location) {}

  ngOnInit(): void {
    /*  */
  }

  public back(): void {
    this.location.back()
  }

}
