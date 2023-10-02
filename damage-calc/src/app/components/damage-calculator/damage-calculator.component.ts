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
import { artifacts } from 'src/assets/data/artifacts';
import { Artifact } from 'src/app/models/artifact';

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

  heroSearchSubscription: Subscription;
  artifactSearchSubscription: Subscription;

  DismissibleColorOption = DismissibleColorOption;
  
  displayedColumns: string[] = ['skill', 'crit', 'crush', 'normal', 'miss']
  damages: DamageRow[] = [];

  // All hero entries
  heroes: [string, Hero][] = Object.entries(heroes);
  // Hero entries displayed in select box after a search filter
  filteredHeroes: [string, Hero][] = _.cloneDeep(this.heroes);
  // controls for hero selection
  public heroControl: FormControl<string | null>;
  public heroFilterControl: FormControl<string | null>;

  // All artifact entries
  artifacts: [string, Artifact][] = Object.entries(artifacts);
  // Hero entries displayed in select box after a search filter
  filteredArtifacts: [string, Artifact][] = _.cloneDeep(this.artifacts);
  // controls for hero selection
  public artifactControl: FormControl<string | null>;
  public artifactFilterControl: FormControl<string | null>;

  translationPipe: TranslationPipe;
  
  get inputValues() {
    return this.dataService.damageInputValues;
  }

  get hero() {
    return this.dataService.currentHero;
  }

  get heroID() {
    return this.dataService.currentHeroID;
  }

  get artifact() {
    return this.dataService.currentArtifact;
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
    
    this.artifactControl = new FormControl<string | null>(this.dataService.currentArtifactID)
    this.artifactFilterControl = new FormControl<string | null>('')

    this.heroSearchSubscription = this.heroFilterControl.valueChanges
      .subscribe(() => {
        this.filterHeroes();
    });

    this.artifactSearchSubscription = this.artifactFilterControl.valueChanges
      .subscribe(() => {
        this.filterArtifacts();
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
    if (this.heroSearchSubscription) {
      this.heroSearchSubscription.unsubscribe();
    }
  }

  // TODO: don't call this initially for every input, only once
  inputChange(field: string, value: number | boolean) {
    this.dataService.updateDamageInputValues({[field]: value});
  }

  molagoraChange(value: number) {
    return;
  }

  selectHero(hero: string) {
    this.dataService.updateSelectedHero(hero);
  }

  selectArtifact(artifact: string) {
    this.dataService.updateSelectedArtifact(artifact);
  }

  filterHeroes() {
    this.filteredHeroes = this.heroes.filter((hero) => {
      const heroName = this.translationPipe.transform(hero[0], 'heroes', this.languageService.language.value).toLowerCase();
      const searchValue = this.heroFilterControl.value?.toLowerCase() || '';
      if (searchValue) {
        return heroName.includes(searchValue) || _.get(this.languageService.translationDict.nicknames, hero[0], '').includes(searchValue)
      } else {
        return true;
      }
    })
  }

  filterArtifacts() {
    this.filteredArtifacts = this.artifacts.filter((artifact) => {
      const artifactName = this.translationPipe.transform(artifact[0], 'artifacts', this.languageService.language.value).toLowerCase();
      const searchValue = this.artifactFilterControl.value?.toLowerCase() || '';
      if (searchValue) {
        return artifactName.includes(searchValue) || _.get(this.languageService.translationDict.nicknames, artifact[0], '').includes(searchValue)
      } else {
        return true;
      }
    })
  }

}
