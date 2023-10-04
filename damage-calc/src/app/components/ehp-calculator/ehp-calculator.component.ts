import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';
import { HeaderCardComponentColorOption, HeaderCardComponentSizeOption } from '../ui-elements/header-card/header-card.component';

@Component({
  selector: 'app-ehp-calculator',
  templateUrl: './ehp-calculator.component.html',
  styleUrls: ['./ehp-calculator.component.scss']
})
export class EHPCalculatorComponent implements OnInit {

  HeaderCardComponentColorOption = HeaderCardComponentColorOption;
  HeaderCardComponentSizeOption = HeaderCardComponentSizeOption;

  higherIcon = 'assets/icons/chevron-double-up.svg';
  lowerIcon = 'assets/icons/chevron-double-down.svg';

  firstEHP = '43333';
  secondEHP = '43333';

  firstRelativePercent = '';
  secondRelativePercent = '';
  firstRelativeIcon = '';
  secondRelativeIcon = '';

  firstDefense = 1000;
  firstHP = 10000;
  secondDefense = 1000;
  secondHP = 10000;

  firstColor: HeaderCardComponentColorOption = HeaderCardComponentColorOption.blue;
  secondColor: HeaderCardComponentColorOption = HeaderCardComponentColorOption.blue; 

  constructor(public screenService: ScreenService,
              public languageService: LanguageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const langParam = this.route.snapshot.paramMap.get('lang') || 'us';
    this.languageService.setLanguage(Languages[langParam])
  }

  firstDefenseChange(value: number) {
    this.firstDefense = value;
    this.calculate();
  }
  firstHPChange(value: number) {
    this.firstHP = value;
    this.calculate();
  }
  secondDefenseChange(value: number) {
    this.secondDefense = value;
    this.calculate();
  }
  secondHPChange(value: number) {
    this.secondHP = value;
    this.calculate();
  }

  calculate() {
  //   if (loadingQueryParams) {
  //     return; // don't resolve until params are loaded
  //   }

    const firstEHP = Math.floor(this.firstHP * (this.firstDefense / 300 + 1));
    const secondEHP = Math.floor(this.secondHP * (this.secondDefense / 300 + 1));

    this.firstRelativePercent = firstEHP !== secondEHP ? `${Math.round(Math.abs((firstEHP / secondEHP) - 1) * 1000) / 10}%` : '';
    this.secondRelativePercent = firstEHP !== secondEHP ? `${Math.round((Math.abs((secondEHP / firstEHP) - 1) * 1000)) / 10}%` : '';

    this.firstEHP = `${Math.round(firstEHP)}`
    this.secondEHP = `${Math.round(secondEHP)}`

    if (firstEHP > secondEHP) {
      this.firstColor = HeaderCardComponentColorOption.green;
      this.secondColor = HeaderCardComponentColorOption.red;
      this.firstRelativeIcon = this.higherIcon;
      this.secondRelativeIcon = this.lowerIcon;
    } else if (firstEHP < secondEHP) {
      this.firstColor = HeaderCardComponentColorOption.red;
      this.secondColor = HeaderCardComponentColorOption.green;
      this.firstRelativeIcon = this.lowerIcon;
      this.secondRelativeIcon = this.higherIcon;
    } else {
      this.firstColor = HeaderCardComponentColorOption.blue;
      this.secondColor = HeaderCardComponentColorOption.blue;
      this.firstRelativeIcon = '';
      this.secondRelativeIcon = '';
    }

    //TODO: enable when queryparams work?
    // debounce('updateQueryParams', updateQueryParams, [false]);
  }
}
