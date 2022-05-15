import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFilComponent } from './detail-fil.component';

describe('DetailFilComponent', () => {
  let component: DetailFilComponent;
  let fixture: ComponentFixture<DetailFilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
