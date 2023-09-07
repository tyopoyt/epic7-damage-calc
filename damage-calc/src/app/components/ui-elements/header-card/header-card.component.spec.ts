import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCardComponent } from './header-card.component';

describe('BannerCardComponent', () => {
  let component: HeaderCardComponent;
  let fixture: ComponentFixture<HeaderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderCardComponent]
    });
    fixture = TestBed.createComponent(HeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
