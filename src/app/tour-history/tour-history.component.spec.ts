import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourHistoryComponent } from './tour-history.component';

describe('TourHistoryComponent', () => {
  let component: TourHistoryComponent;
  let fixture: ComponentFixture<TourHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
