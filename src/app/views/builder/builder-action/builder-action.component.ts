import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { typeStructure } from '../../../shared/interfaces';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag } from '@angular/cdk/drag-drop';

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
      type: "button",
      label: "button",
      value: null,
    },
    {
      type: "checkbox",
      label: "checkbox",
      value: null,
    },
    {
      type: "color",
      label: "color",
      value: null,
    },
    {
      type: "date",
      label: "date",
      value: null,
    },
    {
      type: "datetime-local",
      label: "datetime-local",
      value: null,
    },
    {
      type: "email",
      label: "email",
      value: null,
    },
    {
      type: "hidden",
      label: "hidden",
      value: null,
    },
    {
      type: "image",
      label: "image",
      value: null,
    },
    {
      type: "month",
      label: "month",
      value: null,
    },
    {
      type: "number",
      label: "number",
      value: null,
    },
    {
      type: "password",
      label: "password",
      value: null,
    },
    {
      type: "radio",
      label: "radio",
      value: null,
    },
    {
      type: "range",
      label: "range",
      value: null,
    },
    {
      type: "reset",
      label: "reset",
      value: null,
    },
    {
      type: "search",
      label: "search",
      value: null,
    },
    {
      type: "submit",
      label: "submit",
      value: null,
    },
    {
      type: "tel",
      label: "tel",
      value: null,
    },
    {
      type: "text",
      label: "text",
      value: null,
    },
    {
      type: "time",
      label: "time",
      value: null,
    },
    {
      type: "url",
      label: "url",
      value: null,
    },
    {
      type: "week",
      label: "week",
      value: null,
    },
  ];

  public forms: Array<any> = [
    {
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
      label: 'Add new input here',
      type: 'add',
    };

    if (type === 'types') {
      this.type = type;
      this.forms = this.forms.reduce((acc, form, index) => {
        if (index+1 === this.forms.length) {
          acc = [...acc, add, form, add];
        } else {
          acc = [...acc, add, form];
        }
        return acc;
      }, []);
    }
    console.log('here', type, index, this.forms);
  }

  drop(event: CdkDragDrop<number[]>) {
    if (this.type === 'types') {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.forms = this.forms.filter((el: any) => el.type !== 'add');
    }
  }

}
