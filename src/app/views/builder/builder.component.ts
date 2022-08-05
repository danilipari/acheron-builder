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
      type: "text",
      label: "text",
      value: null,
    },
    {
      type: "email",
      label: "email",
      value: null,
    },
    {
      type: "password",
      label: "password",
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
      type: "number",
      label: "number",
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
      type: "range",
      label: "range",
      value: null,
    },
    {
      type: "tel",
      label: "tel",
      value: null,
    },
    {
      type: "time",
      label: "time",
      value: null,
    },
    {
      type: "week",
      label: "week",
      value: null,
    },
    {
      type: "month",
      label: "month",
      value: null,
    },

    /* {
      type: "color",
      label: "color",
      value: null,
    },
    {
      type: "button",
      label: "button",
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
      index: 0,
      inputType: 'text',
      component: '',
      enabled: true,
      name: 'text-0',
      label: 'text',
      error: '',
      description: 'description',
      placeholder: 'Insert your text',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 1,
      inputType: 'email',
      component: '',
      enabled: true,
      name: 'email-1',
      label: 'email',
      error: '',
      description: 'description',
      placeholder: 'Insert your email',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 2,
      inputType: 'password',
      component: '',
      enabled: true,
      name: 'password-2',
      label: 'password',
      error: '',
      description: 'description',
      placeholder: 'Insert your password',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 3,
      inputType: 'date',
      component: '',
      enabled: true,
      name: 'date-3',
      label: 'date',
      error: '',
      description: 'description',
      placeholder: 'Insert your date',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 4,
      inputType: 'datetime-local',
      component: '',
      enabled: true,
      name: 'datetime-local-4',
      label: 'datetime-local',
      error: '',
      description: 'description',
      placeholder: 'Insert your datetime-local',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 5,
      inputType: 'number',
      component: '',
      enabled: true,
      name: 'number-5',
      label: 'number',
      error: '',
      description: 'description',
      placeholder: 'Insert your number',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 6,
      inputType: 'checkbox',
      component: '',
      enabled: true,
      name: 'checkbox-6',
      label: 'checkbox',
      error: '',
      description: 'description',
      placeholder: 'Insert your checkbox',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 7,
      inputType: 'radio',
      component: '',
      enabled: true,
      name: 'radio-7',
      label: 'radio',
      error: '',
      description: 'description',
      placeholder: 'Insert your radio',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 8,
      inputType: 'range',
      component: '',
      enabled: true,
      name: 'range-8',
      label: 'range',
      error: '',
      description: 'description',
      placeholder: 'Insert your range',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 9,
      inputType: 'tel',
      component: '',
      enabled: true,
      name: 'tel-9',
      label: 'tel',
      error: '',
      description: 'description',
      placeholder: 'Insert your tel',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 10,
      inputType: 'time',
      component: '',
      enabled: true,
      name: 'time-10',
      label: 'time',
      error: '',
      description: 'description',
      placeholder: 'Insert your time',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 11,
      inputType: 'week',
      component: '',
      enabled: true,
      name: 'week-11',
      label: 'week',
      error: '',
      description: 'description',
      placeholder: 'Insert your week',
      options: [],
      required: false,
      validation: '/.*/'
    },
    {
      index: 12,
      inputType: 'month',
      component: '',
      enabled: true,
      name: 'month-12',
      label: 'month',
      error: '',
      description: 'description',
      placeholder: 'Insert your month',
      options: [],
      required: false,
      validation: '/.*/'
    }
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
