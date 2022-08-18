import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlertMessagesComponent } from './dialog-alert-messages.component';

describe('DialogAlertMessagesComponent', () => {
  let component: DialogAlertMessagesComponent;
  let fixture: ComponentFixture<DialogAlertMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAlertMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlertMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
