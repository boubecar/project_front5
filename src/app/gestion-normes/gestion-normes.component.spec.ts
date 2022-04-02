import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNormesComponent } from './gestion-normes.component';

describe('GestionNormesComponent', () => {
  let component: GestionNormesComponent;
  let fixture: ComponentFixture<GestionNormesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionNormesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionNormesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
