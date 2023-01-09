import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrapiHeaderComponent } from './strapi-header.component';

describe('StrapiHeaderComponent', () => {
  let component: StrapiHeaderComponent;
  let fixture: ComponentFixture<StrapiHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrapiHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StrapiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
