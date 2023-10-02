import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';
import { DismissibleColorOption } from '../ui-elements/dismissible/dismissible.component';
import { DamageService } from 'src/app/services/damage.service';
import { DataService } from 'src/app/services/data.service';
import { heroes } from 'src/assets/data/heroes';
import { Hero } from 'src/app/models/hero';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as _ from 'lodash-es';

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
export class DamageCalculatorComponent implements OnInit, OnDestroy {

  @ViewChild('heroAutocomplete') heroAutocomplete: FormControl | undefined;

  searchSubscription: Subscription;

  DismissibleColorOption = DismissibleColorOption;
  
  displayedColumns: string[] = ['skill', 'crit', 'crush', 'normal', 'miss']
  damages: DamageRow[] = [];

  heroes: [string, Hero][] = Object.entries(heroes);
  filteredHeroes: [string, Hero][] = _.cloneDeep(this.heroes);

  public heroControl: FormControl<string | null>;
  public heroFilterControl: FormControl<string | null>;

  translationPipe: TranslationPipe;
  
  get inputValues() {
    return this.dataService.damageInputValues;
  }

  get hero() {
    return this.dataService.currentHero;
  }

  get skills() {
    return Object.values(this.hero.skills);
  }

  get advantageousElement() {
    return this.dataService.advantageousElement();
  }

  constructor (
    private route: ActivatedRoute,
    public languageService: LanguageService,
    public screenService: ScreenService,
    private damageService: DamageService,
    public dataService: DataService
  ) {
    this.translationPipe = new TranslationPipe(this.languageService);
    this.heroControl = new FormControl<string | null>(this.dataService.currentHeroID)
    this.heroFilterControl = new FormControl<string | null>('')

    this.searchSubscription = this.heroFilterControl.valueChanges
      .subscribe(() => {
        this.filterHeroes();
    });
  }
  
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

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  // TODO: don't call this initially for every input, only once
  inputChange(field: string, value: number | boolean) {
    this.dataService.updateDamageInputValues({[field]: value});
  }

  molagoraChange(value: number) {

  }

  selectHero(hero: string) {
    this.dataService.updateSelectedHero(hero);
  }

  currentHeroName = (selectedHero: string): string => {
    return this.translationPipe.transform(selectedHero, 'heroes', this.languageService.language.value);
  }

  filterHeroes() {
    this.filteredHeroes = this.heroes.filter((hero) => {
      const heroName = this.translationPipe.transform(hero[0], 'heroes', this.languageService.language.value).toLowerCase();
      const searchValue = this.heroFilterControl.value?.toLowerCase() || '';
      if (this.heroFilterControl.value) {
        return heroName.includes(searchValue) || _.get(this.languageService.translationDict.nicknames, hero[0], '').includes(searchValue)
      } else {
        return true;
      }
    })
  }

}
