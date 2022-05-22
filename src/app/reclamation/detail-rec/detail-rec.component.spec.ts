import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRecComponent } from './detail-rec.component';

describe('DetailRecComponent', () => {
  let component: DetailRecComponent;
  let fixture: ComponentFixture<DetailRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
