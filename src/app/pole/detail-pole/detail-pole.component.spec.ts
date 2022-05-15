import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPoleComponent } from './detail-pole.component';

describe('DetailPoleComponent', () => {
  let component: DetailPoleComponent;
  let fixture: ComponentFixture<DetailPoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
