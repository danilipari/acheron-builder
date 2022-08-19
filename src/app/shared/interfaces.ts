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
  forms: Array<FormStructure>;
  layout_id: number; // Need to assign default value 0

  //! Not required
  error_form?: Array<FormStructure>;
  unavailable_form?: Array<FormStructure>;
  description?: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export interface FormStructure {
  // Required
  form_name: string;
  form_special: boolean;
  forms: Array<FormItem>;
  actions: Array<FormItem>;

  //! Not required
  form_text?: string;
}

export interface FormItem {
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

  //! Not required
  index?: number | null;
  uuid?: string;
}

export interface OptionsFormStructure {
  // Required
  optionType: string;
  value: boolean | string | null;
}


export interface typeStructure {
  uuid: string;
  type: string;
  label: string;
  value: string | null;
}
