import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerUsersComponent } from './lister-users.component';

describe('ListerUsersComponent', () => {
  let component: ListerUsersComponent;
  let fixture: ComponentFixture<ListerUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
