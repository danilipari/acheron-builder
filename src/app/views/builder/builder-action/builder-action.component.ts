import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { typeStructure, FormStructure } from '../../../shared/interfaces';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import * as uuid from "uuid";

@Component({
  selector: 'app-builder-action',
  templateUrl: './builder-action.component.html',
  styleUrls: ['./builder-action.component.scss']
})
export class BuilderActionComponent implements OnInit {
  public route_id: string = this.route.snapshot.params['id'] !== undefined ? this.route.snapshot.params['id'] : '';

  public formSelected: string = '';

  public type!: string;

  public types: Array<typeStructure> = [
    {
      uuid: uuid.v4(),
      type: "text",
      label: "text",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "email",
      label: "email",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "password",
      label: "password",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "date",
      label: "date",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "datetime-local",
      label: "datetime-local",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "number",
      label: "number",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "tel",
      label: "tel",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "time",
      label: "time",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "week",
      label: "week",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "month",
      label: "month",
      value: null,
    },
  ];

  private _db: any;

  public forms: Array<typeStructure | FormStructure> = [
    {
      uuid: uuid.v4(),
      type: "text",
      label: "text",
      value: null,
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('routeID Builder', this.route_id);

    if(localStorage.getItem('_local_db')) {
      this._db = localStorage.getItem('_local_db');
      this.forms = JSON.parse(this._db);
    } else {
      localStorage.setItem('_local_db', JSON.stringify(this.forms));
    }

    console.log(
      'localStorage',
      localStorage.getItem('_local_db')
    );
  }

  dragStart($event: any, type: string, index: number): void {
    const add = {
      uuid: null,
      label: 'Add new input here',
      type: 'add',
      value: null,
    };

    const move = {
      uuid: null,
      label: 'Move input here',
      type: 'move',
      value: null,
    };

    this.type = type;

  }

  setFormItem(uuid: string): void {
    this.formSelected = uuid;
  }

  getFormItem(uuid: string): any {
    return this.forms.filter((form: any) => form.uuid === uuid)[0];
  }

  rmFromItem(uuid: string): void {
    this.forms = this.forms.filter((form: any) => form.uuid !== uuid);
    localStorage.setItem('_local_db', JSON.stringify(this.forms));
  }

  trackByFn(index: number, item: any) {
    return item.uuid;
  }

  drop(event: CdkDragDrop<number[]>) {
    if (this.type === 'types') {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      localStorage.setItem('_local_db', JSON.stringify(this.forms));
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.types = this.types.map((elMap: any) => ({...elMap, uuid: uuid.v4()}));
  }

}
