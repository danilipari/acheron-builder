const types: Array<any> = [
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


let items: any[] = [];


console.log('--- in generator ---');

items = types.map((el: any, index: number) => ({
  "index": index,
  "inputType": el.type,
  "component":"",
  "enabled": true,
  "name": "",
  "label": el.label,
  "error": "",
  "description": "description",
  "placeholder": `Insert your ${el.type}`,
  "options": [],
  "required": false,
  "validation": "/.*/",
}));

console.log(items);

console.log('--- out generator ---');


