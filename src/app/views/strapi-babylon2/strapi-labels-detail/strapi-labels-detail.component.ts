import { Component, OnInit } from '@angular/core';
import { StrapiBabylon2Service } from '../../../services/strapi-babylon2.service';
import { GoogleService } from '../../../services/google.service';
import { GoogleObj } from '../../../shared/interfaces';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  key!: string;
  resultGoolge!: any;

  constructor(
    private strapiService: StrapiBabylon2Service,
    private googleService: GoogleService,
    private router: Router,
    private route: ActivatedRoute,
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
      this.formItems = Object.assign({}, ...Object.entries(this.dataRes).reduce((acc: any, item: any, index: any) => {
        if (item[0].includes("_body")) {
          acc = [...acc, ({[item[0]]: item[1]})];
        }
        return acc;
      }, []));
      this.formItemsMerge = { "label_title": responseData.label_title, ...this.formItems };
      console.log(this.formItemsMerge);
    }), (error: any) => {
      console.log(error);
    }
  }

  public translateWithGoogle(): void {
    console.log(this.googleObject, this.key, '----translateWithGoogle----');

    if (this.key.length > 0) {
      this.googleTranslateAction();
    }
  }

  private googleTranslateAction(): void {
    this.googleService.translate(this.googleObject, this.key).subscribe((responseData: any) => {
      this.resultGoolge = responseData.data.translations[0].translatedText;
      console.log(this.resultGoolge, '----resultGoolge----');
    }), (error: any) => {
      console.log(error);
    }
  }

  public getItem(element: any): any {
    return { el: element, length: element != null ? element.trim()?.length : 0 };
  }

}
