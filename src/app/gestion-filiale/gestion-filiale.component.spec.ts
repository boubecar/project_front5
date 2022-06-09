import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFilialeComponent } from './gestion-filiale.component';

describe('GestionFilialeComponent', () => {
  let component: GestionFilialeComponent;
  let fixture: ComponentFixture<GestionFilialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionFilialeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionFilialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
