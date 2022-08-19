function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c: any) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

const types: Array<any> = [
  {
    uuid: uuidv4(),
    type: "text",
    label: "text",
    value: null,
  },
  {
    uuid: uuidv4(),
    type: "email",
    label: "email",
    value: null,
  },
  {
    uuid: uuidv4(),
    type: "password",
    label: "password",
    value: null,
  },
  {
    uuid: uuidv4(),
    type: "date",
    label: "date",
    value: null,
  },
  {
    uuid: uuidv4(),
    type: "datetime-local",
    label: "datetime-local",
    value: null,
  },
  {
    uuid: uuidv4(),
    type: "number",
    label: "number",
    value: null,
  },
  {
    uuid: uuidv4(),
    type: "tel",
    label: "tel",
    value: null,
  },
  {
    uuid: uuidv4(),
    type: "time",
    label: "time",
    value: null,
  },
  {
    uuid: uuidv4(),
    type: "week",
    label: "week",
    value: null,
  },
  {
    uuid: uuidv4(),
    type: "month",
    label: "month",
    value: null,
  },
  {
    uuid: uuidv4(),
    type: "button",
    label: "button",
    value: null,
  },
];


let items: any[] = [];


console.log('--- in generator ---');

items = types.map((el: any, index: number) => ({
  "index": index,
  "uuid": uuidv4(),
  "inputType": `${el.type}`,
  "component":"",
  "enabled": true,
  "name": `${el.type}-${index}`,
  "label": `${el.type}`,
  "value": "",
  "visible": true,
  "error": "",
  "description": "description",
  "placeholder": `Insert your ${el.type}`,
  "options": [],
  "required": false,
  "validation": "/.*/",
  "href": "",
}));

console.log(items);

console.log('--- out generator ---');
