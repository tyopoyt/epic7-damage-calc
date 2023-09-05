import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectivenessCheckerComponent } from './effectiveness-checker.component';

describe('EffectivenessCheckerComponent', () => {
  let component: EffectivenessCheckerComponent;
  let fixture: ComponentFixture<EffectivenessCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffectivenessCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectivenessCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
