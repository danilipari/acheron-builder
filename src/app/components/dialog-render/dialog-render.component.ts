import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationDialog, Workflow, FormStructure } from '../../shared/interfaces';
import * as uuid from "uuid";

@Component({
  selector: 'app-dialog-render',
  templateUrl: './dialog-render.component.html',
  styleUrls: ['./dialog-render.component.scss']
})
export class DialogRenderComponent implements OnInit {

  forms: any[] = [{
    id: 0,
    form_name: 'form name',
    form_special: false,
    form_text: '',
    forms: [
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
    ],
    actions: [
      {
        "index": 1,
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
    ],
  }];

  constructor(
    private dialogRef: MatDialogRef<DialogRenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigurationDialog | any,
  ) {
    dialogRef.disableClose = false;
  }

  ngOnInit(): void {
    /*  */
  }

  public renderJsonWorkflow(data: Workflow): any {
    const res = { ...data, forms: data.forms?.map((form: any) => (this.forms.filter(el => form === el.id)[0])) };
    return res;
  }

  onNoClick(): void {
    const output: any = {
      close: true
    };
    this.dialogRef.close(output);
  }

}
