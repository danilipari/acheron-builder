import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportJsonFileComponent } from './export-json-file.component';

describe('ExportJsonFileComponent', () => {
  let component: ExportJsonFileComponent;
  let fixture: ComponentFixture<ExportJsonFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportJsonFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportJsonFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
