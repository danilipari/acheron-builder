import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  version: string = '1.0.0';
  title_header: string = 'AcheronBuilder';

  title = 'acheron-builder';

  constructor () {}
}
