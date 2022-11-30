import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-strapi-header',
  templateUrl: './strapi-header.component.html',
  styleUrls: ['./strapi-header.component.scss']
})
export class StrapiHeaderComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    /*  */
  }

  public goBack(): void {
    this.location.back()
  }

  public goHome(): void {
    this.router.navigate(['strapi']);
  }

}
