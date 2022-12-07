import { Component, OnInit, Input } from '@angular/core';
import { FormStructure } from '../interfaces';
import Constants from '../constants';

@Component({
  selector: 'app-export-json-file',
  templateUrl: './export-json-file.component.html',
  styleUrls: ['./export-json-file.component.scss']
})
export class ExportJsonFileComponent implements OnInit {

  private structure_filed_required: string[] = Constants.structureRequiredJSON.form;

  @Input() public jsonFile!: FormStructure;
  @Input() public fileInfo!: any;
  @Input() public hidden: boolean = false;
  @Input() public color: string = 'light';

  constructor() { }

  ngOnInit(): void {
    /*  */
  }

  public downloadJson(): void {
    if (this.validateJSONOutput()?.can) {
      if (confirm(`Confirm download ${this.fileInfo.name}?`)) {
        let sJson = JSON.stringify(this.jsonFile);
        let element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
        element.setAttribute('download', `${this.fileInfo.name}`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    } else {
      alert(`JSON structure not valid, missing some required '${this.validateJSONOutput()?.missing?.join(', ')}'`);
    }
  }

  private validateJSONOutput(): any {
    const dataIn = Object.keys(this.jsonFile);
    const validation = this.structure_filed_required.map((el: any) => ({ test: dataIn.includes(el), value: el}));
    const resValidation = {
      missing: validation?.filter((el: any) => !el.test)?.map((elMiss: ({ test: boolean, value: string })) => (elMiss.value)),
      can: validation.every((elValid: ({ test: boolean, value: string })) => elValid.test === true)
    };

    return resValidation;
  }

}
