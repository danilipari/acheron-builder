import { Component, OnInit } from '@angular/core';
import { ConfigurationDialog, FormContainer, FormStructure, typeStructure } from '../../shared/interfaces';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRenderComponent } from '../../components/dialog-render/dialog-render.component';
import * as uuid from "uuid";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  ea_icon: string = 'https://static.escort-advisor.com/favicon.ico';

  types: Array<typeStructure> = [
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
    {
      uuid: uuid.v4(),
      type: "button",
      label: "button",
      value: null,
    },

    /*
    {
      uuid: uuid.v4(),
      type: "range",
      label: "range",
      value: null,
    },
    {
      type: "checkbox",
      label: "checkbox",
      value: null,
    },
    {
      type: "radio",
      label: "radio",
      value: null,
    },
    {
      type: "color",
      label: "color",
      value: null,
    },
    {
      type: "search",
      label: "search",
      value: null,
    },
    {
      type: "url",
      label: "url",
      value: null,
    },
    {
      type: "submit",
      label: "submit",
      value: null,
    },
    {
      type: "reset",
      label: "reset",
      value: null,
    },
    {
      type: "hidden",
      label: "hidden",
      value: null,
    },
    {
      type: "image",
      label: "image",
      value: null,
    }, */
  ];

  items: Array<FormStructure> = [
    {
      "index": 0,
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
      "index": 1,
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
      "index": 2,
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
      "index": 3,
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
      "index": 4,
      "uuid": uuid.v4(),
      "inputType":"datetime-local",
      "component":"",
      "enabled":true,
      "name":"datetime-local",
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
      "index": 5,
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
      "index": 6,
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
      "index": 7,
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
      "index": 8,
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
      "index": 9,
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
    },
    {
      "index": 10,
      "uuid": uuid.v4(),
      "inputType":"button",
      "component":"",
      "enabled":true,
      "name":"button",
      "label":"button",
      "error":"",
      "description":"description",
      "placeholder":"Insert your button",
      "options":[
        {
          "optionType": "submit",
          "value": false,
        }
      ],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
  ];

  forms: Array<FormContainer> = [
    {
      id: 1,
      uuid: uuid.v4(),
      title: "Form #1",
      description: "Form #1 description",
      form: [...this.items],
      layout_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    },
    {
      id: 2,
      uuid: uuid.v4(),
      title: "Form #2",
      description: "Form #2 description",
      form: [...this.items],
      layout_id: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    },
    {
      id: 3,
      uuid: uuid.v4(),
      title: "Form #3",
      description: "Form #3 description",
      form: [...this.items],
      layout_id: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    },
  ];

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    /*  */
  }

  /**
   * @author Dani Lipari
   * @description Function renderDialog
   * @param data: Any
   * @param id: Number | String
   * @visibility Public
   * @returns Void
   */
  public renderDialog(id: number): void {
    const config: ConfigurationDialog = {
      width: `${window.innerWidth  - (window.innerWidth / 2)}px`,
      height: `${window.innerHeight - 150}px`,
      data: {
        title: this.forms[id]?.title,
        form : this.forms[id]
      },
    };
    const dialogRef = this.dialog.open(DialogRenderComponent, config);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
    });
  }

}
