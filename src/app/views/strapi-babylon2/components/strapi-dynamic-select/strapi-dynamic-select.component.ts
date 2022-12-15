import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { StrapiBabylon2Service } from '../../../../services/strapi-babylon2.service';

import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-strapi-dynamic-select',
  templateUrl: './strapi-dynamic-select.component.html',
  styleUrls: ['./strapi-dynamic-select.component.scss']
})
export class StrapiDynamicSelectComponent implements OnInit {
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public selectedItem!: any;

  @Input() public data!: any;
  @Output() public emitList = new EventEmitter<any>();

  public options: any[] = [{id: 0, title: '...'}];
  public optionKey: string = "title";

  constructor(
    private strapiService: StrapiBabylon2Service
  ) {}

  ngOnInit(): void {
    /*  */
  }

  public getValues(event: any): void {
    const entity = this.data.key;
    const tagEl = event.target.tagName;

    if (tagEl?.toLowerCase() === "select") {
      this.strapiService.getSelectRelationsCollection("application::label.label", entity, { "idsToOmit": [...this.data.value?.map((el: any) => (el.id))] }, 20).pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
        this.optionKey = this._getKey(responseData[0]);
        this.options = [{id: 0, [this.optionKey]: '...'}, ...responseData];
      }), (error: any) => {
        console.log(error);
      };
    }
  }

  public getValueKey(obj: object): string {
    return this._getKey(obj);
  }

  private _getKey(obj: object): string {
    const _notKey: string[] = [
      "id",
      "published_at",
      "created_by",
      "updated_by",
      "created_at",
      "updated_at"
    ];
    return obj ? Object.keys(obj).filter((el: string) => !_notKey.includes(el))[0] : "";
  }

  public newSelected(): void {
    const el = { ...this.options.find((f: any) => (f.id == this.selectedItem)) };
    this.data.value = [...this.data.value, el];
    this.emitList.emit({ list: this.data.key, value: this.data.value });
  }

  public deleteSelected(element: any): void {
    this.data.value = this.data.value.filter((el: any) => el.id !== element.id);
    this.emitList.emit({ list: this.data.key, value: this.data.value });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
