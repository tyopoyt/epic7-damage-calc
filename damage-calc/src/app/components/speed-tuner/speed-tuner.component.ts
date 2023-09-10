import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';
import { HeaderCardComponentColorOption, HeaderCardComponentSizeOption } from '../ui-elements/header-card/header-card.component';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';

@Component({
  selector: 'app-speed-tuner',
  templateUrl: './speed-tuner.component.html',
  styleUrls: ['./speed-tuner.component.scss']
})
export class SpeedTunerComponent implements OnInit {

  HeaderCardComponentColorOption = HeaderCardComponentColorOption;
  HeaderCardComponentSizeOption = HeaderCardComponentSizeOption;

  displayColor: HeaderCardComponentColorOption = HeaderCardComponentColorOption.green;

  slowerSpeed: number = 200;
  fasterSpeed: number = 220;
  slowerCRPush: number = 0;
  fasterCRPush: number = 0;
  fasterTurns: number = 1;
  fasterPushesSlower: boolean = false;
  stigmaPolitis: boolean = false;

  slowerSpeedText: string = '209';
  fasterSpeedText: string = '211';
  recommendationText: string = 'Units are properly tuned, and the faster unit will always move before the slower unit.';
  recommendationSubText: string = 'The slower unit can have up to 9 more speed OR the faster unit can have up to 9 less speed.';

  slowerHeader = 'slower_max_speed'
  fasterHeader = 'faster_min_speed'

  translationPipe: TranslationPipe = new TranslationPipe(this.languageService);

  constructor(public screenService: ScreenService,
              public languageService: LanguageService,
              private route: ActivatedRoute,
            ) { }

  ngOnInit(): void {
    const langParam = this.route.snapshot.paramMap.get('lang') || 'us';
    this.languageService.setLanguage(Languages[langParam])
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
    let slowUnitSpeedReq, fastUnitSpeedReq;
    if (this.fasterPushesSlower) {
      const slowerUnitCR = 1 - ((this.slowerCRPush * (this.stigmaPolitis ? 0.5 : 1)) / 100);
      const fasterUnitCR = 0.95;
      const CRRatio = fasterUnitCR / slowerUnitCR;

      slowUnitSpeedReq = Math.ceil(this.fasterSpeed / CRRatio); // min speed
      fastUnitSpeedReq =  Math.floor(this.slowerSpeed * CRRatio); // max speed
  
      this.slowerSpeedText = 'Slower Unit Min Speed';
      this.fasterSpeedText = 'Faster Unit Max Speed';
    } else {
      const slowerUnitCR = 0.95 - ((this.slowerCRPush * (this.stigmaPolitis ? 0.5 : 1)) / 100);
      const fasterUnitCR = this.fasterTurns - ((this.fasterCRPush * (this.stigmaPolitis ? 0.5 : 1)) / 100);
      const CRRatio = fasterUnitCR / slowerUnitCR;
  
      slowUnitSpeedReq = Math.floor(this.fasterSpeed / CRRatio); // max speed
      fastUnitSpeedReq =  Math.ceil(this.slowerSpeed * CRRatio); // min speed
  
      this.slowerSpeedText = 'Slower Unit Max Speed';
      this.fasterSpeedText = 'Faster Unit Min Speed';
    } 
      
  
    // set output text to 'Impossible' in edge cases
    let formattedSlowSpeed = slowUnitSpeedReq <= 0 || slowUnitSpeedReq.toString() == 'Infinity' ? 'Impossible' : slowUnitSpeedReq.toString();
    let formattedFastSpeed = fastUnitSpeedReq <= 0 || fastUnitSpeedReq.toString() == 'Infinity' ? 'Impossible' : fastUnitSpeedReq.toString();
  
    // TODO: translate recommendations using this.translationPipe
    // generate recommendation and update styling accordingly
    if (this.slowerSpeed > this.fasterSpeed) {
      formattedSlowSpeed = 'Impossible';
      formattedFastSpeed = 'Impossible';
      this.recommendationText = 'The faster unit\'s speed must be greater than the slower unit\'s speed.';
      this.recommendationSubText = '';
      this.displayColor = HeaderCardComponentColorOption.red;
    } else if (this.correctTune(slowUnitSpeedReq, fastUnitSpeedReq)) {
      this.recommendationText = `Units are improperly tuned, and ${this.fasterPushesSlower ? 'the slower unit may not have 100% CR after the faster unit pushes' : 'the desired turn order isn\'t guaranteed'}.`
      this.recommendationSubText = (formattedSlowSpeed !== 'Impossible' ? `The slower unit needs at least ${Math.abs(this.slowerSpeed - slowUnitSpeedReq)} ${this.fasterPushesSlower ? 'more' : 'less'} speed` : '') +
                           (!(formattedSlowSpeed === 'Impossible' || formattedFastSpeed === 'Impossible') ? ' OR ' : '') +
                           (formattedFastSpeed !== 'Impossible' ? `the faster unit needs at least ${Math.abs(fastUnitSpeedReq - this.fasterSpeed)} ${this.fasterPushesSlower ? 'less' : 'more'} speed.` : '');
      this.displayColor = HeaderCardComponentColorOption.red;
    } else {
      this.recommendationText = `Units are properly tuned, and ${this.fasterPushesSlower ? 'the slower unit will have at least 100% CR after the faster unit pushes' : 'the faster unit will always move before the slower unit'}.`;
      if (this.slowerSpeed !== slowUnitSpeedReq || this.fasterSpeed !== fastUnitSpeedReq) {
        this.recommendationSubText = `The slower unit can have up to ${Math.abs(slowUnitSpeedReq - this.slowerSpeed)} ${this.fasterPushesSlower ? 'less' : 'more'} speed` +
                                     ` OR the faster unit can have up to ${Math.abs(this.fasterSpeed - fastUnitSpeedReq)} ${this.fasterPushesSlower ? 'more' : 'less'} speed.`;
      }
      this.displayColor = HeaderCardComponentColorOption.green;
    }
    
    this.slowerSpeedText = formattedSlowSpeed;
    this.fasterSpeedText = formattedFastSpeed;
  
    //TODO: enable when queryparams work
    // debounce('updateQueryParams', updateQueryParams, [false]);
  };

}
