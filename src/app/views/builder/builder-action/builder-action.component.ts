import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { typeStructure, FormStructure } from '../../../shared/interfaces';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import * as uuid from "uuid";

@Component({
  selector: 'app-builder-action',
  templateUrl: './builder-action.component.html',
  styleUrls: ['./builder-action.component.scss']
})
export class BuilderActionComponent implements OnInit {
  public route_id: string = this.route.snapshot.params['id'] !== undefined ? this.route.snapshot.params['id'] : '';

  public formSelected: string = '';

  public type!: any;

  private _items: Array<FormStructure> = [
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"text",
      "component":"",
      "enabled":true,
      "name":"text",
      "label":"text",
      "error":"",
      "description":"description",
      "placeholder":"Insert your text",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"email",
      "component":"",
      "enabled":true,
      "name":"email",
      "label":"email",
      "error":"",
      "description":"description",
      "placeholder":"Insert your email",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"password",
      "component":"",
      "enabled":true,
      "name":"password",
      "label":"password",
      "error":"",
      "description":"description",
      "placeholder":"Insert your password",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"date",
      "component":"",
      "enabled":true,
      "name":"date",
      "label":"date",
      "error":"",
      "description":"description",
      "placeholder":"Insert your date",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"datetime-local",
      "component":"",
      "enabled":true,
      "name":"datetime-local-4",
      "label":"datetime-local",
      "error":"",
      "description":"description",
      "placeholder":"Insert your datetime-local",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"number",
      "component":"",
      "enabled":true,
      "name":"number",
      "label":"number",
      "error":"",
      "description":"description",
      "placeholder":"Insert your number",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"checkbox",
      "component":"",
      "enabled":true,
      "name":"checkbox",
      "label":"checkbox",
      "error":"",
      "description":"description",
      "placeholder":"Insert your checkbox",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"radio",
      "component":"",
      "enabled":true,
      "name":"radio",
      "label":"radio",
      "error":"",
      "description":"description",
      "placeholder":"Insert your radio",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"range",
      "component":"",
      "enabled":true,
      "name":"range",
      "label":"range",
      "error":"",
      "description":"description",
      "placeholder":"Insert your range",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"tel",
      "component":"",
      "enabled":true,
      "name":"tel",
      "label":"tel",
      "error":"",
      "description":"description",
      "placeholder":"Insert your tel",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"time",
      "component":"",
      "enabled":true,
      "name":"time",
      "label":"time",
      "error":"",
      "description":"description",
      "placeholder":"Insert your time",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"week",
      "component":"",
      "enabled":true,
      "name":"week",
      "label":"week",
      "error":"",
      "description":"description",
      "placeholder":"Insert your week",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"month",
      "component":"",
      "enabled":true,
      "name":"month",
      "label":"month",
      "error":"",
      "description":"description",
      "placeholder":"Insert your month",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    }
  ];

  public types: Array<typeStructure> = [
    {
      uuid: uuid.v4(),
      type: "text",
      label: "text",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "email",
      label: "email",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "password",
      label: "password",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "date",
      label: "date",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "datetime-local",
      label: "datetime-local",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "number",
      label: "number",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "tel",
      label: "tel",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "time",
      label: "time",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "week",
      label: "week",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "month",
      label: "month",
      value: null,
    },
  ];

  private _db: any;

  public forms: Array<typeStructure | FormStructure> = [
    {
      "index":0,
      "uuid": uuid.v4(),
      "inputType":"text",
      "component":"",
      "enabled":true,
      "name":"text-0",
      "label":"text",
      "error":"",
      "description":"description",
      "placeholder":"Insert your text",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('routeID Builder', this.route_id);
    this.init();
  }

  init(): void {
    this.indexFormRefresh();
    if(localStorage.getItem('_local_db')) {
      this._db = localStorage.getItem('_local_db');
      this.forms = JSON.parse(this._db);
    } else {
      localStorage.setItem('_local_db', JSON.stringify(this.forms));
    }
  }

  dragStart($event: any, type: string, uuid: string, index: number): void {
    this.type = {
      type: type,
      uuid: uuid,
    };
  }

  setFormItem(uuid: string): void {
    this.formSelected = uuid;
  }

  getFormItem(uuid: string): any {
    return this.forms.filter((form: any) => form.uuid === uuid)[0];
  }

  rmFromItem(uuid: string): void {
    this.forms = this.forms.filter((form: any) => form.uuid !== uuid);

    if (this.forms.length > 0) {
      localStorage.setItem('_local_db', JSON.stringify(this.forms));
    } else {
      this.init();
    }
  }

  indexFormRefresh(): void {
    this.forms?.forEach((form: any, index: number) => { form.index = index });
  }

  trackByFn(index: number, item: any) {
    return item.uuid;
  }

  drop(event: CdkDragDrop<number[]>) {
    const fromIndex = event.previousIndex;
    const leaveIndex = event.currentIndex;
    if (this.type.type === 'types') {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.forms[leaveIndex] = this._items.filter((item: any) => (item.inputType === this.types[fromIndex].type))[0];
      this.indexFormRefresh();

      localStorage.setItem('_local_db', JSON.stringify(this.forms));
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.indexFormRefresh();
    }
    this.types = this.types.map((elMap: any) => ({...elMap, uuid: uuid.v4()}));
  }

}
