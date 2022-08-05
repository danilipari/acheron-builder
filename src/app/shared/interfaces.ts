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
  title: string;
  created_at: string | null;
  updated_at: string | null;
  form: Array<FormStructure>; // Need to dclare after
  user_id: string | number;
  user: object; // Need to dclare after

  //! Not required
  description?: string;
  layout_id?: number | string;
  deleted_at?: string | null;
  advertising_campaign_id?: number | string;
  advertising_campaign?: object; // Need to dclare after
}

export interface FormStructure {
  // Required
  inputType: string;
  component: string;
  enabled: boolean;
  label: string;
  name: string;
  error: string;
  description: string;
  placeholder: string;
  options: Array<any>;
  required: boolean;
  validation: string;

  //! Not required
  index?: number;
}


export interface typeStructure {
  type: string;
  label: string;
  value: string | null;
}
