import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
import { DoT, Skill } from 'src/app/models/skill';
import { MatDialog } from '@angular/material/dialog';
import { CompareSaveComponent } from '../compare-save/compare-save.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { CompareComponent } from '../compare/compare.component';
import { DamageGraphComponent } from '../damage-graph/damage-graph.component';
import { debounce } from 'src/app/utils/utils';
import { DefensePreset, ReductionPreset, TargetPresetGroups, TargetReductionPresetGroups } from 'src/app/models/target-presets';

@Component({
  selector: 'app-damage-calculator',
  templateUrl: './damage-calculator.component.html',
  styleUrls: ['./damage-calculator.component.scss'],
  animations: [
    trigger('collapseAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('0.125s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('0.125s ease-in',
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class DamageCalculatorComponent implements OnInit, OnDestroy {

  // @ViewChild('attackSlider') attackSlider: SlideInputComponent | null = null;
  // @ViewChild('critDamageSlider') critDamageSlider: SlideInputComponent | null = null;

  // @ViewChild('targetDefenseSlider') targetDefenseSlider: SlideInputComponent | null = null;
  // @ViewChild('targetDefenseIncreaseSlider') targetDefenseIncreaseSlider: SlideInputComponent | null = null;
  // @ViewChild('damageReductionSlider') damageReductionSlider: SlideInputComponent | null = null;
  // @ViewChild('damageTransferSlider') damageTransferSlider: SlideInputComponent | null = null;

  @ViewChildren('slideInput') slideInputs: QueryList<SlideInputComponent> = new QueryList();


  private damageGraph: DamageGraphComponent | null = null;
  @ViewChild('damageGraph') set content(content: DamageGraphComponent) {
    if(content) {
        this.damageGraph = content;
    }
 }

  formDefaults = FormDefaults;

  damageSubscription: Subscription;
  heroSearchSubscription: Subscription;
  artifactSearchSubscription: Subscription;
  attackPresetSubscription: Subscription;
  reductionPresetSubscription: Subscription;
  targetPresetSubscription: Subscription;
  reductionPresetSearchSubscription: Subscription;
  targetPresetSearchSubscription: Subscription;
  currentArtifactSubscription: Subscription;
  currentHeroSubscription: Subscription;

  DismissibleColorOption = DismissibleColorOption;
  
  displayedColumns: string[] = ['skill', 'crit', 'crush', 'normal', 'miss']
  damageData = new MatTableDataSource<DamageRow>() //DamageRow[] = [];

  stackingSets: string[] = [];

  molagoraModifiers: Record<string, number> = {}
  queuedQueryParams: Record<string, string> | null = null;

  heroDots: DoT[] = [];
  dotDamages = {'bleed': 0, 'bomb': 0, 'burn': 0};
  artifactDamage = 0;
  inputDefaultOverrides: Record<string, number> = {};

  barriers: {label: string, value: number}[]  = []

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
  // controls for artifact selection
  public artifactControl: FormControl<string | null>;
  public artifactFilterControl: FormControl<string | null>;

  // All attack preset entries
  attackPresets: [string, AttackPreset][] = Object.entries(AttackPresets);
  // controls for preset selection
  public attackPresetControl: FormControl<string | null>;

  // All reduction preset entries
  reductionPresetGroups: [string, ReductionPreset[]][] = Object.entries(TargetReductionPresetGroups);
  filteredReductionPresetGroups: [string, ReductionPreset[]][] = Object.entries(TargetReductionPresetGroups);
  // controls for preset selection
  public reductionPresetControl: FormControl<ReductionPreset | null>;
  public reductionPresetFilterControl: FormControl<string | null>;

  // All target preset entries
  targetPresetGroups: [string, DefensePreset[]][] = Object.entries(TargetPresetGroups);
  filteredTargetPresetGroups: [string, DefensePreset[]][] = Object.entries(TargetPresetGroups);
  // controls for preset selection
  public targetPresetControl: FormControl<DefensePreset | null>;
  public targetPresetFilterControl: FormControl<string | null>;

  translationPipe: TranslationPipe;

  collapsed = false;
  savedBuildsCount = 0;
  showGraph = false;
  loading = true;
  
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
    public dataService: DataService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queuedQueryParams = params;
      if (!this.loading) {
        this.loadQueryParams();
      }
    })

    this.translationPipe = new TranslationPipe(this.languageService);
    this.heroControl = new FormControl<string | null>(this.dataService.currentHeroID.value)
    this.heroFilterControl = new FormControl<string | null>('')
    
    this.artifactControl = new FormControl<string | null>(this.dataService.currentArtifactID.value)
    this.artifactFilterControl = new FormControl<string | null>('')

    this.attackPresetControl = new FormControl<string | null>(AttackPresets.manual.id)

    this.targetPresetControl = new FormControl(TargetPresetGroups.default[0])
    this.targetPresetFilterControl = new FormControl('')

    this.reductionPresetControl = new FormControl(TargetReductionPresetGroups.default[0])
    this.reductionPresetFilterControl = new FormControl('')


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

    this.reductionPresetSearchSubscription = this.reductionPresetFilterControl.valueChanges
      .subscribe(() => {
        this.filterReductionPresets();
    });

    this.targetPresetSearchSubscription = this.targetPresetFilterControl.valueChanges
      .subscribe(() => {
        this.filterTargetPresets();
    });

    this.attackPresetSubscription = this.attackPresetControl.valueChanges
      .subscribe(() => {
        const preset = AttackPresets[this.attackPresetControl.value || 'manual']
        const attackSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('attack', 'form', this.languageService.language.value))[0]
        if (preset.attack && attackSlider) {
          attackSlider.overrideValue(preset.attack);
        }
        const critDamageSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('critDamage', 'form', this.languageService.language.value))[0]
        if (preset.critDamage && critDamageSlider) {
          critDamageSlider.overrideValue(preset.critDamage);
        }
    });

    this.currentArtifactSubscription = this.dataService.currentArtifactID.subscribe((id) => {
      this.artifactControl.setValue(id);
      this.updateFormInputs();
    })

    this.currentHeroSubscription = this.dataService.currentHero.subscribe(() => {
      this.updateFormInputs();
      this.refreshCompareBadge();
    })

    this.targetPresetSubscription = this.targetPresetControl.valueChanges
      .subscribe(() => {
        if (this.targetPresetControl.value) {
          this.inputChange('defensePreset', this.targetPresetControl.value);
        }

        const targetDefenseSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('defense', 'form', this.languageService.language.value))[0]
        console.log(this.slideInputs)
        if (this.targetPresetControl.value?.defense && targetDefenseSlider) {
          targetDefenseSlider.overrideValue(this.targetPresetControl.value.defense);
        }
        if (this.targetPresetControl.value?.hp) {
          const targetMaxHPSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('targetMaxHP', 'form', this.languageService.language.value))[0]
          targetMaxHPSlider?.overrideValue(this.targetPresetControl.value.hp);
          this.damageGraph?.setOneshotHP(this.targetPresetControl.value.hp);
          this.inputValues.targetMaxHP = this.targetPresetControl.value.hp;
          this.inputDefaultOverrides['targetMaxHP'] = this.targetPresetControl.value.hp;
        }
    });

    this.reductionPresetSubscription = this.reductionPresetControl.valueChanges
      .subscribe(() => {
        if (this.reductionPresetControl.value) {
          this.inputChange('reductionPreset', this.reductionPresetControl.value);
        }

        const damageReductionSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('damageReduction', 'form', this.languageService.language.value))[0]
        if (this.reductionPresetControl.value?.damageReduction && damageReductionSlider) {
          damageReductionSlider.overrideValue(this.reductionPresetControl.value.damageReduction)
        } else if (this.reductionPresetControl.value?.id !== 'manual') {
          damageReductionSlider?.overrideValue(0)
        }

        const damageTransferSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('damageTransfer', 'form', this.languageService.language.value))[0]
        if (this.reductionPresetControl.value?.damageTransfer && damageTransferSlider) {
          damageTransferSlider.overrideValue(this.reductionPresetControl.value.damageTransfer)
        } else if (this.reductionPresetControl.value?.id !== 'manual') {
          damageTransferSlider?.overrideValue(0)
        }

        const targetDefenseIncreaseSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('defenseIncrease', 'form', this.languageService.language.value))[0]
        if (this.reductionPresetControl.value?.defenseIncrease && targetDefenseIncreaseSlider) {
          targetDefenseIncreaseSlider.overrideValue(this.reductionPresetControl.value.defenseIncrease)
        } else if (this.reductionPresetControl.value?.id !== 'manual') {
          targetDefenseIncreaseSlider?.overrideValue(0)
        }
        
    });
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
  inputChange(field: string, value: number | boolean | DefensePreset | ReductionPreset) {
    if (this.loading && field === 'molagoras3') {
      this.loading = false;
      this.loadQueryParams();
    }
    if (field.endsWith('SetStack') && (!this.stackingSets.includes(field) || !value)) {
      if (value) {
        this.stackingSets.push(field);
      } else {
        this.stackingSets = this.stackingSets.filter(set => field !== set)
      }
    } else if (field === 'targetMaxHP') {
      this.damageGraph?.setOneshotHP(value as number);
    } else if (field === 'targetDefense' && this.targetPresetControl.value?.defense !== value) {
      this.targetPresetControl.setValue(TargetPresetGroups.default[0])
    } else if (field === 'damageReduction' && value !== 0
               && this.reductionPresetControl.value?.id !== 'manual' && this.reductionPresetControl.value?.damageReduction !== value) {
      this.reductionPresetControl.setValue(TargetReductionPresetGroups.default[0])
    } else if (field === 'targetDefenseIncrease' && value !== 0
              && this.reductionPresetControl.value?.id !== 'manual' && this.reductionPresetControl.value?.defenseIncrease !== value) {
      this.reductionPresetControl.setValue(TargetReductionPresetGroups.default[0])
    } else if (field === 'damageTransfer' && value !== 0
               && this.reductionPresetControl.value?.id !== 'manual' && this.reductionPresetControl.value?.damageTransfer !== value) {
      this.reductionPresetControl.setValue(TargetReductionPresetGroups.default[0])
    } else if (field.startsWith('molagora')) {
      let modifier = 0;
      for (let i = 0; i < (value as number); i++) {
        modifier += this.hero.skills[field.slice(-2)].enhance[i] * 100;
      }
      // TODO: better solution if have a chance
      Promise.resolve().then(() => {
        this.molagoraModifiers[field] = modifier;
      })
    }

    this.dataService.updateDamageInputValues({[field]: value});
  
    // Check if attack preset needs to be reset
    if (this.attackPresetControl.value !== AttackPresets.manual.id) {
      if (_.get(AttackPresets[this.attackPresetControl.value || AttackPresets.manual.id], field, null) !== value) {
        this.attackPresetControl.setValue(AttackPresets.manual.id);
      }
    }
    this.updateDamageBlockHeader();

    debounce('calculateChart', () => {this.damageGraph?.calculateChart()}, undefined, 150);
  }

  selectHero(hero: string) {
    this.dataService.updateSelectedHero(hero);
    this.updateDamageBlockHeader();
  }

  selectArtifact(artifact: string) {
    this.dataService.updateSelectedArtifact(artifact);
    this.updateFormInputs();
    this.updateDamageBlockHeader();
  }

  updateDamageBlockHeader() { 
    this.updateDots();
    this.updateBarriers();
    this.artifactDamage = this.damageService.getArtifactDamage();
  }

  // TODO: this workaround to suppress the changed after checked errors is sloppy, but there is no negative effect whatsoever
  // that this error is pointing out so rather than wasting more time debugging this, I'm just gonna use this workaround.
  updateDots() {
    Promise.resolve().then(() => {
      this.heroDots = [...(new Set(this.hero.getDoT(this.artifact)))];
      this.dotDamages['bleed'] = Math.round(this.damageService.getDotDamage(new Skill({}), DoT.bleed));
      this.dotDamages['bomb'] = Math.round(this.damageService.getDotDamage(new Skill({}), DoT.bomb));
      this.dotDamages['burn'] = Math.round(this.damageService.getDotDamage(new Skill({}), DoT.burn));
    });
  }

  updateBarriers() {
    Promise.resolve().then(() => this.barriers = this.damageService.getBarriers());
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

  filterReductionPresets() {
    this.filteredReductionPresetGroups = [] 

    for (const reductionPresetGroup of this.reductionPresetGroups) {
      const groupResults = reductionPresetGroup[1].filter(reduction => {
        return this.translationPipe.transform(reduction.id, 'form', this.languageService.language.value).toLowerCase().replace(/ /g, '').includes((this.reductionPresetFilterControl.value?.toLowerCase() || ''));
      });

      if (groupResults.length) {
        this.filteredReductionPresetGroups.push([reductionPresetGroup[0], groupResults]);
      }
    }
  }

  filterTargetPresets() {
    this.filteredTargetPresetGroups = []

    for (const targetPresetGroup of this.targetPresetGroups) {
      const groupResults = targetPresetGroup[1].filter(target => {
        return this.translationPipe.transform(target.id, 'form', this.languageService.language.value).toLowerCase().replace(/ /g, '').includes((this.targetPresetFilterControl.value?.toLowerCase() || ''));
      });

      if (groupResults.length) {
        this.filteredTargetPresetGroups.push([targetPresetGroup[0], groupResults]);
      }
    }
  }

  saveBuild() {
    const artifactName = this.translationPipe.transform(this.artifactControl.value as string, 'artifacts', this.languageService.language.value)
    const dialogRef = this.dialog.open(CompareSaveComponent, {
      height: '14.375rem',
      width: '50rem',
      data: {buildName: `${Math.round(this.inputValues.attack)}⚔️ x ${Math.round(this.inputValues.critDamage)}% (${artifactName}) vs ${Math.round(this.dataService.currentTarget.getDefense(this.inputValues, this.damageService.getGlobalDefenseMult()))}🛡️`}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const builds = localStorage.getItem('heroes');
        const allSets = builds ? JSON.parse(builds as string) : {};
        const heroSets = allSets[this.heroControl.value as string] || {};
        const saveData: Record<string, Record<string, number>> = {}
        for (const damage of this.damageData.data) {
          saveData[damage.skill as string] = {'crit': damage.crit || 0, 'normal': damage.normal || 0, 'miss': damage.miss || 0}
        }
        heroSets[result] = saveData;
        allSets[this.heroControl.value as string] = heroSets;
        localStorage.setItem('heroes', JSON.stringify(allSets));
        // window.dataLayer.push({
        //   'event': 'save_hero',
        //   'hero': this.heroControl.value
        // });
      }
      this.refreshCompareBadge();
    });
  }

  compareBuilds() {
    const builds = localStorage.getItem('heroes');
    const allSets = builds ? JSON.parse(builds as string) : {};
    const heroSets = allSets[this.heroControl.value as string] || {};
  
    const dialogRef = this.dialog.open(CompareComponent, {
      // height: '14.375rem',
      width: '50rem',
      data: heroSets
    })

    dialogRef.afterClosed().subscribe(removeBuilds => {
      if (removeBuilds) {
        delete allSets[this.heroControl.value as string];
        localStorage.setItem('heroes', JSON.stringify(allSets));
      }
      this.refreshCompareBadge();
    });
  }

  refreshCompareBadge() {
    const builds = localStorage.getItem('heroes');
    const allSets = builds ? JSON.parse(builds as string)[this.heroControl.value as string] : null;

    this.savedBuildsCount = allSets ? Object.keys(allSets).length : 0;
  }

  toggleTable() {
    this.collapsed = !this.collapsed;
  }

  toggleGraph() {
    this.showGraph = !this.showGraph;

    // to execute after the graph is rendered
    setTimeout(() => {
      if (this.showGraph) {
        this.damageGraph?.calculateChart();
      }
    }, 1);
    
  }

  async loadQueryParams() {
    console.log(this.queuedQueryParams)
    if (!this.loading && this.queuedQueryParams) {
      const paramInputs: Record<string, boolean | number | string> = {};
      let paramArtifact = '';
      // setvalue on sliders
      for (const param of Object.entries(this.queuedQueryParams)) {
        if (param[1].toLowerCase() === 'true') {
          paramInputs[param[0]] = true;
        } else if (param[1].toLowerCase() === 'false') {
          paramInputs[param[0]] = false;
        } else if (!isNaN(Number(param[1]))) {
          paramInputs[param[0]] = Number(param[1]);
        } else if (['defensePreset', 'reductionPreset'].includes(param[0])) {
          paramInputs[param[0]] = param[1];
        } else if (param[0].toLowerCase() === 'hero' && Object.keys(Heroes).includes(param[1])) {
          await Promise.resolve()
          this.selectHero(param[1])
          this.heroControl.setValue(param[1])
        } else if (param[0].toLowerCase() === 'artifact' && Object.keys(Artifacts).includes(param[1])) {
          paramArtifact = param[1];
        }
      }

      if (paramArtifact
          && (Artifacts[paramArtifact].exclusive === this.hero.class || Artifacts[paramArtifact].heroExclusive.includes(this.heroID))) {
        this.selectArtifact(paramArtifact)
      }
  
      this.dataService.updateDamageInputValues(paramInputs);
    }
    
  }
}
