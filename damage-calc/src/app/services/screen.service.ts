import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  microscopic = 445;
  tiny = 480;
  small = 580;
  mediumSmall = 720;
  medium = 1000;

  microscopicScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  tinyScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  smallScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  mediumSmallScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  mediumScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  largeScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  toggleMicroscopicScreen() {
    this.microscopicScreen.next(!this.microscopicScreen.value);
  }

  toggleTinyScreen() {
    this.tinyScreen.next(!this.tinyScreen.value);
  }

  toggleSmallScreen() {
    this.smallScreen.next(!this.smallScreen.value);
  }

  toggleMediumSmallScreen() {
    this.mediumSmallScreen.next(!this.mediumSmallScreen.value);
  }

  toggleMediumScreen() {
    this.mediumScreen.next(!this.mediumScreen.value);
  }

  toggleLargeScreen() {
    this.largeScreen.next(!this.largeScreen.value);
  }
}
