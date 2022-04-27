import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilLocalComponent } from './fil-local.component';

describe('FilLocalComponent', () => {
  let component: FilLocalComponent;
  let fixture: ComponentFixture<FilLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
