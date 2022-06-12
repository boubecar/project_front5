import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlandactionUserComponent } from './plandaction-user.component';

describe('PlandactionUserComponent', () => {
  let component: PlandactionUserComponent;
  let fixture: ComponentFixture<PlandactionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlandactionUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlandactionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
