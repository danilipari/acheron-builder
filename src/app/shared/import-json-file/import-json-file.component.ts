import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-import-json-file',
  templateUrl: './import-json-file.component.html',
  styleUrls: ['./import-json-file.component.scss']
})
export class ImportJsonFileComponent implements OnInit {
  @Input() public exit_path!: any[];
  @Input() public format_accpeted!: string;
  @Output() public emitStatus = new EventEmitter<boolean>(false);

  public jsonFile: any = null;
  public fileInfo: any = null;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.emitStatus.emit(this.checkStatus());
  }

  public exitAction(): void {
    this.router.navigate([...this.exit_path]);
  }

  public chooseFile(): void {
    const upload = document.getElementById('import-json');
    this.jsonFile = null;
    this.fileInfo = null;
    this.emitStatus.emit(this.checkStatus());
    upload && upload.click();
  }

  public onFileChanged(event: any): void {
    const targetFile = event.target.files[0];

    if (targetFile) {
      const fileReader = new FileReader();
      fileReader.readAsText(targetFile, "utf-8");
      fileReader.onload = () => {
        this.jsonFile = JSON.parse(String(fileReader.result));
        this.fileInfo = targetFile;
        this.emitStatus.emit(this.checkStatus());
        console.debug(this.jsonFile, this.fileInfo, 'event');
      }
      fileReader.onerror = (error: any) => {
        this.emitStatus.emit(false);
        console.log(error);
      }
    }
  }

  public deleteJson(): void {
    setTimeout(() => {
      this.jsonFile = null;
      this.fileInfo = null;
      this.emitStatus.emit(this.checkStatus());
    }, 500);
  }

  public checkStatus(): boolean {
    return this.jsonFile !== null;
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
