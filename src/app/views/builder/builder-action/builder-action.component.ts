import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { typeStructure } from '../../../shared/interfaces';
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

  public forms: Array<any> = [
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
    return this.forms.filter(form => form.uuid === uuid)[0];
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
