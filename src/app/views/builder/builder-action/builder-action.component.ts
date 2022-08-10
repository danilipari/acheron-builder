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

  public type!: string;

  public types: Array<typeStructure> = [
    {
      uuid: uuid.v4(),
      type: "button",
      label: "button",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "checkbox",
      label: "checkbox",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "color",
      label: "color",
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
      type: "email",
      label: "email",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "hidden",
      label: "hidden",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "image",
      label: "image",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "month",
      label: "month",
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
      type: "password",
      label: "password",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "radio",
      label: "radio",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "range",
      label: "range",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "reset",
      label: "reset",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "search",
      label: "search",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "submit",
      label: "submit",
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
      type: "text",
      label: "text",
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
      type: "url",
      label: "url",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "week",
      label: "week",
      value: null,
    },
  ];

  public forms: Array<any> = [
    {
      uuid: uuid.v4(),
      type: "button",
      label: "button",
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


    /* if (this.type === 'types') {
      this.forms = this.forms.reduce((acc, form, iT) => {
        if (iT+1 === this.forms.length) {
          acc = [...acc, {...add, uuid: uuid.v4()}, form, {...add, uuid: uuid.v4()}];
        } else {
          acc = [...acc, {...add, uuid: uuid.v4()}, form];
        }
        return acc;
      }, []);
    } else {
      console.log(this.forms, index);
      if (false) {
        this.forms = this.forms.reduce((acc, form, iF) => {
          if (iF+1 === this.forms.length) {
            acc = [...acc, {...move, uuid: uuid.v4()}, form, {...move, uuid: uuid.v4()}];
          } else {
            acc = [...acc, {...move, uuid: uuid.v4()}, form];
          }
          return acc;
        }, []);
      }
    } */

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
    // this.forms = this.forms.map((elMap: any) => ({...elMap, uuid: uuid.v4()})).filter((el: any) => (el.type !== 'add' && el.type !== 'move'));
  }

}
