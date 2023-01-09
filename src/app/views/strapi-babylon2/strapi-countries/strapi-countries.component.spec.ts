import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrapiCountriesComponent } from './strapi-countries.component';

describe('StrapiCountriesComponent', () => {
  let component: StrapiCountriesComponent;
  let fixture: ComponentFixture<StrapiCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrapiCountriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StrapiCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
