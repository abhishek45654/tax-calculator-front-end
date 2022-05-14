import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemisedDeductionHistoryComponent } from './itemised-deduction-history.component';

describe('ItemisedDeductionHistoryComponent', () => {
  let component: ItemisedDeductionHistoryComponent;
  let fixture: ComponentFixture<ItemisedDeductionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemisedDeductionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemisedDeductionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
