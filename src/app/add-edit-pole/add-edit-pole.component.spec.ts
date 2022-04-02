import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPoleComponent } from './add-edit-pole.component';

describe('AddEditPoleComponent', () => {
  let component: AddEditPoleComponent;
  let fixture: ComponentFixture<AddEditPoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
