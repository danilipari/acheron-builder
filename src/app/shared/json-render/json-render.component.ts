import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'acheron-json-render',
  template: `
    <div id="json_reder" class="px-4">
      <ng-container *ngIf="in_out; else render">
        <ngx-json-viewer [json]="json" [expanded]="true"></ngx-json-viewer>
      </ng-container>
      <ng-template #render>
        <form class="form-group">
          <div class="mt-2" *ngFor="let element of json; let iJ = index;">
            <!-- {{ element | json }}
            <hr> -->
            <div class="d-flex justify-content-between">
              <label>{{ element.label }}</label>
              <p class="mb-0 text-muted">{{ element.description }}</p>
            </div>
            <input class="form-control" [autocomplete]="'on'" [name]="element.name" [id]="element.name" [type]="element.inputType" [placeholder]="element.placeholder" [disabled]="!element.enabled" [(ngModel)]="element.value">
          </div>
        </form>
      </ng-template>
    </div>
  `,
})
export class JsonRenderComponent implements OnInit {

  @Input() public json: any;
  @Input() public in_out: any;

  constructor() { }

  ngOnInit(): void {
    /*  */
  }

}
