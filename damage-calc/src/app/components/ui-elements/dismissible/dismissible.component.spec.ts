import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DismissibleComponent } from './dismissible.component';

describe('DismissibleComponent', () => {
  let component: DismissibleComponent;
  let fixture: ComponentFixture<DismissibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DismissibleComponent]
    });
    fixture = TestBed.createComponent(DismissibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
