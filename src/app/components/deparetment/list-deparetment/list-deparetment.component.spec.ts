import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeparetmentComponent } from './list-deparetment.component';

describe('ListDeparetmentComponent', () => {
  let component: ListDeparetmentComponent;
  let fixture: ComponentFixture<ListDeparetmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDeparetmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeparetmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
