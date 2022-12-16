import { Component, OnInit } from '@angular/core';
import { StrapiBabylon2Service } from '../../../services/strapi-babylon2.service';
import { GoogleService } from '../../../services/google.service';
import { DeeplService } from '../../../services/deepl.service';
import { GoogleObj } from '../../../shared/interfaces';
import { forkJoin } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-strapi-labels-detail',
  templateUrl: './strapi-labels-detail.component.html',
  styleUrls: ['./strapi-labels-detail.component.scss']
})
export class StrapiLabelsDetailComponent implements OnInit {
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
    this.strapiService.getTableCollectionItem("application::label.label", id).subscribe((responseData: any) => {
      this.dataRes = responseData;
      this.updateInputsItemsMerge(this.dataRes);
      this.updateSelectsItemsMerge(this.dataRes);
      console.debug(this.inputsItemsMerge, 'controlPathIds');
    }, (error: any) => {
      console.log(error);
      this.router.navigate(['strapi', 'labels']);
    });
  }

  public translateAction(element: any): void {
    const origin_lang = 'it';
    const destination_lang = element.key?.split("_")[0];
    const value_origin = this.inputsItemsMerge[`${origin_lang}_body`];

    this.googleObject = {
      ...this.googleObject,
      q: value_origin,
      source: origin_lang,
      target: destination_lang,
    };

    this.translate(1, element);
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
    this.deeplService.translateDeepL(/* this.key */'', 'IT', 'EN-GB').subscribe((responseData: any) => {
      console.debug(responseData, '----result DeepL----');
    }, (error: any) => {
      console.log(error);
    });
  }

  private googleTranslateAction(element: any): void {
    this.googleService.translate(this.googleObject).subscribe((responseData: any) => {
      this.resultGoolge = responseData.data?.translations[0].translatedText;
      this.inputsItemsMerge[element.key] = this.resultGoolge;
      this.updateInputsItemsMerge(this.inputsItemsMerge);
    }, (error: any) => {
      console.log(error);
    });
  }

  private updateSelectsItemsMerge(list: any): void {
    const selItems = Object.assign({}, ...Object.entries(list).reduce((acc: any, item: any, index: any) => {
      if (Array.isArray(item[1])) {
        acc = [...acc, ({ [item[0]]: item[1] })];
      }
      return acc;
    }, []));

    this.selectsItemsMerge = { ...selItems };
  }

  private updateInputsItemsMerge(list: any): void {
    const inpItems = Object.assign({}, ...Object.entries(list).reduce((acc: any, item: any, index: any) => {
      if (item[0].includes("_body")) {
        acc = [...acc, ({ [item[0]]: (item[1] !== null && item[1]?.trim()?.length > 0) ? item[1] : null })];
      }
      return acc;
    }, []));

    this.inputsItemsMerge = { ...inpItems };
  }

  public getItem(element: any, origin: string = 'it'): any {
    return { el: element, can: element.key?.split("_")[0].trim()?.length > 0, origin: element.key?.split("_")[0] === origin, length: element.value != null ? element.value.trim()?.length : 0 };
  }

  public cleanValueInput(key: any, value: string): void {
    const elValue = value?.trim()?.length > 0 ? value.trim() : null;
    this.dataRes[key] = elValue;
  }

  public translateAllLabels(): void {
    const labels = { "label_title": this.dataRes["label_title"], ...this.inputsItemsMerge };

    if (!Object.values(labels).every((res: any) => res != null)) {
      const _keys = Object.entries(labels).filter((el: any, index: number) => el[1] == null);
      const _queryKeys = _keys?.map((elQuery: any) => this.translateAction({ key: elQuery[0], value: elQuery[1] }));

      for (let el of _queryKeys) {
        console.debug('auto translate action finished!');
      }
    }
  }

  public deleteLabelKey(): void {
    if (confirm("Are you sure you want to delete this entry?")) {
      this.strapiService.deleteTableCollectionItem("application::label.label", this.pId).subscribe((responseData: any) => {
        this.router.navigate(['strapi', 'labels']);
      }), (error: any) => {
        console.log(error);
      }
    }
  }

  public clearFields(): void {
    console.log('clearFields');
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
        ...Object.assign({}, this.dataRes, ...Object.entries(this.inputsItemsMerge).reduce((acc: any, item: any, index: any) => {
          if (item[0].includes("_body")) {
            if (this.dataRes[item[0]] == this.inputsItemsMerge[item[0]]){
              acc = [...acc, ({ [item[0]]: (item[1] !== null && item[1]?.trim()?.length > 0) ? item[1] : null })];
            } else {
              acc = [...acc, ({ [item[0]]: (this.inputsItemsMerge[item[0]] !== null && this.inputsItemsMerge[item[0]]?.trim()?.length > 0) ? this.inputsItemsMerge[item[0]] : null  })];
            }
          }
          return acc;
        }, [])),
      };

      if (this.pId != this.qId) {
        this.strapiService.updateTableCollectionItem("application::label.label", data, this.pId).subscribe((responseData: any) => {
          console.debug(responseData, '--updateTableCollectionItem--');
        }), (error: any) => {
          console.log(error);
        }
      } else {
        this.strapiService.cloneTableCollectionItem("application::label.label", data).subscribe((responseData: any) => {
          this.router.navigate(['strapi', 'labels']);
        }), (error: any) => {
          console.log(error);
        }
      }
    }
  }

}
