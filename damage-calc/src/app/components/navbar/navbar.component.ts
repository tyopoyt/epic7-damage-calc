import { CurrencyPipe, Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatLegacySelectChange as MatSelectChange } from '@angular/material/legacy-select';
import { ActivatedRoute, Router } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  languages = Object.values(Languages);
  countries = Object.entries(Languages).map(([key, value]) => value.countryCode)
  toolTitles: string[] = [];
  languageSelection = new UntypedFormControl(Languages.us);
  toolSelection: UntypedFormControl;

  constructor(
    public languageService: LanguageService,
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    public screenService: ScreenService
  ) {
    this.toolSelection = new UntypedFormControl(this.languageService.toolTitles[0]);
  }

  ngOnInit() {
    this.toolTitles = this.languageService.toolTitles;
    this.languageService.language.subscribe(language => {
      this.languageSelection.setValue(language)
    })

    const activePath = window.location.href.split('/')
    let activeTool: string = activePath.pop() || activePath.pop() || 'damage-calculator';

    if (!Object.keys(this.languageService.toolPathToTitleMap).includes(activeTool)) {
      activeTool = 'damage-calculator';
    }

    this.toolSelection.setValue(this.languageService.toolPathToTitleMap[activeTool])
  }

  // The navigation here and in selectTool is a bit clunky but ActivatedRoute is only populated for the component that matched the route
  // There's probably a better way to do this but it works and is performant enough so it's fine
  selectLanguage(event: MatSelectChange) {
    const newUrl = this.router.createUrlTree([event.value.countryCode]).toString()
    this.languageService.setLanguage(event.value);
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
}
