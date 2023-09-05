import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EHPCalculatorComponent } from './ehp-calculator.component';

describe('EhpCalculatorComponent', () => {
  let component: EHPCalculatorComponent;
  let fixture: ComponentFixture<EHPCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EHPCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EHPCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
