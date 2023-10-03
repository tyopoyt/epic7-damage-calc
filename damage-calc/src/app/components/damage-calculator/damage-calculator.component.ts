import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { AttackPreset, AttackPresets } from 'src/app/models/attack-presets';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';
import { DismissibleColorOption } from '../ui-elements/dismissible/dismissible.component';
import { DamageService } from 'src/app/services/damage.service';
import { DataService } from 'src/app/services/data.service';
import { Heroes } from 'src/assets/data/heroes';
import { Hero, HeroElement } from 'src/app/models/hero';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as _ from 'lodash-es';
import { Artifacts } from 'src/assets/data/artifacts';
import { Artifact } from 'src/app/models/artifact';
import { SlideInputComponent } from '../ui-elements/slide-input/slide-input.component';

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

  @ViewChild('attackSlider') attackSlider: SlideInputComponent | null = null;
  @ViewChild('critDamageSlider') critDamageSlider: SlideInputComponent | null = null;

  heroSearchSubscription: Subscription;
  artifactSearchSubscription: Subscription;
  attackPresetSubscription: Subscription;
  currentArtifactSubscription: Subscription;

  DismissibleColorOption = DismissibleColorOption;
  
  displayedColumns: string[] = ['skill', 'crit', 'crush', 'normal', 'miss']
  damages: DamageRow[] = [];

  // All hero entries
  heroes: [string, Hero][] = Object.entries(Heroes);
  // Hero entries displayed in select box after a search filter
  filteredHeroes: [string, Hero][] = _.cloneDeep(this.heroes);
  // controls for hero selection
  public heroControl: FormControl<string | null>;
  public heroFilterControl: FormControl<string | null>;

  // All artifact entries
  artifacts: [string, Artifact][] = Object.entries(Artifacts);
  // Hero entries displayed in select box after a search filter
  filteredArtifacts: [string, Artifact][] = _.cloneDeep(this.artifacts);
  // controls for hero selection
  public artifactControl: FormControl<string | null>;
  public artifactFilterControl: FormControl<string | null>;

  // All attack preset entries
  attackPresets: [string, AttackPreset][] = Object.entries(AttackPresets);
  // controls for hero selection
  public attackPresetControl: FormControl<string | null>;

  translationPipe: TranslationPipe;
  
  get inputValues() {
    return this.dataService.damageInputValues;
  }

  get hero() {
    return this.dataService.currentHero.value;
  }

  get heroID() {
    return this.dataService.currentHeroID.value;
  }

  get artifact() {
    return this.dataService.currentArtifact.value;
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
    this.heroControl = new FormControl<string | null>(this.dataService.currentHeroID.value)
    this.heroFilterControl = new FormControl<string | null>('')
    
    this.artifactControl = new FormControl<string | null>(this.dataService.currentArtifactID.value)
    this.artifactFilterControl = new FormControl<string | null>('')

    this.attackPresetControl = new FormControl<string | null>(AttackPresets.manual.id)

    this.heroSearchSubscription = this.heroFilterControl.valueChanges
      .subscribe(() => {
        this.filterHeroes();
    });

    this.artifactSearchSubscription = this.artifactFilterControl.valueChanges
      .subscribe(() => {
        this.filterArtifacts();
    });

    this.attackPresetSubscription = this.attackPresetControl.valueChanges
      .subscribe(() => {
        const preset = AttackPresets[this.attackPresetControl.value || 'manual']
        if (preset.attack && this.attackSlider) {
          this.attackSlider.overrideValue(preset.attack);
        }
        if (preset.critDamage && this.critDamageSlider) {
          this.critDamageSlider.overrideValue(preset.critDamage);
        }
    });

    this.currentArtifactSubscription = this.dataService.currentArtifactID.subscribe((id) => {
      this.artifactControl.setValue(id)
    })
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
    if (this.artifactSearchSubscription) {
      this.artifactSearchSubscription.unsubscribe();
    }
    if (this.attackPresetSubscription) {
      this.attackPresetSubscription.unsubscribe();
    }
    if (this.currentArtifactSubscription) {
      this.currentArtifactSubscription.unsubscribe();
    }
  }

  // TODO: don't call this initially for every input, only once
  inputChange(field: string, value: number | boolean) {
    this.dataService.updateDamageInputValues({[field]: value});
  
    // Check if attack preset needs to be reset
    if (this.attackPresetControl.value !== AttackPresets.manual.id) {
      if (_.get(AttackPresets[this.attackPresetControl.value || AttackPresets.manual.id], field, null) !== value) {
        this.attackPresetControl.setValue(AttackPresets.manual.id);
      }
    }
  }

  selectHero(hero: string) {
    this.dataService.updateSelectedHero(hero);
  }

  selectArtifact(artifact: string) {
    this.dataService.updateSelectedArtifact(artifact);
  }

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

  heroMatches(heroName: string, searchTerm: string): boolean {
    const scrubbed = searchTerm.replace(/ /g,'');
    const heroLocalizedName = this.translationPipe.transform(heroName, 'heroes', this.languageService.language.value).toLowerCase();
    return heroLocalizedName.replace(/ /g,'').includes(scrubbed)
           || _.get(this.languageService.translationDict.nicknames, heroName, '').replace(/ /g,'').includes(scrubbed)
           || Heroes[heroName].element == scrubbed
           || Heroes[heroName].class == scrubbed;
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
