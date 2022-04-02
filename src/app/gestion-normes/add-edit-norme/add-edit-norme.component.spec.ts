import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNormeComponent } from './add-edit-norme.component';

describe('AddEditNormeComponent', () => {
  let component: AddEditNormeComponent;
  let fixture: ComponentFixture<AddEditNormeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditNormeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
