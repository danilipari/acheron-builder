import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-builder-action',
  templateUrl: './builder-action.component.html',
  styleUrls: ['./builder-action.component.scss']
})
export class BuilderActionComponent implements OnInit {
  public route_id: string = this.route.snapshot.params['id'] !== undefined ? this.route.snapshot.params['id'] : '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('routeID Builder', this.route_id);
  }

}
