import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout-action',
  templateUrl: './layout-action.component.html',
  styleUrls: ['./layout-action.component.scss'],
})
export class LayoutActionComponent implements OnInit {
  public route_id: string =
    this.route.snapshot.params['id'] !== undefined
      ? this.route.snapshot.params['id']
      : '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.debug('routeID Layout', this.route_id);
  }
}
