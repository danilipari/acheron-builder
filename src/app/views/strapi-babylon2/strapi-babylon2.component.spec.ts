import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrapiBabylon2Component } from './strapi-babylon2.component';

describe('StrapiBabylon2Component', () => {
  let component: StrapiBabylon2Component;
  let fixture: ComponentFixture<StrapiBabylon2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrapiBabylon2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(StrapiBabylon2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
