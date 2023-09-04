import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  languages = Object.values(languages);
  languageSelection = new FormControl(languages.us);

  constructor(
    public languageService: LanguageService,
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.languageService.language.subscribe(language => {
      this.languageSelection.setValue(language)
    })
  }

  selectLanguage(event: MatSelectChange) {
    const newUrl = this.router.createUrlTree([event.value.countryCode], {relativeTo: this.route}).toString()
    this.languageService.setLanguage(event.value);
    this._location.go(newUrl)
  }
}
