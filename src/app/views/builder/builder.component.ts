import { Component, OnInit } from '@angular/core';
import { ConfigurationDialog, FormContainer, FormStructure } from '../../shared/interfaces';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRenderComponent } from '../../components/dialog-render/dialog-render.component';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  ea_icon: string = 'https://static.escort-advisor.com/favicon.ico';

  types: Array<any> = [
    {
      type: "button",
      label: "button",
      value: null,
    },
    {
      type: "checkbox",
      label: "checkbox",
      value: null,
    },
    {
      type: "color",
      label: "color",
      value: null,
    },
    {
      type: "date",
      label: "date",
      value: null,
    },
    {
      type: "datetime-local",
      label: "datetime-local",
      value: null,
    },
    {
      type: "email",
      label: "email",
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
    },
    {
      type: "month",
      label: "month",
      value: null,
    },
    {
      type: "number",
      label: "number",
      value: null,
    },
    {
      type: "password",
      label: "password",
      value: null,
    },
    {
      type: "radio",
      label: "radio",
      value: null,
    },
    {
      type: "range",
      label: "range",
      value: null,
    },
    {
      type: "reset",
      label: "reset",
      value: null,
    },
    {
      type: "search",
      label: "search",
      value: null,
    },
    {
      type: "submit",
      label: "submit",
      value: null,
    },
    {
      type: "tel",
      label: "tel",
      value: null,
    },
    {
      type: "text",
      label: "text",
      value: null,
    },
    {
      type: "time",
      label: "time",
      value: null,
    },
    {
      type: "url",
      label: "url",
      value: null,
    },
    {
      type: "week",
      label: "week",
      value: null,
    },
  ];

  items: Array<FormStructure> = [
    {
      "index": 0,
      "inputType": "",
      "component":"",
      "editable": true,
      "label": "Title",
      "description": "description",
      "placeholder": "placeholder",
      "options": [],
      "required": false,
      "validation": "/.*/",
    },
  ];

  forms: Array<FormContainer> = [
    {
      id: 1,
      title: "Form #1",
      description: "Form #1 description",
      advertising_campaign_id: 1,
      advertising_campaign: {},
      form: [...this.items],
      layout_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      user_id: 1,
      user: {},
    },
    {
      id: 2,
      title: "Form #2",
      description: "Form #2 description",
      advertising_campaign_id: 2,
      advertising_campaign: {},
      form: [...this.items],
      layout_id: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      user_id: 1,
      user: {},
    },
    {
      id: 3,
      title: "Form #3",
      description: "Form #3 description",
      advertising_campaign_id: 3,
      advertising_campaign: {},
      form: [...this.items],
      layout_id: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      user_id: 1,
      user: {},
    },
  ];

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    /*  */
  }

  /**
   * @description function openDialog
   * @author Docs Angular Material
   * @visibility private
   * @returns void
   */
  private openDialog(): void {
    const dialogRef = this.dialog.open(DialogRenderComponent, {
      width: '250px',
      data: {name: 'Dani'},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
    });
  }

  /**
   * @description function renderDialog
   * @author Dani Lipari
   * @param data: any
   * @param id: number | string
   * @visibility public
   * @returns void
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
