import { CurrencyPipe, Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Language, Languages } from 'src/app/models/languages';
import { CustomLanguage, LanguageService } from 'src/app/services/language.service';
import { ScreenService, Theme } from 'src/app/services/screen.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {

  @ViewChild('darkModeSwitch') darkModeSwitch: ElementRef | undefined;
  @ViewChild('retroModeSwitch') retroModeSwitch: ElementRef | undefined;
  @ViewChild('smallScreenPageSelect') pageSelect: MatSelect | undefined;

  customLanguage = CustomLanguage

  languages = Object.values(Object.entries(Languages).filter(entry => entry[0].length <= 2 && entry[0] !== 'zh').map(([key, value]) => value));
  countries = Object.entries(Languages).map(([key, value]) => value.countryCode)
  toolTitles: string[] = [];
  languageSelection = new UntypedFormControl(Languages.us);
  toolSelection: UntypedFormControl;

  Theme = Theme;

  darkModeIconPath = 'M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z';
  lightModeIconPath = 'M7 12a5 5 0 1 1 5 5 5 5 0 0 1-5-5zm5-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1zm-1 15v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-2 0zm10-9h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zM3 13h1a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zm14.657-5.657a1 1 0 0 0 .707-.293l.707-.707a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 0 0 .707 1.707zM5.636 16.95l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 0 0-1.414-1.414zm11.314 0a1 1 0 0 0 0 1.414l.707.707a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 0zM5.636 7.05A1 1 0 0 0 7.05 5.636l-.707-.707a1 1 0 0 0-1.414 1.414z';
  modernModeIconPath = 'M7.97,16L5,19C4.67,19.3 4.23,19.5 3.75,19.5A1.75,1.75 0 0,1 2,17.75V17.5L3,10.12C3.21,7.81 5.14,6 7.5,6H16.5C18.86,6 20.79,7.81 21,10.12L22,17.5V17.75A1.75,1.75 0 0,1 20.25,19.5C19.77,19.5 19.33,19.3 19,19L16.03,16H7.97M7,8V10H5V11H7V13H8V11H10V10H8V8H7M16.5,8A0.75,0.75 0 0,0 15.75,8.75A0.75,0.75 0 0,0 16.5,9.5A0.75,0.75 0 0,0 17.25,8.75A0.75,0.75 0 0,0 16.5,8M14.75,9.75A0.75,0.75 0 0,0 14,10.5A0.75,0.75 0 0,0 14.75,11.25A0.75,0.75 0 0,0 15.5,10.5A0.75,0.75 0 0,0 14.75,9.75M18.25,9.75A0.75,0.75 0 0,0 17.5,10.5A0.75,0.75 0 0,0 18.25,11.25A0.75,0.75 0 0,0 19,10.5A0.75,0.75 0 0,0 18.25,9.75M16.5,11.5A0.75,0.75 0 0,0 15.75,12.25A0.75,0.75 0 0,0 16.5,13A0.75,0.75 0 0,0 17.25,12.25A0.75,0.75 0 0,0 16.5,11.5Z'
  retroModeIconPath = 'M6,7H18A5,5 0 0,1 23,12A5,5 0 0,1 18,17C16.36,17 14.91,16.21 14,15H10C9.09,16.21 7.64,17 6,17A5,5 0 0,1 1,12A5,5 0 0,1 6,7M19.75,9.5A1.25,1.25 0 0,0 18.5,10.75A1.25,1.25 0 0,0 19.75,12A1.25,1.25 0 0,0 21,10.75A1.25,1.25 0 0,0 19.75,9.5M17.25,12A1.25,1.25 0 0,0 16,13.25A1.25,1.25 0 0,0 17.25,14.5A1.25,1.25 0 0,0 18.5,13.25A1.25,1.25 0 0,0 17.25,12M5,9V11H3V13H5V15H7V13H9V11H7V9H5Z'

  constructor(
    public languageService: LanguageService,
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    public screenService: ScreenService,
    private renderer: Renderer2,
    private gtmService: GoogleTagManagerService

  ) {
    this.toolSelection = new UntypedFormControl(this.languageService.toolTitles[0]);
  }

  ngOnInit() {
    this.toolTitles = this.languageService.toolTitles;
    this.languageService.language.subscribe(language => {
      this.languageSelection.setValue(language);
    })

    this.screenService.extraLargeScreen.subscribe(value => {
      if (value) {
        this.setSlideToggleIcons();
      }
    })

    // Probably a better way to fix this since it should be the default behavior but I'm not certain what the cause is
    // It may be z-index related?
    // this.renderer.listen('document', 'click', (event: MouseEvent) => {
    //   const targetElement = event.target as HTMLElement;
    //   const matSelectElement = document.querySelector('.mat-select-panel');
  
    //   if (matSelectElement && !matSelectElement.contains(targetElement)) {
    //     // Close the mat-select when clicking outside
    //     this.pageSelect?.close();
    //   }
    // })

    const activePath = window.location.href.split('/')
    let activeTool: string = activePath.pop() || activePath.pop() || 'damage-calculator';

    if (!Object.keys(this.languageService.toolPathToTitleMap).includes(activeTool)) {
      activeTool = 'damage-calculator';
    }

    this.toolSelection.setValue(this.languageService.toolPathToTitleMap[activeTool])
  }

  async setSlideToggleIcons(time = 320) {
    await new Promise(resolve => setTimeout(resolve, time))
    if (this.darkModeSwitch){
      await document.querySelectorAll('.mdc-switch__icon--on path')[0]?.setAttribute('d', this.darkModeIconPath);
      document.querySelectorAll('.mdc-switch__icon--off path')[0]?.setAttribute('d', this.lightModeIconPath);
    }
    if (this.retroModeSwitch){
      await document.querySelectorAll('.mdc-switch__icon--on path')[1]?.setAttribute('d', this.retroModeIconPath);
      document.querySelectorAll('.mdc-switch__icon--off path')[1]?.setAttribute('d', this.modernModeIconPath);
    }
  }

  openKofi() {
    window.open('https://ko-fi.com/tyopoyt', '_blank');
  }

  toggleDarkMode() {
    this.screenService.toggleDarkMode();

    this.gtmService.pushTag({
      'event': 'toggle_dark_mode',
      'dark_mode': [Theme.dark, Theme.retro].includes(this.screenService.theme) ? 'on' : 'off'
    });
  }

  toggleRetroMode() {
    this.screenService.toggleRetroMode();

    this.gtmService.pushTag({
      'event': 'toggle_retro_mode',
      'retro_mode': [Theme.retroLight, Theme.retro].includes(this.screenService.theme) ? 'on' : 'off'
    });
  }

  // The navigation here and in selectTool is a bit clunky but ActivatedRoute is only populated for the component that matched the route
  // There's probably a better way to do this but it works and is performant enough so it's fine
  selectLanguage(language: Language) {
    const newUrl = this.router.createUrlTree([language.countryCode]).toString()
    this.languageService.setLanguage(language, true);
    this._location.go(`${newUrl}/${this.languageService.toolTitleToPathMap[this.toolSelection.value]}`)
  }

  selectTool(tool: string) {
    if (this.toolSelection.value !== tool) {
      this.toolSelection.setValue(tool);
    }

    const newUrlParts = []
    let currentRoute = this._location.path().split('/')[1] || '';
    if (!this.countries.includes(currentRoute)) {
      currentRoute = '';
    }
    if (currentRoute) {
      newUrlParts.push(currentRoute);
    }
    newUrlParts.push(this.languageService.toolTitleToPathMap[tool])

    this.router.navigate(newUrlParts)
  }

  languageSelectOptionClicked(language: Language) {
    if (language.code === this.languageService.language.value?.code && language.countryCode === this.languageService.language.value?.countryCode) {
      this.languageService.incrementLanguageCounter()
    }
  }
}
