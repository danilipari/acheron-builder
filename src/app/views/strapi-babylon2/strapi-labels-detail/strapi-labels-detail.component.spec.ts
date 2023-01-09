import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrapiLabelsDetailComponent } from './strapi-labels-detail.component';

describe('StrapiLabelsDetailComponent', () => {
  let component: StrapiLabelsDetailComponent;
  let fixture: ComponentFixture<StrapiLabelsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrapiLabelsDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StrapiLabelsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
