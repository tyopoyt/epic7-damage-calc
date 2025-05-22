import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import domtoimage from 'dom-to-image-more';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Hero } from 'src/app/models/hero';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';
import { Heroes } from 'src/assets/data/heroes';

@Component({
    selector: 'app-gw-archive',
    templateUrl: './gw-archive.component.html',
    styleUrls: ['./gw-archive.component.scss'],
    standalone: false
})
export class GwArchiveComponent {
  @ViewChild('gwArchiveExport', { static: false }) gwArchiveExport!: ElementRef;


  hero1ID = 'abigail';
  hero2ID = 'abigail';
  hero3ID = 'abigail';

  Heroes = Heroes;
  heroes: [string, Hero][] = Object.entries(Heroes);
  filteredHeroes: [string, Hero][] = _.cloneDeep(this.heroes);

  translationPipe: TranslationPipe;

  public hero1Control: FormControl<string | null>;
  public hero2Control: FormControl<string | null>;
  public hero3Control: FormControl<string | null>;
  public heroFilterControl: FormControl<string | null>;

  heroSearchSubscription: Subscription;

  get language() {
    return this.languageService.language.value;
  }

  constructor (
    public languageService: LanguageService,
    public screenService: ScreenService
  ) {

    // Initialize controls
    this.hero1Control = new FormControl<string | null>('abigail')
    this.hero2Control = new FormControl<string | null>('abigail')
    this.hero3Control = new FormControl<string | null>('abigail')
    this.heroFilterControl = new FormControl<string | null>('')

    this.heroSearchSubscription = this.heroFilterControl.valueChanges
      .subscribe(() => {
        this.filterHeroes();
    });

    this.translationPipe = new TranslationPipe(this.languageService);


    // this.currentHeroSubscription = this.dataService.currentHero.subscribe(() => {
    //   this.skillMultiplierTips = {};
    //   this.updateFormInputs();
    //   this.refreshCompareBadge();
    // })

  }

  // Filter heroes list when user searches
  filterHeroes() {
    this.filteredHeroes = this.heroes.filter((hero) => {
      const searchValues = (this.heroFilterControl.value?.toLowerCase() || '').split(',');
      if (searchValues.length) {
        let matches = true;
        for (const searchValue of searchValues) {
          if (!this.heroMatches(hero[0], searchValue)) {
            matches = false;
          }
        }
        return matches;
      } else {
        return true;
      }
    })
  }

  // Determine if a hero matches the user's search, including name, nickname, element, and class
  heroMatches(heroName: string, searchTerm: string): boolean {
    const scrubbed = searchTerm.replace(/ /g,'');
    const heroLocalizedName = this.translationPipe.transform(heroName, 'heroes', this.language).toLowerCase();
    return heroLocalizedName.replace(/ /g,'').includes(scrubbed)
            || _.get(this.languageService.translationDict.nicknames, heroName, '').replace(/ /g,'').includes(scrubbed)
            || Heroes[heroName].element == scrubbed
            || Heroes[heroName].class == scrubbed;
  }

  selectHero(which: number, hero: string) {
    switch (which) {
      case 1:
        this.hero1ID = hero;
        break;
      case 2:
        this.hero2ID = hero;
        break;
      case 3:
        this.hero3ID = hero;
        break;
    }
  }

  async downloadImage() {
    const element = this.gwArchiveExport.nativeElement;
  
    const dataUrl = await domtoimage.toPng(element, {
      bgcolor: '#121212',
      width: 720,
      height: 360
    })

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${this.hero1ID}-${this.hero2ID}-${this.hero3ID}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
