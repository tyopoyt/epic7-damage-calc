import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';
import { DismissibleColorOption } from '../ui-elements/dismissible/dismissible.component';
import { DamageService } from 'src/app/services/damage.service';

@Component({
  selector: 'app-damage-calculator',
  templateUrl: './damage-calculator.component.html',
  styleUrls: ['./damage-calculator.component.scss']
})
export class DamageCalculatorComponent implements OnInit {

  DismissibleColorOption = DismissibleColorOption;
  damage: number = 0;

  constructor (
    private route: ActivatedRoute,
    public languageService: LanguageService,
    public screenService: ScreenService,
    private damageService: DamageService
  ) {}
  
  ngOnInit() {
    const langParam = this.route.snapshot.paramMap.get('lang') || 'us';
    this.languageService.setLanguage(Languages[langParam])
  }

  attackChange(value: number) {
    this.damageService.updateDamages();
  }
  attackImprintChange(value: number) {

  }
  attackIncreaseChange(value: number) {

  }
  critDamageChange(value: number) {

  }
  damageIncreaseChange(value: number) {

  }
  artifactLevelChange(value: number) {

  }
  targetDefenseChange(value: number) {

  }
  targetDefenseIncreaseChange(value: number) {

  }
  damageReductionChange(value: number) {

  }
  damageTransferChange(value: number) {

  }
  casterMaxHPChange(value: number) {

  }
  molagoraChange(value: number) {

  }

}
