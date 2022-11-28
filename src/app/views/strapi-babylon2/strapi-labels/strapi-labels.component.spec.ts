import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrapiLabelsComponent } from './strapi-labels.component';

describe('StrapiLabelsComponent', () => {
  let component: StrapiLabelsComponent;
  let fixture: ComponentFixture<StrapiLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrapiLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrapiLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
