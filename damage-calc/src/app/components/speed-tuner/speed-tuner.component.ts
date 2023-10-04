import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';
import { HeaderCardComponentColorOption, HeaderCardComponentSizeOption } from '../ui-elements/header-card/header-card.component';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';
import { DismissibleColorOption } from '../ui-elements/dismissible/dismissible.component';

@Component({
  selector: 'app-speed-tuner',
  templateUrl: './speed-tuner.component.html',
  styleUrls: ['./speed-tuner.component.scss']
})
export class SpeedTunerComponent implements OnInit {

  HeaderCardComponentColorOption = HeaderCardComponentColorOption;
  HeaderCardComponentSizeOption = HeaderCardComponentSizeOption;

  translationPipe: TranslationPipe = new TranslationPipe(this.languageService);

  displayColor: HeaderCardComponentColorOption = HeaderCardComponentColorOption.green;

  slowerSpeed = 200;
  fasterSpeed = 220;
  slowerCRPush = 0;
  fasterCRPush = 0;
  fasterTurns = 1;
  fasterPushesSlower = false;
  stigmaPolitis = false;

  slowerSpeedText = '209';
  fasterSpeedText = '211';
  recommendationText = 'Units are properly tuned, and the faster unit will always move before the slower unit.';
  recommendationSubText = 'The slower unit can have up to 9 more speed OR the faster unit can have up to 9 less speed.';

  slowerHeader = 'slower_max_speed'
  fasterHeader = 'faster_min_speed'

  DismissibleColorOption = DismissibleColorOption;

  constructor(public screenService: ScreenService,
              public languageService: LanguageService,
              private route: ActivatedRoute,
            ) { }

  ngOnInit(): void {
    const langParam = this.route.snapshot.paramMap.get('lang') || 'us';
    this.languageService.setLanguage(Languages[langParam])

    this.languageService.language.subscribe(() => {
      this.calculate();
    })
  }

  slowerSpeedChange(value: number) {
    this.slowerSpeed = value;
    this.calculate();
  }
  slowerCRPushChange(value: number) {
    this.slowerCRPush = value;
    this.calculate();
  }
  fasterSpeedChange(value: number) {
    this.fasterSpeed = value;
    this.calculate();
  }
  fasterCRPushChange(value: number) {
    this.fasterCRPush = value;
    this.calculate();
  }
  fasterTurnsChange(value: number) {
    this.fasterTurns = value;
    this.calculate();
  }
  toggleFasterPushesSlower() {
    this.fasterPushesSlower = !this.fasterPushesSlower;
    if (!this.fasterPushesSlower) {
      this.slowerHeader = 'slower_max_speed'
      this.fasterHeader = 'faster_min_speed'
    } else {
      this.slowerHeader = 'slower_min_speed'
      this.fasterHeader = 'faster_max_speed'
    }
    this.calculate();
  }

  toggleStigmaPolitis() {
    this.stigmaPolitis = !this.stigmaPolitis;
    this.calculate();
  }

  translate(key: string) {
    return this.translationPipe.transform(key, 'form', this.languageService.language.value);
  }

 /*
  * Return whether the units are tuned properly
  *
  * This could be reduced to a ternary but it'd be a bit long so this is easier to read
  */
  correctTune = (slowSpeedReq: number, fastSpeedReq: number) => {
    if (this.fasterPushesSlower) {
      return this.slowerSpeed < slowSpeedReq || this.fasterSpeed > fastSpeedReq;
    } else {
      return this.slowerSpeed > slowSpeedReq || this.fasterSpeed < fastSpeedReq;
    }
  };

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
    let slowUnitSpeedReq, formattedSlowSpeed, fastUnitSpeedReq, formattedFastSpeed;
    const impossible = this.translate('impossible');    

    if (this.fasterPushesSlower) {
      const slowerUnitCR = 1 - ((this.slowerCRPush * (this.stigmaPolitis ? 0.5 : 1)) / 100);
      const fasterUnitCR = 0.95;
      const CRRatio = fasterUnitCR / slowerUnitCR;

      slowUnitSpeedReq = this.fasterSpeed / CRRatio; // min speed
      fastUnitSpeedReq =  this.slowerSpeed * CRRatio; // max speed

      // set output text to 'Impossible' in edge cases
      formattedSlowSpeed = slowUnitSpeedReq <= 0 || slowUnitSpeedReq.toString() == 'Infinity' ? impossible : Math.ceil(slowUnitSpeedReq).toString();
      formattedFastSpeed = fastUnitSpeedReq <= 0 || fastUnitSpeedReq.toString() == 'Infinity' ? impossible : Math.floor(fastUnitSpeedReq).toString();
  
      this.slowerSpeedText = 'Slower Unit Min Speed';
      this.fasterSpeedText = 'Faster Unit Max Speed';
    } else {
      const slowerUnitCR = 0.95 - ((this.slowerCRPush * (this.stigmaPolitis ? 0.5 : 1)) / 100);
      const fasterUnitCR = this.fasterTurns - ((this.fasterCRPush * (this.stigmaPolitis ? 0.5 : 1)) / 100);
      const CRRatio = fasterUnitCR / slowerUnitCR;
  
      // set output text to 'Impossible' in edge cases
      slowUnitSpeedReq = this.fasterSpeed / CRRatio; // max speed
      fastUnitSpeedReq =  this.slowerSpeed * CRRatio; // min speed

      formattedSlowSpeed = slowUnitSpeedReq <= 0 || slowUnitSpeedReq.toString() == 'Infinity' ? impossible : Math.floor(slowUnitSpeedReq).toString();
      formattedFastSpeed = fastUnitSpeedReq <= 0 || fastUnitSpeedReq.toString() == 'Infinity' ? impossible : Math.ceil(fastUnitSpeedReq).toString();
  
      this.slowerSpeedText = 'Slower Unit Max Speed';
      this.fasterSpeedText = 'Faster Unit Min Speed';
    }   

    // generate recommendation and update styling accordingly
    if (this.slowerSpeed > this.fasterSpeed) {
      formattedSlowSpeed = impossible;
      formattedFastSpeed = impossible;
      this.recommendationText = this.translate('invalid_speed');
      this.recommendationSubText = '';
      this.displayColor = HeaderCardComponentColorOption.red;
    } else if (this.correctTune(slowUnitSpeedReq, fastUnitSpeedReq)) {
      const slowerNeeds = Math.ceil(Math.abs(this.slowerSpeed - slowUnitSpeedReq));
      const fasterNeeds = Math.ceil(Math.abs(fastUnitSpeedReq - this.fasterSpeed));
      this.recommendationText = `${this.translate('improperly_tuned')}${this.fasterPushesSlower ? this.translate('improper_cr') : this.translate('improper_order')}${this.translate('full_stop')}`
      this.recommendationSubText = (formattedSlowSpeed !== impossible ? `${this.translate('slower_unit_needs')}${slowerNeeds}${this.fasterPushesSlower ? this.translate('more') : this.translate('less')}${this.translate('speed_speed_tuner')}` : '') +
                           (!(formattedSlowSpeed === impossible || formattedFastSpeed === impossible) ? this.translate('_or_') : '') +
                           (formattedFastSpeed !== impossible ? `${this.translate('faster_unit_needs')}${fasterNeeds}${this.fasterPushesSlower ? this.translate('less') : this.translate('more')}${this.translate('speed_speed_tuner')}${this.translate('full_stop')}` : '');
      this.displayColor = HeaderCardComponentColorOption.red;
    } else {
      const slowerPossible = Math.floor(Math.abs(this.slowerSpeed - slowUnitSpeedReq));
      const fasterPossible = Math.floor(Math.abs(fastUnitSpeedReq - this.fasterSpeed));
      this.recommendationText = `${this.translate('properly_tuned')}${this.fasterPushesSlower ? this.translate('proper_cr') : this.translate('proper_order')}${this.translate('full_stop')}`;
      if (this.slowerSpeed !== slowUnitSpeedReq || this.fasterSpeed !== fastUnitSpeedReq) {
        this.recommendationSubText = `${this.translate('slower_unit_possible')}${slowerPossible}${this.fasterPushesSlower ? this.translate('less') : this.translate('more')}${this.translate('speed_speed_tuner')}` +
                                     `${this.translate('_or_')}${this.translate('faster_unit_possible')}${fasterPossible}${this.fasterPushesSlower ? this.translate('less') : this.translate('more')}${this.translate('speed_speed_tuner')}${this.translate('full_stop')}`;
      }
      this.displayColor = HeaderCardComponentColorOption.green;
    }
    
    this.slowerSpeedText = formattedSlowSpeed;
    this.fasterSpeedText = formattedFastSpeed;
  
    //TODO: enable when queryparams work?
    // debounce('updateQueryParams', updateQueryParams, [false]);
  }

}
