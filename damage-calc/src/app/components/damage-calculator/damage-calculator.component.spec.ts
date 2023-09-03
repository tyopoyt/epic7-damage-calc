import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageCalculatorComponent } from './damage-calculator.component';

describe('DamageCalculatorComponent', () => {
  let component: DamageCalculatorComponent;
  let fixture: ComponentFixture<DamageCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
