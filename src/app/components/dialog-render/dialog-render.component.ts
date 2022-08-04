import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationDialog } from '../../shared/interfaces';

@Component({
  selector: 'app-dialog-render',
  templateUrl: './dialog-render.component.html',
  styleUrls: ['./dialog-render.component.scss']
})
export class DialogRenderComponent implements OnInit {

  form: Array<any> = [
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

  constructor(
    public dialogRef: MatDialogRef<DialogRenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigurationDialog | any,
  ) {}

  ngOnInit(): void {
    /*  */
  }

  onNoClick(): void {
    const output: any = {
      close: true
    };
    this.dialogRef.close(output);
  }

}
