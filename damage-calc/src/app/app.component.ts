import { Component, HostListener, OnInit } from '@angular/core';
import { Languages } from './models/languages';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenService } from './services/screen.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'damage-calc';

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
    if ((!this.screenService.mediumScreen.value && event.target.innerWidth < this.screenService.medium) || (this.screenService.mediumScreen.value && event.target.innerWidth >= this.screenService.medium)) {
      this.screenService.toggleMediumScreen();
      this.screenService.toggleLargeScreen();
    }
  }

  constructor (private screenService: ScreenService) {}
  
  ngOnInit() {
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
