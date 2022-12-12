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
  formTitle!: string;
  formItems!: any;
  formItemsMerge!: any;

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
      this.formTitle = responseData.label_title;
      this.updateFormItemsMerge(this.dataRes);
      console.debug(this.formItemsMerge, 'controlPathIds');
    }), (error: any) => {
      console.log(error);
    }
  }

  public translateAction(element: any): void {
    const origin_lang = 'it';
    const destination_lang = element.key?.split("_")[0];
    const value_origin = this.formItemsMerge[`${origin_lang}_body`];

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
    }), (error: any) => {
      console.log(error);
    }
  }

  private googleTranslateAction(element: any): void {
    this.googleService.translate(this.googleObject).subscribe((responseData: any) => {
      this.resultGoolge = responseData.data?.translations[0].translatedText;
      this.formItemsMerge[element.key] = this.resultGoolge;
      this.updateFormItemsMerge(this.formItemsMerge);
      console.debug(this.resultGoolge, this.formItemsMerge, '----resultGoolge----');
    }), (error: any) => {
      console.log(error);
    }
  }

  private updateFormItemsMerge(list: any): void {
    this.formItems = Object.assign({}, ...Object.entries(list).reduce((acc: any, item: any, index: any) => {
      if (item[0].includes("_body")) {
        acc = [...acc, ({ [item[0]]: item[1] })];
      }
      return acc;
    }, []));
    this.formItemsMerge = { ...this.formItems };
  }

  public getItem(element: any, origin: string = 'it'): any {
    return { el: element, can: element.key?.split("_")[0].trim()?.length > 0, origin: element.key?.split("_")[0] === origin, length: element.value != null ? element.value.trim()?.length : 0 };
  }

  public translateAllLabels(): void {
    const labels = { "label_title": this.formTitle, ...this.formItemsMerge };

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

  public saveLabels(): void {
    const labels = { "label_title": this.formTitle, ...this.formItemsMerge };
    if (confirm(`Confirm save labels in ${this.formTitle}?`)) {
      const data = {
        "label_title": this.formTitle,
        ...Object.assign({}, this.dataRes, ...Object.entries(this.formItemsMerge).reduce((acc: any, item: any, index: any) => {
          if (item[0].includes("_body")) {
            acc = [...acc, ({ [item[0]]: item[1] })];
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
