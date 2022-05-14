import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDataFormComponent } from './income-data-form.component';

describe('IncomeDataFormComponent', () => {
  let component: IncomeDataFormComponent;
  let fixture: ComponentFixture<IncomeDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
