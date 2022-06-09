import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFilComponent } from './liste-fil.component';

describe('ListeFilComponent', () => {
  let component: ListeFilComponent;
  let fixture: ComponentFixture<ListeFilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
