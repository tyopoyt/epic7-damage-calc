import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { get } from 'lodash-es'

export enum Theme {
  dark = 'dark',
  light = 'light'
}

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  microscopic = 355;
  tiny = 480;
  small = 580;
  mediumSmall = 720;
  medium = 930;
  extraLarge = 1460;

  microscopicScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  tinyScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  smallScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  mediumSmallScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  mediumScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  largeScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  extraLargeScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  // theme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.dark)
  theme: Theme = Theme.dark;

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

  toggleExtraLargeScreen() {
    this.extraLargeScreen.next(!this.extraLargeScreen.value);
  }

  toggleDarkMode() {
    // TODO: Look into indexedDB instead?
    this.theme = this.theme === Theme.light ? Theme.dark : Theme.light;
    if (this.theme === Theme.light) {
      document.querySelector('body.mat-typography')?.classList.add('light-theme');
      localStorage.e7calcTheme = Theme.light;
    } else {
      document.querySelector('body.mat-typography')?.classList.remove('light-theme');
      localStorage.e7calcTheme = Theme.dark;
    }
  }

  initializeTheme() {
    if (get(Theme, localStorage.e7calcTheme, Theme.dark) === 'light') {
      this.toggleDarkMode();
    }
  }

  // To support other themes in the future, may not ever use
  // setTheme(theme: Theme) {
  //   this.theme.next(theme);
  // }
}
