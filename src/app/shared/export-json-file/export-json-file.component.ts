import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-export-json-file',
  templateUrl: './export-json-file.component.html',
  styleUrls: ['./export-json-file.component.scss']
})
export class ExportJsonFileComponent implements OnInit {

  @Input() public jsonFile!: any;
  @Input() public fileInfo!: any;
  @Input() public hidden: boolean = false;

  constructor() { }

  ngOnInit(): void {
    /*  */
  }

  public downloadJson(): void {
    if (confirm("Confirm download Json?")) {
      let sJson = JSON.stringify(this.jsonFile);
      let element = document.createElement('a');
      element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
      element.setAttribute('download', `${this.fileInfo.name}`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }

}
