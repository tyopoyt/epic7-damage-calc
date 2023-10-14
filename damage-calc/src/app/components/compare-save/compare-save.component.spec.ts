import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSaveComponent } from './compare-save.component';

describe('CompareSaveComponent', () => {
  let component: CompareSaveComponent;
  let fixture: ComponentFixture<CompareSaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompareSaveComponent]
    });
    fixture = TestBed.createComponent(CompareSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
