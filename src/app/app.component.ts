import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  version: string = '1.0.0';
  min_title_header: string = 'AB';
  title_header: string = 'AcheronBuilder';

  title = 'acheron-builder';

  constructor () {}

  // https://fknop.gitbooks.io/angular-pipes/content/
}
