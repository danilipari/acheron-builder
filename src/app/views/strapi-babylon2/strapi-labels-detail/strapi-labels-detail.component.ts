import { Component, OnInit, OnDestroy } from '@angular/core';
import { StrapiBabylon2Service } from '../../../services/strapi-babylon2.service';
import { GoogleService } from '../../../services/google.service';
import { DeeplService } from '../../../services/deepl.service';
import { GoogleObj } from '../../../shared/interfaces';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-strapi-labels-detail',
  templateUrl: './strapi-labels-detail.component.html',
  styleUrls: ['./strapi-labels-detail.component.scss']
})
export class StrapiLabelsDetailComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  qId: number = 0;
  pId: number  = 0;

  dataRes!: any;
  inputsItemsMerge!: any;
  selectsItemsMerge!: any;

  googleObject: GoogleObj = {
    q: '',
    source: 'it',
    target: 'en',
    format: 'text',
  };
  // key!: string;
  resultGoolge!: any;

  constructor(
    private strapiService: StrapiBabylon2Service,
    private googleService: GoogleService,
    private deeplService: DeeplService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      if (id) {
        this.pId = id;
        this.route.queryParams.subscribe((params: any) => {
          if (Object.keys(params)?.length) {
            this.qId = params['cp'];
            this.controlPathIds(2, params['cp']);
          } else {
            this.controlPathIds(1, this.pId);
          }
        });
      }
    });
  }

  private controlPathIds(mode: number, id: number ): void {
    this.strapiService.getTableCollectionItem("application::label.label", id).pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      this.dataRes = responseData;
      this.inputsItemsMerge = Object.entries(this.dataRes).map((el: any) => (el)).filter((elF: any) => elF[0].includes("_body")).map((elM: any) => ({ key: elM[0], value: elM[1] }));
      this.selectsItemsMerge = Object.entries(this.dataRes).map((el: any) => (el)).filter((elF: any) => Array.isArray(elF[1]) ).map((elM: any) => ({ key: elM[0], value: elM[1] }));
    }, (error: any) => {
      console.log(error);
      this.router.navigate(['strapi', 'labels']);
    });
  }

  public translateAction(element: any): void {
    const origin_lang = 'it';
    const destination_lang = element.key?.split("_")[0];
    const value_origin = this.dataRes[`${origin_lang}_body`];

    this.googleObject = {
      ...this.googleObject,
      q: value_origin,
      source: origin_lang,
      target: destination_lang,
    };

    this.translate(1, { ...element, value: value_origin });
  }

  public translate(type: number = 1, element: any): void {
    if (this.googleObject.q.length > 0) {
      if (type === 1) {
        this.googleTranslateAction(element);
      } else {
        this.deeplTranslateAction();
      }
    }
  }

  private deeplTranslateAction(): void {
    this.deeplService.translateDeepL(/* this.key */'', 'IT', 'EN-GB').pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      console.debug(responseData, '----result DeepL----');
    }, (error: any) => {
      console.log(error);
    });
  }

  public trackByInputs(index: number, el: any): number {
    console.debug(el, '--trackByInputs--');
    return el;
  }

  private googleTranslateAction(element: any): void {
    console.log('--googleTranslateAction--', element, this.googleObject);
    this.googleService.translate(this.googleObject).pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      this.resultGoolge = responseData.data?.translations[0].translatedText;
      this.dataRes[element.key] = this.resultGoolge;
      this.inputsItemsMerge[element.key] = this.resultGoolge;
      this.inputsItemsMerge = Object.entries(this.dataRes).map((el: any) => (el)).filter((elF: any) => elF[0].includes("_body")).map((elM: any) => ({ key: elM[0], value: elM[1] }));
    }, (error: any) => {
      console.log(error);
    });
  }

  public getItem(element: any, origin: string = 'it'): any {
    return { el: element, can: element.key?.split("_")[0].trim()?.length > 0, origin: element.key?.split("_")[0] === origin, length: element.value != null ? element.value.trim()?.length : 0 };
  }

  public clearValueInput(key: any, value: string): void {
    const elValue = value?.trim()?.length > 0 ? value?.trim() : null;
    this.dataRes[key] = elValue;
  }

  public translateAllLabels(): void {
    const labels = [ { key: "label_title", value: this.dataRes["label_title"] }, ...this.inputsItemsMerge ];

    if (!labels.every((res: any) => res.value != null)) {
      const _keys = labels.filter((el: any, index: number) => el.value == null);
      const _queryKeys = _keys?.map((elQuery: any) => this.translateAction({ key: elQuery.key, value: elQuery.value }));
      for (let el of _queryKeys) {
        console.debug('auto translate action finished!');
      }
    }
  }

  public deleteLabelKey(): void {
    if (confirm("Are you sure you want to delete this entry?")) {
      this.strapiService.deleteTableCollectionItem("application::label.label", this.pId).pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
        this.router.navigate(['strapi', 'labels']);
      }), (error: any) => {
        console.log(error);
      }
    }
  }

  public clearFields(): void {
    this.inputsItemsMerge = Object.entries(this.dataRes).map((el: any) => (el)).filter((elF: any) => elF[0].includes("_body")).map((elM: any) => ({ key: elM[0], value: (elM[0] === "it_body") ? elM[1] : null }));
  }

  public updateList(event: any): void {
    const entity = event.list;
    const list = event.value;
    this.dataRes[entity] = list;
  }

  public saveLabels(): void {
    const labels = { "label_title": this.dataRes["label_title"], ...this.inputsItemsMerge };
    if (confirm(`Confirm save labels in ${this.dataRes.label_title}?`)) {
      const data = {
        "label_title": this.dataRes["label_title"],
        ...Object.assign({}, this.dataRes, ...this.inputsItemsMerge.reduce((acc: any, item: any, index: any) => {
          if (this.dataRes[item.key] === this.inputsItemsMerge.find((f: any) => f.key == item.key)?.value) {
            acc = [ ...acc, { [item.key]: this.dataRes[item.key] }];
          } else {
            acc = [ ...acc, { [item.key]: this.inputsItemsMerge.find((f: any) => f.key == item.key)?.value }];
          }
          return acc;
        }, [])),
      };

      if (this.pId != this.qId) {
        this.strapiService.updateTableCollectionItem("application::label.label", data, this.pId).pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
          console.debug(responseData, '--updateTableCollectionItem--');
        }), (error: any) => {
          console.log(error);
        }
      } else {
        this.strapiService.cloneTableCollectionItem("application::label.label", data).pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
          this.router.navigate(['strapi', 'labels']);
        }), (error: any) => {
          console.log(error);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
