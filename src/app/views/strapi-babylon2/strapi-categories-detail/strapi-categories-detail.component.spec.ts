import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrapiCategoriesDetailComponent } from './strapi-categories-detail.component';

describe('StrapiCategoriesDetailComponent', () => {
  let component: StrapiCategoriesDetailComponent;
  let fixture: ComponentFixture<StrapiCategoriesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrapiCategoriesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrapiCategoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
