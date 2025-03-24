import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';
import { HeaderCardComponentColorOption, HeaderCardComponentSizeOption } from '../ui-elements/header-card/header-card.component';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';
import { DismissibleColorOption } from '../ui-elements/dismissible/dismissible.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-speed-solver',
  templateUrl: './speed-solver.component.html',
  styleUrls: ['./speed-solver.component.scss']
})
export class SpeedSolverComponent implements OnInit {

  solverTypeControl: FormControl<string | null>;

  HeaderCardComponentColorOption = HeaderCardComponentColorOption;
  HeaderCardComponentSizeOption = HeaderCardComponentSizeOption;

  translationPipe: TranslationPipe = new TranslationPipe(this.languageService);

  displayColor: HeaderCardComponentColorOption = HeaderCardComponentColorOption.green;

  slowerSpeed = 200;
  fasterSpeed = 300;
  slowerCR = 75;
  fasterCR = 50;

  avgSpeedText = '225';
  speedRangeText = '210 - 237';

  DismissibleColorOption = DismissibleColorOption;

  constructor(public screenService: ScreenService,
              public languageService: LanguageService,
              private route: ActivatedRoute,
            )
  {
    this.solverTypeControl = new FormControl<string | null>('slower')
    this.solverTypeControl.setValue('slower')
  }

  ngOnInit(): void {
    const langParam = this.route.snapshot.paramMap.get('lang') || 'us';
    this.languageService.setLanguage(Languages[langParam])

    this.languageService.language.subscribe(() => {
      this.calculate();
    })
  }

  setSolverType(type: string) {
    this.solverTypeControl.setValue(type);
    this.calculate();
  }

  slowerSpeedChange(value: number) {
    this.slowerSpeed = value;
    this.calculate();
  }
  slowerCRChange(value: number) {
    this.slowerCR = value;
    this.calculate();
  }
  fasterSpeedChange(value: number) {
    this.fasterSpeed = value;
    this.calculate();
  }
  fasterCRChange(value: number) {
    this.fasterCR = value;
    this.calculate();
  }

  translate(key: string) {
    return this.translationPipe.transform(key, 'form', this.languageService.language.value);
  }

  calculate() {
    //   if (loadingQueryParams) {
    //     return; // don't resolve until params are loaded
    //   }
    
    /* 
       * GENERAL FORMULA: fast Speed = slow Speed * fast CR / slow CR
       *
       * For normal mode, 0.95 used as base for slowerUnitCR to ensure that in the worst case (slow unit +5% CR, fast unit +0% CR)
       * the turn order will still hold 100% of the time
       * 
       * For faster unit pushes mode, 0.95 used as base for fasterUnitCR to ensure that in the worst case (fast unit +5% CR, slow unit +0% CR)
       * the turn order will still hold 100% of the time
       * 
       * Take the floor of max speed and ceil of min speed for safety since we can't have fractional speed
       */
    let solveUnitMinSpeed, solveUnitMaxSpeed, solveUnitAvgSpeed;

    if (this.solverTypeControl.value === 'slower') {
      const slowerUnitCR = this.slowerCR / 100;
      // const fasterUnitCR = 1;
      const minCRRatio = slowerUnitCR - 0.05; // divided by 1
      const avgCRRatio = slowerUnitCR; // divided by 1
      const maxCRRatio = slowerUnitCR / 0.95;

      solveUnitMinSpeed = this.fasterSpeed * minCRRatio;
      solveUnitAvgSpeed = this.fasterSpeed * avgCRRatio;
      solveUnitMaxSpeed = this.fasterSpeed * maxCRRatio;
  
      this.speedRangeText = `${Math.floor(solveUnitMinSpeed)} - ${Math.ceil(solveUnitMaxSpeed)}`;
      this.avgSpeedText = `~${Math.ceil(solveUnitAvgSpeed)}`;
    } else {
      const slowerUnitCR = this.slowerCR / 100;
      const fasterUnitCR = this.fasterCR / 100;

      const minCRRatio = (fasterUnitCR - 0.05) / slowerUnitCR;
      const avgCRRatio = fasterUnitCR / slowerUnitCR;
      const maxCRRatio = fasterUnitCR / (slowerUnitCR - 0.05);

      solveUnitMinSpeed = this.slowerSpeed * minCRRatio;
      solveUnitAvgSpeed = this.slowerSpeed * avgCRRatio;
      solveUnitMaxSpeed = this.slowerSpeed * maxCRRatio;
  
      this.speedRangeText = `${Math.floor(solveUnitMinSpeed)} - ${Math.ceil(solveUnitMaxSpeed)}`;
      this.avgSpeedText = `~${Math.ceil(solveUnitAvgSpeed)}`;
    }
  
    //TODO: enable when queryparams work?
    // debounce('updateQueryParams', updateQueryParams, [false]);
  }

}
