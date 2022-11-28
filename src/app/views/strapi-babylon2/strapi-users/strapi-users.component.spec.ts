import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrapiUsersComponent } from './strapi-users.component';

describe('StrapiUsersComponent', () => {
  let component: StrapiUsersComponent;
  let fixture: ComponentFixture<StrapiUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrapiUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrapiUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
