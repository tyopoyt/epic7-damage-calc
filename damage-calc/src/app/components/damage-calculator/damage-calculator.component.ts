import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { AttackPreset, AttackPresets } from 'src/app/models/attack-presets';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';
import { DismissibleColorOption } from '../ui-elements/dismissible/dismissible.component';
import { DamageRow, DamageService } from 'src/app/services/damage.service';
import { DataService } from 'src/app/services/data.service';
import { Heroes } from 'src/assets/data/heroes';
import { Hero } from 'src/app/models/hero';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as _ from 'lodash-es';
import { Artifacts } from 'src/assets/data/artifacts';
import { Artifact } from 'src/app/models/artifact';
import { SlideInputComponent } from '../ui-elements/slide-input/slide-input.component';
import { DamageFormData, FormDefaults } from 'src/app/models/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DoT } from 'src/app/models/skill';

@Component({
  selector: 'app-damage-calculator',
  templateUrl: './damage-calculator.component.html',
  styleUrls: ['./damage-calculator.component.scss']
})
export class DamageCalculatorComponent implements OnInit, OnDestroy {

  @ViewChild('attackSlider') attackSlider: SlideInputComponent | null = null;
  @ViewChild('critDamageSlider') critDamageSlider: SlideInputComponent | null = null;

  formDefaults = FormDefaults;

  damageSubscription: Subscription;
  heroSearchSubscription: Subscription;
  artifactSearchSubscription: Subscription;
  attackPresetSubscription: Subscription;
  currentArtifactSubscription: Subscription;
  currentHeroSubscription: Subscription;

  DismissibleColorOption = DismissibleColorOption;
  
  displayedColumns: string[] = ['skill', 'crit', 'crush', 'normal', 'miss']
  damageData = new MatTableDataSource<DamageRow>() //DamageRow[] = [];

  heroSpecificNumberInputs: string[] = [];
  heroSpecificBooleanInputs: string[] = [];
  heroSpecificMaximums: Record<string, number> = {};

  artifactSpecificNumberInputs: string[] = [];
  artifactSpecificBooleanInputs: string[] = [];
  artifactSpecificMaximums: Record<string, number> = {};

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

    this.damageSubscription = this.damageService.damages.subscribe((skillDamages: DamageRow[]) => {
      this.damageData.data = skillDamages;
    });

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
      this.artifactControl.setValue(id);
      this.updateFormInputs();
    })

    this.currentHeroSubscription = this.dataService.currentHero.subscribe(() => {
      this.updateFormInputs();
    })
  }
  
  ngOnInit() {
    const langParam = this.route.snapshot.paramMap.get('lang') || 'us';
    this.languageService.setLanguage(Languages[langParam]);
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
    if (this.currentHeroSubscription) {
      this.currentHeroSubscription.unsubscribe();
    }
  }

  updateFormInputs() {
    console.log(this.artifact)
    this.heroSpecificBooleanInputs = this.hero.heroSpecific.filter((input) => {
      return typeof this.inputValues[input as keyof DamageFormData] === 'boolean';
    });

    this.artifactSpecificBooleanInputs = this.artifact.artifactSpecific.filter((input) => {
      return typeof this.inputValues[input as keyof DamageFormData] === 'boolean';
    });

    this.heroSpecificNumberInputs = this.hero.heroSpecific.filter((input) => {
      return typeof this.inputValues[input as keyof DamageFormData] === 'number';
    });

    this.artifactSpecificNumberInputs = this.artifact.artifactSpecific.filter((input) => {
      return typeof this.inputValues[input as keyof DamageFormData] === 'number';
    });

    this.addAddtionalBooleanInputs();
  }

  addAddtionalBooleanInputs() {
    this.heroSpecificNumberInputs.forEach(input => {
      if (this.dataService.buffModifiedSpecific.includes(input)) {
        this.heroSpecificBooleanInputs.push(`${input}Up`);
        this.heroSpecificBooleanInputs.push(`${input}Down`);

        if (input === 'targetAttack') {
          this.heroSpecificBooleanInputs.push(`${input}UpGreat`)
        }

        if (input === 'targetSpeed') {
          this.heroSpecificBooleanInputs.push('targetEnraged')
        }
      }
    })

    this.artifactSpecificNumberInputs.forEach(input => {
      if (this.dataService.buffModifiedSpecific.includes(input)) {
        this.artifactSpecificBooleanInputs.push(`${input}Up`);
        this.artifactSpecificBooleanInputs.push(`${input}Down`);

        if (input === 'targetAttack') {
          this.artifactSpecificBooleanInputs.push(`${input}UpGreat`)
        }

        if (input === 'targetSpeed') {
          this.artifactSpecificBooleanInputs.push('targetEnraged')
        }
      }
    })    

    if (this.heroSpecificNumberInputs.includes('casterMaxHP') && this.dataService.HPIncreaseArtifacts.includes(this.dataService.currentArtifactID.value)) {
      this.heroSpecificBooleanInputs.push('inBattleHP');
    }
    if (this.artifactSpecificNumberInputs.includes('casterMaxHP') && this.dataService.HPIncreaseArtifacts.includes(this.dataService.currentArtifactID.value)) {
      this.artifactSpecificBooleanInputs.push('inBattleHP');
    }

    // TODO: Default to checked for Beehoo and artifact specific (are hero ones working?) with default true
    if (this.hero.getDoT(this.artifact).includes(DoT.burn)) {
      this.heroSpecificBooleanInputs.push('beehooPassive');
    }
    console.log(this.heroSpecificBooleanInputs, this.heroSpecificNumberInputs, this.artifactSpecificBooleanInputs, this.artifactSpecificNumberInputs)
    this.dedupeForm();
  }

  dedupeForm() {
    this.heroSpecificBooleanInputs = [...(new Set(this.heroSpecificBooleanInputs))];
    this.artifactSpecificBooleanInputs = [...(new Set(this.artifactSpecificBooleanInputs))];

    this.artifactSpecificBooleanInputs.filter(input => {
      return !this.heroSpecificBooleanInputs.includes(input);
    })

    this.artifactSpecificNumberInputs.filter(input => {
      return !this.heroSpecificNumberInputs.includes(input);
    })
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
    this.updateFormInputs();
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
