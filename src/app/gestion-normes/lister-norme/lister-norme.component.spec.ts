import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerNormeComponent } from './lister-norme.component';

describe('ListerNormeComponent', () => {
  let component: ListerNormeComponent;
  let fixture: ComponentFixture<ListerNormeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerNormeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerNormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
