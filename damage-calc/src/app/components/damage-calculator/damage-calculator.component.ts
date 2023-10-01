import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';
import { DismissibleColorOption } from '../ui-elements/dismissible/dismissible.component';
import { DamageService } from 'src/app/services/damage.service';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject } from 'rxjs';

export interface DamageRow {
  skill: string;
  crit: number | null;
  crush: number | null;
  normal: number | null;
  miss: number | null;
}

@Component({
  selector: 'app-damage-calculator',
  templateUrl: './damage-calculator.component.html',
  styleUrls: ['./damage-calculator.component.scss']
})
export class DamageCalculatorComponent implements OnInit {

  DismissibleColorOption = DismissibleColorOption;
  
  displayedColumns: string[] = ['skill', 'crit', 'crush', 'normal', 'miss']
  damages: DamageRow[] = [];
  
  get inputValues() {
    return this.dataService.damageInputValues;
  }

  get hero() {
    return this.dataService.currentHero;
  }

  constructor (
    private route: ActivatedRoute,
    public languageService: LanguageService,
    public screenService: ScreenService,
    private damageService: DamageService,
    private dataService: DataService
  ) {}
  
  ngOnInit() {
    const langParam = this.route.snapshot.paramMap.get('lang') || 'us';
    this.languageService.setLanguage(Languages[langParam])

    this.damageService.damages.subscribe((skillDamages) => {
      const newDamages: DamageRow[] = [];
      for (const [skill, damages] of Object.entries(skillDamages)) {
        newDamages.push({'skill': skill, 'crit': damages.crit, 'crush': damages.crush, 'normal': damages.normal, 'miss': damages.miss})
      }
      this.damages = newDamages;
    })
  }

  // TODO: don't call this initially for every input, only once
  inputChange(field: string, value: number | boolean) {
    this.dataService.updateDamageInputValues({[field]: value});
    console.log({[field]: value})
  }

  molagoraChange(value: number) {

  }

}
