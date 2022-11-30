import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrapiCountriesDetailComponent } from './strapi-countries-detail.component';

describe('StrapiCountriesDetailComponent', () => {
  let component: StrapiCountriesDetailComponent;
  let fixture: ComponentFixture<StrapiCountriesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrapiCountriesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrapiCountriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
