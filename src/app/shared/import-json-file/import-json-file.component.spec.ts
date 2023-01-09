import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportJsonFileComponent } from './import-json-file.component';

describe('ImportJsonFileComponent', () => {
  let component: ImportJsonFileComponent;
  let fixture: ComponentFixture<ImportJsonFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportJsonFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportJsonFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
