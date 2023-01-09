import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottieRenderComponent } from './lottie-render.component';

describe('LottieRenderComponent', () => {
  let component: LottieRenderComponent;
  let fixture: ComponentFixture<LottieRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LottieRenderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LottieRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
