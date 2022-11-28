import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrapiCategoriesComponent } from './strapi-categories.component';

describe('StrapiCategoriesComponent', () => {
  let component: StrapiCategoriesComponent;
  let fixture: ComponentFixture<StrapiCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrapiCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrapiCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
