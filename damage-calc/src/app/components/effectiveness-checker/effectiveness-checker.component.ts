import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-effectiveness-checker',
  templateUrl: './effectiveness-checker.component.html',
  styleUrls: ['./effectiveness-checker.component.scss']
})
export class EffectivenessCheckerComponent implements OnInit {

  landText: BehaviorSubject<string> = new BehaviorSubject('85%')
  inflictText: BehaviorSubject<string> = new BehaviorSubject('85%')
  resistText: BehaviorSubject<string> = new BehaviorSubject('15%')

  resistance: number = 0;
  effectiveness: number = 0;
  hitChance: number = 100;
  procChance: number = 100;

  constructor(public screenService: ScreenService,
              public languageService: LanguageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const langParam = this.route.snapshot.paramMap.get('lang') || 'us';
    this.languageService.setLanguage(Languages[langParam])
  }

  resistanceChange(value: number) {
    this.resistance = value;
    this.calculate();
  }
  effectivenessChange(value: number) {
    this.effectiveness = value;
    this.calculate();
  }
  hitChanceChange(value: number) {
    this.hitChance = value;
    this.calculate();
  }
  effectChanceChange(value: number) {
    this.procChance = value;
    this.calculate();
  }

  calculate() {
  //   if (loadingQueryParams) {
  //     return; // don't resolve until params are loaded
  //   }

    const hitChance = this.hitChance / 100;
    const procChance = this.procChance / 100;
    const effectiveness = this.effectiveness / 100;
    const resistance = this.resistance / 100;

    const landChance = Math.max(Math.min(1 + effectiveness - resistance, 0.85), 0);
    const resistChance = 1 - landChance;

    const inflictChance = hitChance * procChance * landChance;

    this.landText.next(`${Math.round(landChance * 100)}%`)
    this.resistText.next(`${Math.round(resistChance * 100)}%`)
    this.inflictText.next(`${Math.round(inflictChance * 100)}%`)

    //TODO: enable when queryparams work
    // debounce('updateQueryParams', updateQueryParams, [false]);
  };


}
