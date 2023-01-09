import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRenderComponent } from './dialog-render.component';

describe('DialogRenderComponent', () => {
  let component: DialogRenderComponent;
  let fixture: ComponentFixture<DialogRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogRenderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
