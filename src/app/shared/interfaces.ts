export interface SidebarRoutes {
  // Required
  name: string;
  path: string;

  //! Not required
  visible?: boolean;
}

export interface ConfigurationDialog {
  // Required
  data: DialogData;

  //! Not required
  width?: any;
  height?: any;
}

export interface DialogData {
  title: string;
  [key: string]: any;
}

export interface Workflow {
  // Required
  id: string | number;
  uuid: string;
  title: string;
  created_at: string | null;
  forms: Array<number>;
  layout_id: number; // Need to assign default value 0

  //! Not required
  error_form?: number;
  unavailable_form?: number;
  description?: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export interface FormStructure {
  // Required
  id?: number;
  form_name: string;
  form_special: boolean;
  forms: Array<FormItem>;
  actions: Array<FormItem>;
  created_at: string | null;

  //! Not required
  form_text?: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export interface FormItem {
  index: number | null;
  uuid: string;
  inputType: string;
  component: string;
  enabled: boolean;
  label: string;
  name: string;
  error: string;
  value: string;
  visible: boolean;
  href: string;
  description: string;
  placeholder: string;
  options: Array<OptionsFormStructure>;
  required: boolean;
  validation: string;
}

export interface OptionsFormStructure {
  // Required
  optionType: string;
  typeValue: string;
  value: any | null;
}

export interface typeStructure {
  uuid: string;
  type: string;
  label: string;
  value: string | null;
}


export interface resInfo {
  quantity_workflows: number;
  quantity_forms: number;
  /* quantity_layouts: number; */
}

export enum TypesInt {
  String = "string",
  Number = "number",
  Object = "object",
  Array = "array",
  Boolean = "boolean",
  Any = "any",
}

export enum Types {
  string = TypesInt.String,
  number = TypesInt.Number,
  boolean = TypesInt.Boolean,
  /* object = TypesInt.Object,
  array = TypesInt.Array,
  any = TypesInt.Any */
}

/* export enum TypesOptionInt {
  String = "string",
  Number = "number",
  Object = "object",
  Array = "array",
  Boolean = "boolean",
  Any = "any",
}

export enum TypesOption {
  string = TypesInt.String,
  number = TypesInt.Number,
  boolean = TypesInt.Boolean,
  object = TypesInt.Object,
  array = TypesInt.Array,
  any = TypesInt.Any
} */
