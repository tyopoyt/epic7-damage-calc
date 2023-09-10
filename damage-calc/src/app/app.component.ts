import { Component, HostListener, OnInit } from '@angular/core';
import { Languages } from './models/languages';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenService, Theme } from './services/screen.service';
import { LanguageService } from './services/language.service';
import { delay } from './utils/utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'damage-calc';
  loadingFallback: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSizeStates(event.target)
  }

  Theme = Theme;

  constructor (public screenService: ScreenService, private languageService: LanguageService) {}
  
  async ngOnInit() {
    this.languageService.loadFallbackDict().then(async () => {
      this.loadingFallback = false;
    });

    this.updateScreenSizeStates(window);
    this.screenService.initializeTheme();
  }

  updateScreenSizeStates(viewWindow: Window) {
    if ((!this.screenService.microscopicScreen.value && viewWindow.innerWidth < this.screenService.microscopic) || (this.screenService.microscopicScreen.value && viewWindow.innerWidth >= this.screenService.microscopic)) {
      this.screenService.toggleMicroscopicScreen();
    }
    if ((!this.screenService.tinyScreen.value && viewWindow.innerWidth < this.screenService.tiny) || (this.screenService.tinyScreen.value && viewWindow.innerWidth >= this.screenService.tiny)) {
      this.screenService.toggleTinyScreen();
    }
    if ((!this.screenService.smallScreen.value && viewWindow.innerWidth < this.screenService.small) || (this.screenService.smallScreen.value && viewWindow.innerWidth >= this.screenService.small)) {
      this.screenService.toggleSmallScreen();
    }
    if ((!this.screenService.mediumSmallScreen.value && viewWindow.innerWidth < this.screenService.mediumSmall) || (this.screenService.mediumSmallScreen.value && viewWindow.innerWidth >= this.screenService.mediumSmall)) {
      this.screenService.toggleMediumSmallScreen();
    }
    if ((!this.screenService.mediumScreen.value && viewWindow.innerWidth < this.screenService.medium) || (this.screenService.mediumScreen.value && viewWindow.innerWidth >= this.screenService.medium)) {
      this.screenService.toggleMediumScreen();
      this.screenService.toggleLargeScreen();
    }
    if ((!this.screenService.extraLargeScreen.value && viewWindow.innerWidth >= this.screenService.extraLarge) || (this.screenService.extraLargeScreen.value && viewWindow.innerWidth < this.screenService.extraLarge)) {
      this.screenService.toggleExtraLargeScreen();
    }

    // uncomment for responsiveness debugging
    // console.log(`
    // micro:${this.screenService.microscopicScreen.value}
    // tiny:${this.screenService.tinyScreen.value}
    // small:${this.screenService.smallScreen.value}
    // medsmall:${this.screenService.mediumSmallScreen.value}
    // medium:${this.screenService.mediumScreen.value}
    // large:${this.screenService.largeScreen.value}
    // `)
  }
}
