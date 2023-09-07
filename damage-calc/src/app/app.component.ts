import { Component, HostListener, OnInit } from '@angular/core';
import { Languages } from './models/languages';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenService } from './services/screen.service';
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
    if ((!this.screenService.microscopicScreen.value && event.target.innerWidth < this.screenService.microscopic) || (this.screenService.microscopicScreen.value && event.target.innerWidth >= this.screenService.microscopic)) {
      this.screenService.toggleMicroscopicScreen();
    }
    if ((!this.screenService.tinyScreen.value && event.target.innerWidth < this.screenService.tiny) || (this.screenService.tinyScreen.value && event.target.innerWidth >= this.screenService.tiny)) {
      this.screenService.toggleTinyScreen();
    }
    if ((!this.screenService.smallScreen.value && event.target.innerWidth < this.screenService.small) || (this.screenService.smallScreen.value && event.target.innerWidth >= this.screenService.small)) {
      this.screenService.toggleSmallScreen();
    }
    if ((!this.screenService.mediumSmallScreen.value && event.target.innerWidth < this.screenService.mediumSmall) || (this.screenService.mediumSmallScreen.value && event.target.innerWidth >= this.screenService.mediumSmall)) {
      this.screenService.toggleMediumSmallScreen();
    }
    if ((!this.screenService.mediumScreen.value && event.target.innerWidth < this.screenService.medium) || (this.screenService.mediumScreen.value && event.target.innerWidth >= this.screenService.medium)) {
      this.screenService.toggleMediumScreen();
      this.screenService.toggleLargeScreen();
    }
  }

  constructor (private screenService: ScreenService, private languageService: LanguageService) {}
  
  async ngOnInit() {
    this.languageService.loadFallbackDict().then(async () => {
      this.loadingFallback = false;
    });

    if (window.innerWidth < this.screenService.tiny) {
      this.screenService.toggleTinyScreen();
    }

    if (window.innerWidth < this.screenService.small) {
      this.screenService.toggleSmallScreen();
    }

    if (window.innerWidth < this.screenService.medium) {
      this.screenService.toggleMediumScreen();
      this.screenService.toggleLargeScreen();
    }
  }
}
