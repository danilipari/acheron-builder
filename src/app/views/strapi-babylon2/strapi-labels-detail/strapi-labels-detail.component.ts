import { Component, OnInit } from '@angular/core';
import { StrapiBabylon2Service } from '../../../services/strapi-babylon2.service';
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
  formItemsKey!: any;

  constructor(
    private strapiService: StrapiBabylon2Service,
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
      console.log("strapi data res --> ", responseData);
      this.dataRes = responseData;
      this.formTitle = responseData.label_title;
      this.formItems = Object.entries(this.dataRes).reduce((acc: any, item: any, index: any) => {
          if (item[0].includes("_body")) {
            acc = [...acc, ({[item[0]]: item[1]})];
          }
          return acc;
        }, []);
      this.formItemsKey = { "label_title": responseData.label_title };

      console.log(this.formItems, this.formItemsKey, 'formItems');
    }), (error: any) => {
      console.log(error);
    }
  }

}
