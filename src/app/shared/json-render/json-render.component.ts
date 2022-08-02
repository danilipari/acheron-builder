import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-json-render',
  templateUrl: './json-render.component.html',
  styleUrls: ['./json-render.component.scss']
})
export class JsonRenderComponent implements OnInit {

  @Input() public json: any;

  constructor() { }

  ngOnInit(): void {
  }

}
