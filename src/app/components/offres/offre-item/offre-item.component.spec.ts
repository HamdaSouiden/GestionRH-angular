import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreItemComponent } from './offre-item.component';

describe('OffreItemComponent', () => {
  let component: OffreItemComponent;
  let fixture: ComponentFixture<OffreItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
