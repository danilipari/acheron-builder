import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrapiDynamicSelectComponent } from './strapi-dynamic-select.component';

describe('StrapiDynamicSelectComponent', () => {
  let component: StrapiDynamicSelectComponent;
  let fixture: ComponentFixture<StrapiDynamicSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrapiDynamicSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StrapiDynamicSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
