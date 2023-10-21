import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageGraphComponent } from './damage-graph.component';

describe('DamageGraphComponent', () => {
  let component: DamageGraphComponent;
  let fixture: ComponentFixture<DamageGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DamageGraphComponent]
    });
    fixture = TestBed.createComponent(DamageGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
