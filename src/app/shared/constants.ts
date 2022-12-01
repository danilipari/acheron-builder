import * as uuid from "uuid";
import { AngularEditorConfig } from '@kolkov/angular-editor';

export default class Constants {

  static _itemsFormItem: any[] = [
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"text",
      "component":"input",
      "enabled":true,
      "name":"text",
      "label":"text",
      "error":"",
      "description":"description",
      "placeholder":"Insert your text",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
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
      "inputType":"label",
      "component":"label",
      "enabled":true,
      "name":"label",
      "label":"label",
      "error":"",
      "description":"description",
      "placeholder":"Insert your label",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[
        {
          "optionType": "country",
          "typeValue": "string",
          "value": "",
        },
        {
          "optionType": "languages",
          "typeValue": "string",
          "value": "",
        }
      ],
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
      "component":"input",
      "enabled":true,
      "name":"email",
      "label":"email",
      "error":"",
      "description":"description",
      "placeholder":"Insert your email",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"password",
      "component":"input",
      "enabled":true,
      "name":"password",
      "label":"password",
      "error":"",
      "description":"description",
      "placeholder":"Insert your password",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"date",
      "component":"input",
      "enabled":true,
      "name":"date",
      "label":"date",
      "error":"",
      "description":"description",
      "placeholder":"Insert your date",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"datetime-local",
      "component":"input",
      "enabled":true,
      "name":"datetime-local",
      "label":"datetime-local",
      "error":"",
      "description":"description",
      "placeholder":"Insert your datetime-local",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"number",
      "component":"input",
      "enabled":true,
      "name":"number",
      "label":"number",
      "error":"",
      "description":"description",
      "placeholder":"Insert your number",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"tel",
      "component":"input",
      "enabled":true,
      "name":"tel",
      "label":"tel",
      "error":"",
      "description":"description",
      "placeholder":"Insert your tel",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"time",
      "component":"input",
      "enabled":true,
      "name":"time",
      "label":"time",
      "error":"",
      "description":"description",
      "placeholder":"Insert your time",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"week",
      "component":"input",
      "enabled":true,
      "name":"week",
      "label":"week",
      "error":"",
      "description":"description",
      "placeholder":"Insert your week",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"month",
      "component":"input",
      "enabled":true,
      "name":"month",
      "label":"month",
      "error":"",
      "description":"description",
      "placeholder":"Insert your month",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"button",
      "component":"button",
      "enabled":true,
      "name":"button",
      "label":"button",
      "error":"",
      "description":"description",
      "placeholder":"Insert your button",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[
        {
          "optionType": "submit",
          "typeValue": "boolean",
          "value": false,
        }
      ],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    // Special Forms
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"externalwidget",
      "component":"externalwidget",
      "enabled":true,
      "name":"externalwidget",
      "label":"externalwidget",
      "error":"",
      "description":"description",
      "placeholder":"Insert your externalwidget",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[
        {
          "optionType": "components",
          "typeValue": "string",
          "value": "component",
        }
      ],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"customeditor",
      "component":"customeditor",
      "enabled":true,
      "name":"customeditor",
      "label":"customeditor",
      "error":"",
      "description":"description",
      "placeholder":"Insert your customeditor",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"select",
      "component":"select",
      "enabled":true,
      "name":"select",
      "label":"select",
      "error":"",
      "description":"description",
      "placeholder":"Select your otion",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[
        {
          "optionType": "option",
          "typeValue": "string",
          "value": "option list item",
        }
      ],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"textarea",
      "component":"textarea",
      "enabled":true,
      "name":"textarea",
      "label":"textarea",
      "error":"",
      "description":"description",
      "placeholder":"Insert your textarea",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[
        {
          "optionType": "attribute--rows",
          "typeValue": "string",
          "value": "5",
        },
        {
          "optionType": "attribute--cols",
          "typeValue": "string",
          "value": "25",
        }
      ],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"group",
      "component":"group",
      "enabled":true,
      "name":"group",
      "label":"group",
      "error":"",
      "description":"description",
      "placeholder":"Select your otion",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[
        {
          "optionType": "option",
          "typeValue": "string",
          "value": "group item",
        }
      ],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"checkbox",
      "component":"checkbox",
      "enabled":true,
      "name":"checkbox",
      "label":"checkbox",
      "error":"",
      "description":"description",
      "placeholder":"Select your checkbox",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[
        {
          "optionType": "option",
          "typeValue": "boolean",
          "value": "false",
        },
        {
          "optionType": "inverse",
          "typeValue": "boolean",
          "value": "false",
        },
      ],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"radio",
      "component":"radio",
      "enabled":true,
      "name":"radio",
      "label":"radio",
      "error":"",
      "description":"description",
      "placeholder":"Select your radio",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[
        {
          "optionType": "option",
          "typeValue": "boolean",
          "value": false,
        },
        {
          "optionType": "option",
          "typeValue": "boolean",
          "value": true,
        },
      ],
      "required":false,
      "validation":"",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"qr-code",
      "component":"qr-code",
      "enabled":true,
      "name":"qr-code",
      "label":"qr-code",
      "error":"",
      "description":"",
      "placeholder":"Select your qr-code",
      "uuidRef": uuid.v4(),
      "childrenRef": [],
      "options":[],
      "required":false,
      "validation":"",
      "value": "https://www.escort-advisor.com/",
      "visible":true,
      "href":"https://www.escort-advisor.com/"
    },
  ];

  static typesFormsTypeStructure: any[] = [
    {
      uuid: uuid.v4(),
      type: "text",
      label: "text",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "label",
      label: "label",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "email",
      label: "email",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "password",
      label: "password",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "date",
      label: "date",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "datetime-local",
      label: "datetime-local",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "number",
      label: "number",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "tel",
      label: "tel",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "time",
      label: "time",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "week",
      label: "week",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "month",
      label: "month",
      length: 1,
      value: null,
    },
    // Special Forms
    {
      uuid: uuid.v4(),
      type: "externalwidget",
      label: "external widget",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "customeditor",
      label: "custom editor",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "select",
      label: "select",
      length: 2,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "textarea",
      label: "textarea",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "group",
      label: "group",
      length: 2,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "checkbox",
      label: "checkbox",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "radio",
      label: "radio",
      length: 2,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "qr-code",
      label: "qr-code",
      length: 1,
      value: null,
    },
  ];

  static typesActionsTypeStructure: any[] = [
    {
      uuid: uuid.v4(),
      type: "button",
      label: "button",
      length: 1,
      value: null,
    },
  ];

  static strapiLanguages: [
    { label: "Italian", value: "IT" },
    { label: "English", value: "EN" },
    { label: "Spanish", value: "ES" },
    { label: "German", value: "DE" },
    { label: "Chinese", value: "ZH" },
    { label: "Russian", value: "RU" },
  ];

  static strapiCountries: [
    { label: "Germany", value: "DE" },
    { label: "Spain", value: "ES" },
    { label: "United Kingdom", value: "GB" },
    { label: "Italy", value: "IT" },
  ];

  static angularEditorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '250px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'no',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    /* uploadUrl: 'v1/image',
    upload: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData)
      return this.formService.uploadImage(formData);
    }, */
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        // 'undo',
        // 'redo',
        // 'bold',
        // 'italic',
        // 'underline',
        // 'strikeThrough',
        // 'subscript',
        // 'superscript',
        // 'justifyLeft',
        // 'justifyCenter',
        // 'justifyRight',
        // 'justifyFull',
        // 'indent',
        // 'outdent',
        // 'insertUnorderedList',
        // 'insertOrderedList',
        // 'heading',
        // 'fontName'
      ],
      [
        // 'fontSize',
        // 'textColor',
        // 'backgroundColor',
        // 'customClasses',
        // 'link',
        // 'unlink',
        // 'insertImage',
        // 'insertVideo',
        // 'insertHorizontalRule',
        // 'removeFormat',
        // 'toggleEditorMode'
      ],
      [
        'insertVideo',
        'insertImage'
      ]
    ]
  };

}
