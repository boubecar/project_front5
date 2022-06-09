import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionfilialeComponent } from './gestionfiliale.component';

describe('GestionfilialeComponent', () => {
  let component: GestionfilialeComponent;
  let fixture: ComponentFixture<GestionfilialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionfilialeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionfilialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
