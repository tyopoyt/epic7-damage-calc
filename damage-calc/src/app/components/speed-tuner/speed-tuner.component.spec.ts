import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedTunerComponent } from './speed-tuner.component';

describe('SpeedTunerComponent', () => {
  let component: SpeedTunerComponent;
  let fixture: ComponentFixture<SpeedTunerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeedTunerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedTunerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
