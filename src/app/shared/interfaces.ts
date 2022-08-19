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

export interface FormContainer {
  // Required
  id: string | number;
  uuid: string;
  title: string;
  created_at: string | null;
  updated_at: string | null;
  form: Array<FormStructure>; // Need to dclare after

  //! Not required
  description?: string;
  layout_id?: number | string;
  deleted_at?: string | null;
}

export interface FormStructure {
  // Required
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
  options: Array<any>;
  required: boolean;
  validation: string;

  //! Not required
  index?: number | null;
  uuid?: string;
}


export interface typeStructure {
  uuid: string;
  type: string;
  label: string;
  value: string | null;
}
