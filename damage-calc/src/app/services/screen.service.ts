import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { get } from 'lodash-es'

export enum Theme {
  dark = 'dark',
  light = 'light',
  retro = 'retro',
  retroLight = 'retroLight'
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
  extraLarge = 1715;

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
    switch (this.theme) {
      case Theme.light:
        this.theme = Theme.dark;
        break;
      case Theme.dark:
        this.theme = Theme.light;
        break;
      case Theme.retroLight:
        this.theme = Theme.retro;
        break;
      default:
        this.theme = Theme.retroLight;
    }

    if ([Theme.light, Theme.retroLight].includes(this.theme)) {
      document.querySelector('body.mat-typography')?.classList.add('light-theme');
    } else {
      document.querySelector('body.mat-typography')?.classList.remove('light-theme');
    }

    localStorage.e7calcTheme = this.theme;
  }

  toggleRetroMode() {
    switch (this.theme) {
      case Theme.light:
        this.theme = Theme.retroLight;
        break;
      case Theme.dark:
        this.theme = Theme.retro;
        break;
      case Theme.retroLight:
        this.theme = Theme.light;
        break;
      default:
        this.theme = Theme.dark;
    }
  
    if ([Theme.retro, Theme.retroLight].includes(this.theme)) {
      document.querySelector('body.mat-typography')?.classList.add('retro-theme');
    } else {
      document.querySelector('body.mat-typography')?.classList.remove('retro-theme');
    }
  
    localStorage.e7calcTheme = this.theme;
  }

  initializeTheme() {
    const loadedTheme = get(Theme, localStorage.e7calcTheme, Theme.dark)
    if ([Theme.light, Theme.retroLight].includes(loadedTheme)) {
      this.toggleDarkMode();
    }
    if ([Theme.retro, Theme.retroLight].includes(loadedTheme)) {
      this.toggleRetroMode();
    }
  }

  // // To support other themes in the future, may not ever use
  // setTheme(theme: Theme) {
  //   this.theme.next(theme);
  // }
}
