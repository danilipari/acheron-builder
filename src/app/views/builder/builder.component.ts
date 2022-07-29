import { Component, OnInit } from '@angular/core';

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

  items: Array<any> = [
    {
      "type": "select",
      "label": "Oggetto dell'incarico",
      "name": "oggetto-dell-incarico",
      "validations": [],
      "options": [
        "option1",
        "option2",
        "option3"
      ]
    },
    {
      "type": "text",
      "label": "Tipologia Incarico",
      "name": "tipologia-incarico",
      "validations": [],
      "options": [
        ""
      ]
    },
    {
      "type": "date",
      "label": "Data inizio incarico",
      "inputType": "date",
      "name": "inizio-incarico",
      "validations": [],
      "options": [
        ""
      ]
    },
    {
      "type": "text",
      "label": "Data fine incarico",
      "name": "fine-incarico",
      "validations": [
        {
          "name": "required",
          "validator": "Validators.required",
          "message": "Campo obbligatorio"
        }
      ],
      "options": [""]
    },
    {
      "type": "upload",
      "label": "upload",
      "name": "upload",
      "validations": [],
      "options": [
        ""
      ]
    },
    {
      "type": "button",
      "label": "Salva"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
