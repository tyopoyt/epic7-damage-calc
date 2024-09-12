import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { AttackPreset, AttackPresets } from 'src/app/models/attack-presets';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';
import { DismissibleColorOption } from '../ui-elements/dismissible/dismissible.component';
import { DamageRow, DamageService } from 'src/app/services/damage.service';
import { DataService } from 'src/app/services/data.service';
import { Heroes } from 'src/assets/data/heroes';
import { Hero, HeroClass } from 'src/app/models/hero';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as _ from 'lodash-es';
import { Artifacts } from 'src/assets/data/artifacts';
import { Artifact } from 'src/app/models/artifact';
import { SlideInputComponent } from '../ui-elements/slide-input/slide-input.component';
import { DamageFormData, FormDefaults } from 'src/app/models/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DoT, DoTSkill } from 'src/app/models/skill';
import { MatDialog } from '@angular/material/dialog';
import { CompareSaveComponent } from '../compare-save/compare-save.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { CompareComponent, MultiCompareData } from '../compare/compare.component';
import { DamageGraphComponent } from '../damage-graph/damage-graph.component';
import { debounce, delay } from 'src/app/utils/utils';
import { DefensePreset, ReductionPreset, TargetPresetGroups, TargetReductionPresetGroups } from 'src/app/models/target-presets';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

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
  // Get all slide inputs as ViewChildren
  @ViewChildren('slideInput') slideInputs: QueryList<SlideInputComponent> = new QueryList();

  // Damage graph is added and removed dynamically so handle ViewChild like this
  private damageGraph: DamageGraphComponent | null = null;
  @ViewChild('damageGraph') set content(content: DamageGraphComponent) {
    if (content) {
        this.damageGraph = content;
    }
  }

  // For form =======================================================
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
  allReductionPresets: ReductionPreset[];
  // controls for preset selection
  public reductionPresetControl: FormControl<ReductionPreset | null>;
  public reductionPresetFilterControl: FormControl<string | null>;

  // All target preset entries
  targetPresetGroups: [string, DefensePreset[]][] = Object.entries(TargetPresetGroups);
  filteredTargetPresetGroups: [string, DefensePreset[]][] = Object.entries(TargetPresetGroups);
  // controls for preset selection
  public targetPresetControl: FormControl<DefensePreset | null>;
  public targetPresetFilterControl: FormControl<string | null>;
  allTargetPresets: DefensePreset[];


  formDefaults = FormDefaults;
  stackingSets: string[] = [];
  molagoraModifiers: Record<string, number> = {}

  heroSpecificNumberInputs: string[] = [];
  heroSpecificBooleanInputs: string[] = [];
  heroSpecificMaximums: Record<string, number> = {};

  artifactSpecificNumberInputs: string[] = [];
  artifactSpecificBooleanInputs: string[] = [];
  artifactSpecificMaximums: Record<string, number> = {};
  // ====================================================================

  // For damage block ++++++++++++++++++++++++++++++++++++++++++++++++++++++
  displayedColumns: string[] = ['skill', 'crit', 'crush', 'normal', 'miss']
  damageData = new MatTableDataSource<DamageRow>();
  heroDots: DoT[] = [];
  dotDamages = {'bleed': 0, 'bomb': 0, 'burn': 0};
  artifactDamage = 0;
  barriers: {label: string, value: number}[]  = []
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // For graph
  inputDefaultOverrides: Record<string, number> = {};

  // Misc.
  // For skill multiplier popup
  // TODO: un-anyify this
  skillMultiplierTips: Record<string, any> = {}

  // For banner colors
  DismissibleColorOption = DismissibleColorOption;
  
  // For queryparam management
  queuedQueryParams: Record<string, string> | null = null;

  // State management =================================================
  collapsed = false;
  savedBuildsCount = 0;
  showGraph = false;
  loading = true;
  paramsLoading = true;
  shareButtonText = 'share';
  // ==================================================================

  // BehaviorSubject subscriptions ------------------------------------
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
  // ------------------------------------------------------------------

  // For ts logic
  translationPipe: TranslationPipe;
  // TODO: ideally fix it so on intial load each slide only emits once
  firstRoundLoaded = false;
  
  // Getters
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

  get language() {
    return this.languageService.language.value;
  }

  constructor (
    private route: ActivatedRoute,
    public languageService: LanguageService,
    public screenService: ScreenService,
    private damageService: DamageService,
    public dataService: DataService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private gtmService: GoogleTagManagerService
  ) {
    // Load in queryparams
    this.activatedRoute.queryParams.subscribe(params => {
      this.queuedQueryParams = params;
      if (!this.loading) {
        this.loadQueryParams();
      }
    })

    this.translationPipe = new TranslationPipe(this.languageService);

    // Initialize controls
    this.heroControl = new FormControl<string | null>(this.dataService.currentHeroID.value)
    this.heroFilterControl = new FormControl<string | null>('')
    
    this.artifactControl = new FormControl<string | null>(this.dataService.currentArtifactID.value)
    this.artifactFilterControl = new FormControl<string | null>('')

    this.attackPresetControl = new FormControl<string | null>(AttackPresets.manual.id)

    this.targetPresetControl = new FormControl(TargetPresetGroups.default[0])
    this.targetPresetFilterControl = new FormControl('')

    this.reductionPresetControl = new FormControl(TargetReductionPresetGroups.default[0])
    this.reductionPresetFilterControl = new FormControl('')

    // Subscribe to control changes
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
        const attackSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('attack', 'form', this.language))[0]
        if (preset.attack && attackSlider) {
          attackSlider.overrideValue(preset.attack);
        }
        const critDamageSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('critDamage', 'form', this.language))[0]
        if (preset.critDamage && critDamageSlider) {
          critDamageSlider.overrideValue(preset.critDamage);
        }
    });

    this.currentArtifactSubscription = this.dataService.currentArtifactID.subscribe((id) => {
      this.artifactControl.setValue(id);
      this.updateFormInputs();
    })

    this.currentHeroSubscription = this.dataService.currentHero.subscribe(() => {
      this.skillMultiplierTips = {};
      this.updateFormInputs();
      this.refreshCompareBadge();
    })

    this.targetPresetSubscription = this.targetPresetControl.valueChanges
      .subscribe(() => {
        this.selectTarget();
    });

    this.reductionPresetSubscription = this.reductionPresetControl.valueChanges
      .subscribe(() => {
        this.selectReduction();        
    });

    // Set up reduction and target presets
    this.allReductionPresets = [];
    for (const group of this.reductionPresetGroups) {
      this.allReductionPresets = this.allReductionPresets.concat(group[1])
    }

    this.allTargetPresets = [];

    this.allTargetPresets = [];
    for (const group of this.targetPresetGroups) {
      this.allTargetPresets = this.allTargetPresets.concat(group[1])
    }

  }
  
  ngOnInit() {
    // initialize language with param from url
    const langParam = this.route.snapshot.paramMap.get('lang') || 'us';
    this.languageService.setLanguage(Languages[langParam]);

    setTimeout(() => {
      this.paramsLoading = false;
    }, 300);
  }

  ngOnDestroy(): void {
    // Unsubscribe active subscriptions
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
    if (this.damageSubscription) {
      this.damageSubscription.unsubscribe();
    }
    if (this.reductionPresetSubscription) {
      this.reductionPresetSubscription.unsubscribe();
    }
    if (this.targetPresetSubscription) {
      this.targetPresetSubscription.unsubscribe();
    }
    if (this.reductionPresetSearchSubscription) {
      this.reductionPresetSearchSubscription.unsubscribe();
    }
    if (this.targetPresetSearchSubscription) {
      this.targetPresetSearchSubscription.unsubscribe();
    }
  }

  // Update for with inputs needed for hero/artifact
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

    this.heroSpecificMaximums = this.hero.heroSpecificMaximums;
    this.artifactSpecificMaximums = this.artifact.artifactSpecificMaximums;

    this.addAddtionalBooleanInputs();
  }

  // Add additional boolean inputs needed based on the hero and artifact specific number inputs
  addAddtionalBooleanInputs() {
    // Extra checkboxes for hero
    this.heroSpecificNumberInputs.forEach(input => {
      if (this.dataService.buffModifiedSpecific.includes(input)) {
        this.heroSpecificBooleanInputs.push(`${input}Up`);
        this.heroSpecificBooleanInputs.push(`${input}Down`);

        if (input === 'targetAttack') {
          this.heroSpecificBooleanInputs.push('targetAttackUpGreat')
          this.heroSpecificBooleanInputs.push('targetEnraged')
        } else if (input === 'highestAllyAttack') {
          this.heroSpecificBooleanInputs.push('highestAllyAttackUpGreat')
        } else if (input === 'targetSpeed') {
          this.heroSpecificBooleanInputs.push('targetEnraged')
        }
      }
    })

    // Extra checkboxes for artifact
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

    // This one is only used for Prayer of solitude for now
    // TODO: can this logic just check the max hp field on the artifact?
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

  // Ensure inputs needed for both hero and artifact aren't duplicated
  dedupeForm() {
    this.heroSpecificBooleanInputs = [...(new Set(this.heroSpecificBooleanInputs))];
    this.artifactSpecificBooleanInputs = [...(new Set(this.artifactSpecificBooleanInputs))];

    this.artifactSpecificBooleanInputs = this.artifactSpecificBooleanInputs.filter(input => {
      return !this.heroSpecificBooleanInputs.includes(input);
    })

    this.artifactSpecificNumberInputs = this.artifactSpecificNumberInputs.filter(input => {
      return !this.heroSpecificNumberInputs.includes(input);
    })

  }

  // Handle user form input
  // TODO: don't call this initially for every input, only once
  inputChange(field: string, value: number | boolean | DefensePreset | ReductionPreset) {
    // TODO: if fixing initial slide input emissions, refactor this logic
    if (this.loading && field === 'molagoras3') {
      if (!this.firstRoundLoaded) {
        this.firstRoundLoaded = true
      } else {
        this.loading = false;
      }
      this.loadQueryParams();
    }

    // Manage set stack sliders
    if (field.endsWith('SetStack') && (!this.stackingSets.includes(field) || !value)) {
      if (value) {
        this.stackingSets.push(field);
      } else {
        this.stackingSets = this.stackingSets.filter(set => field !== set)
      }
    } else if (field === 'targetMaxHP' && !this.paramsLoading) { // Update graph oneshot line if needed
      this.damageGraph?.setOneshotHP(value as number);
    } else if (field === 'targetDefense' && this.targetPresetControl.value?.defense !== value) { // Reset target if needed
      this.targetPresetControl.setValue(TargetPresetGroups.default[0])
    } else if (field === 'damageReduction' && value !== 0 // Reset damage reduction preset if needed
               && this.reductionPresetControl.value?.id !== 'manual' && this.reductionPresetControl.value?.damageReduction !== value) {
      this.reductionPresetControl.setValue(TargetReductionPresetGroups.default[0])
    } else if (field === 'targetDefenseIncrease' && value !== 0
              && this.reductionPresetControl.value?.id !== 'manual' && this.reductionPresetControl.value?.defenseIncrease !== value) {
      this.reductionPresetControl.setValue(TargetReductionPresetGroups.default[0])
    } else if (field === 'damageTransfer' && value !== 0
               && this.reductionPresetControl.value?.id !== 'manual' && this.reductionPresetControl.value?.damageTransfer !== value) {
      this.reductionPresetControl.setValue(TargetReductionPresetGroups.default[0])
    } else if (field.startsWith('molagora')) { // Handle molagora slider
      let modifier = 0;
      for (let i = 0; i < (value as number); i++) {
        modifier += this.hero.skills[field.slice(-2)].enhance[i] * 100;
      }
      // TODO: better solution to changedAfterChecked if have a chance
      Promise.resolve().then(() => {
        this.molagoraModifiers[field] = modifier;
      })
    }

    // Update damage form in data service
    this.dataService.updateDamageInputValues({[field]: value});
  
    // Check if attack preset needs to be reset
    if (this.attackPresetControl.value !== AttackPresets.manual.id) {
      if (_.get(AttackPresets[this.attackPresetControl.value || AttackPresets.manual.id], field, null) !== value) {
        this.attackPresetControl.setValue(AttackPresets.manual.id);
      }
    }

    this.updateDamageBlockHeader();

    // Debounce to avoid rapid unnecessary calculations as inputs are slid
    debounce('calculateChart', () => {this.damageGraph?.calculateChart()}, undefined, 150);
    debounce('updateMultiplierTips', () => {this.updateMultiplierTips()}, undefined, 150)

    if (!this.paramsLoading && window.location.search.length > 0) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    this.shareButtonText = 'share';
  }

  // Update info for skill multiplier popup
  updateMultiplierTips() {
    for (const skill of Object.entries(this.hero.skills)) {
      let multipliers = this.damageService.getModifiers(skill[1], skill[0].endsWith('_soulburn'), skill[0].endsWith('_extra'))
      this.skillMultiplierTips[skill[1].name? skill[1].name : skill[0]] = multipliers;

      if (skill[1].soulburn) {
        multipliers = this.damageService.getModifiers(skill[1], true, skill[0].endsWith('_extra'));
        this.skillMultiplierTips[skill[0] + '_soulburn'] = multipliers;
      }
    }
  }

  // Select a new hero
  // TODO: potentially reset max hp after switching heroes
  // TODO: reset all hero specific after switch?
  selectHero(hero: string) {
    this.gtmService.pushTag({
      'event': 'select_hero',
      'hero': hero
    });
    this.dataService.updateSelectedHero(hero);
    this.updateFormInputs();
    this.dataService.updateDamageInputValues({exclusiveEquipment1: false, exclusiveEquipment2: false, exclusiveEquipment3: false, casterPerception: false, casterEnraged: false, casterHasPossession: false})
    this.updateDamageBlockHeader();
  }

  // Select a new artifact
  selectArtifact(artifact: string) {
    this.dataService.updateSelectedArtifact(artifact);
    this.updateFormInputs();
    this.updateDamageBlockHeader();

    this.gtmService.pushTag({
      'event': 'select_artifact',
      'artifact': artifact,
      'hero': this.heroID
    });
  }

  // Select a new target
  selectTarget(newTarget: DefensePreset | null = null) {
    // To handle queryparams
    if (newTarget) {
      this.targetPresetControl.setValue(newTarget);
    }

    this.gtmService.pushTag({
      'event': 'select_preset_def',
      'def_unit': this.targetPresetControl.value?.id
    });

    if (this.targetPresetControl.value) {
      this.inputChange('defensePreset', this.targetPresetControl.value);
    }

    // Update form values as needed
    const targetDefenseSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('defense', 'form', this.language))[0]
    if (this.targetPresetControl.value?.defense && targetDefenseSlider) {
      targetDefenseSlider.overrideValue(this.targetPresetControl.value.defense);
    }

    if (this.targetPresetControl.value?.hp) {
      const targetMaxHPSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('targetMaxHP', 'form', this.language))[0]
      targetMaxHPSlider?.overrideValue(this.targetPresetControl.value.hp);
      this.damageGraph?.setOneshotHP(this.targetPresetControl.value.hp);
      this.inputValues.targetMaxHP = this.targetPresetControl.value.hp;
      this.inputDefaultOverrides['targetMaxHP'] = this.targetPresetControl.value.hp;
    }
  }

  // Select a new damage reduction preset
  selectReduction(newReduction: ReductionPreset | null = null) {
    // To handle queryparam
    if (newReduction) {
      this.reductionPresetControl.setValue(newReduction);
    }

    this.gtmService.pushTag({
      'event': 'select_preset_dmg_red',
      'dmg_red': this.reductionPresetControl.value?.id
    });

    if (this.reductionPresetControl.value) {
      this.inputChange('reductionPreset', this.reductionPresetControl.value);
    }

    // Update form values as needed
    const damageReductionSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('damageReduction', 'form', this.language))[0]
    if (this.reductionPresetControl.value?.damageReduction && damageReductionSlider) {
      damageReductionSlider.overrideValue(this.reductionPresetControl.value.damageReduction)
    } else if (this.reductionPresetControl.value?.id !== 'manual') {
      damageReductionSlider?.overrideValue(0)
    }

    const damageTransferSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('damageTransfer', 'form', this.language))[0]
    if (this.reductionPresetControl.value?.damageTransfer && damageTransferSlider) {
      damageTransferSlider.overrideValue(this.reductionPresetControl.value.damageTransfer)
    } else if (this.reductionPresetControl.value?.id !== 'manual') {
      damageTransferSlider?.overrideValue(0)
    }

    const targetDefenseIncreaseSlider = this.slideInputs.filter(input => input.label === this.translationPipe.transform('targetDefenseIncrease', 'form', this.language))[0]
    if (this.reductionPresetControl.value?.defenseIncrease && targetDefenseIncreaseSlider) {
      targetDefenseIncreaseSlider.overrideValue(this.reductionPresetControl.value.defenseIncrease)
    } else if (this.reductionPresetControl.value?.id !== 'manual') {
      targetDefenseIncreaseSlider?.overrideValue(0)
    }
  }

  // Update the small info in damamage block header
  updateDamageBlockHeader() { 
    this.updateDots();
    this.updateBarriers();
    this.artifactDamage = this.damageService.getArtifactDamage();
  }

  // Update dot values
  // TODO: this workaround to suppress the changed after checked errors is sloppy, but there is no negative effect whatsoever
  // that this error is pointing out so rather than wasting more time debugging this, I'm just gonna use this workaround.
  updateDots() {
    Promise.resolve().then(() => {
      this.heroDots = [...(new Set(this.hero.getDoT(this.artifact)))];
      this.dotDamages['bleed'] = this.heroDots.includes(DoT.bleed) ? Math.round(this.damageService.getDotDamage(DoTSkill, DoT.bleed)) : 0;
      this.dotDamages['bomb'] = this.heroDots.includes(DoT.bomb) ? Math.round(this.damageService.getDotDamage(DoTSkill, DoT.bomb)) : 0;
      this.dotDamages['burn'] = this.heroDots.includes(DoT.burn) ? Math.round(this.damageService.getDotDamage(DoTSkill, DoT.burn)) : 0;
    });
  }

  // Update barrier values
  updateBarriers() {
    Promise.resolve().then(() => this.barriers = this.damageService.getBarriers());
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

  // Filter artifacts list when user searches, including name and nickname
  filterArtifacts() {
    this.filteredArtifacts = this.artifacts.filter((artifact) => {
      const artifactName = this.translationPipe.transform(artifact[0], 'artifacts', this.language).toLowerCase();
      const searchValue = this.artifactFilterControl.value?.toLowerCase() || '';
      if (searchValue) {
        return artifactName.includes(searchValue) || _.get(this.languageService.translationDict.nicknames, artifact[0], '').includes(searchValue)
      } else {
        return true;
      }
    })
  }

  // Filter reduction preset list when user searches
  filterReductionPresets() {
    this.filteredReductionPresetGroups = [] 

    for (const reductionPresetGroup of this.reductionPresetGroups) {
      const groupResults = reductionPresetGroup[1].filter(reduction => {
        return this.translationPipe.transform(reduction.id, 'form', this.language).toLowerCase().replace(/ /g, '').includes((this.reductionPresetFilterControl.value?.toLowerCase() || '').replace(/ /g, ''));
      });

      if (groupResults.length) {
        this.filteredReductionPresetGroups.push([reductionPresetGroup[0], groupResults]);
      }
    }
  }

  // Filter target preset list when user searches
  filterTargetPresets() {
    this.filteredTargetPresetGroups = []

    for (const targetPresetGroup of this.targetPresetGroups) {
      const groupResults = targetPresetGroup[1].filter(target => {
        return this.translationPipe.transform(target.id, 'defensePreset', this.language).toLowerCase().replace(/ /g, '').includes((this.targetPresetFilterControl.value?.toLowerCase() || '').replace(/ /g, ''));
      });

      if (groupResults.length) {
        this.filteredTargetPresetGroups.push([targetPresetGroup[0], groupResults]);
      }
    }
  }

  // Save a build to localStorage
  // TODO: Update to indexedDB?
  saveBuild() {
    const artifactName = this.translationPipe.transform(this.artifactControl.value as string, 'artifacts', this.language)
    const dialogRef = this.dialog.open(CompareSaveComponent, {
      width: '50rem',
      data: {buildName: `${Math.round(this.inputValues.attack)}⚔️ x ${Math.round(this.inputValues.critDamage)}% (${artifactName}) vs ${Math.round(this.dataService.currentTarget.getDefense(this.inputValues, this.damageService.getGlobalDefenseMult()))}🛡️`}
    })

    // Save the build to localStorage on dialog close
    dialogRef.afterClosed().subscribe(result => {
      if (result?.buildName) {

        const builds = localStorage.getItem('heroes');
        const allSets = builds ? JSON.parse(builds as string) : {};
        const heroSets = allSets[this.heroControl.value as string] || {};
        const saveData: Record<string, Record<string, number>> = {}
        for (const damage of this.damageData.data) {
          saveData[damage.skill as string] = {'crit': damage.crit || 0, 'normal': damage.normal || 0, 'miss': damage.miss || 0}
        }
        heroSets[result.buildName] = saveData;
        allSets[this.heroControl.value as string] = heroSets;
        localStorage.setItem('heroes', JSON.stringify(allSets));
        this.gtmService.pushTag({
          'event': 'save_hero',
          'hero': this.heroControl.value
        });

        if (result.multiCompare) {
          const multiHeroBuilds = localStorage.getItem('multiHeroCompare');
          const allHeroSets = multiHeroBuilds ? JSON.parse(multiHeroBuilds as string) : {builds: []};

          const multiBuildSaveData: Record<string, string | Record<string, Record<string, number>>> = {hero: this.heroID, buildName: result.buildName, damages: saveData};
          const existingBuild = allHeroSets.builds.filter((build: MultiCompareData) => build.hero === multiBuildSaveData.hero && build.buildName === multiBuildSaveData.buildName)[0];
          if (existingBuild) {
            allHeroSets.builds[allHeroSets.builds.indexOf(existingBuild)] = multiBuildSaveData;
          } else {
            allHeroSets.builds.push(multiBuildSaveData);
          }

          localStorage.setItem('multiHeroCompare', JSON.stringify(allHeroSets));

          this.gtmService.pushTag({
            'event': 'save_hero_multi',
            'hero': this.heroControl.value
          });
        }
      }
      this.refreshCompareBadge();
    });
  }

  // Open build comparison dialog
  compareBuilds() {
    const builds = localStorage.getItem('heroes');
    const allSets = builds ? JSON.parse(builds as string) : {};
    const heroSets = allSets[this.heroControl.value as string] || {};
  
    const dialogRef = this.dialog.open(CompareComponent, {
      width: '70rem',
      data: heroSets
    })

    this.gtmService.pushTag({
      'event': 'compare_hero',
      'hero': this.heroID
    });

    // Remove all builds for hero if requested
    dialogRef.afterClosed().subscribe(removeBuilds => {
      if (removeBuilds?.remove === 'hero') {
        delete allSets[this.heroControl.value as string];
        localStorage.setItem('heroes', JSON.stringify(allSets));
      } else if (removeBuilds?.remove === 'multi') {
        localStorage.setItem('multiHeroCompare', JSON.stringify({builds: []}));
      } 
      this.refreshCompareBadge();
    });
  }

  // Update the number displayed on the compare badge
  refreshCompareBadge() {
    const builds = localStorage.getItem('heroes');
    const allSets = builds ? JSON.parse(builds as string)[this.heroControl.value as string] : null;

    this.savedBuildsCount = allSets ? Object.keys(allSets).length : 0;
  }

  // Show/hide damage table
  toggleTable() {
    this.collapsed = !this.collapsed;
  }

  // Show/hide damage graph
  toggleGraph() {
    this.showGraph = !this.showGraph;

    // to execute after the graph is rendered
    setTimeout(() => {
      if (this.showGraph) {
        this.damageGraph?.calculateChart();
        this.gtmService.pushTag({
          'event': 'show_chart',
          'hero': this.heroID,
          'lang': this.language?.name
        });
      }
    }, 1);
    
  }

  // TODO: fix artifact specific inputs...
  // Load queryparams into the form
  async loadQueryParams() {
    this.gtmService.pushTag({
      'event': 'loaded_query_params',
      'page': 'damage_calculator',
      'loaded_params': JSON.stringify(this.queuedQueryParams)
    });
    if (!this.loading && this.queuedQueryParams) {
      this.paramsLoading = true;
      const paramInputs: Record<string, boolean | number | string> = {};

      const paramArtifact = _.get(this.queuedQueryParams, 'artifact')
      const paramHero = _.get(this.queuedQueryParams, 'hero')

      if (paramHero && Object.keys(Heroes).includes(paramHero)) {
        this.selectHero(paramHero)
        this.heroControl.setValue(paramHero)

        setTimeout(() => {
          for (const skill of Object.entries(this.hero.skills)) {
            const skillMolaLabel = `molagora${skill[0]}`
            if (skillMolaLabel in (this.queuedQueryParams || {})) {
              this.slideInputs.filter(input => input.label === this.translationPipe.transform(skill[0], 'skills', this.language))[0]?.overrideValue(Number((this.queuedQueryParams as Record<string, string>)[skillMolaLabel]))
            }
          }
        }, 0);
      }

      // Ensure invalid hero/artifact combos aren't possible through queryparam manipulation
      if (   paramArtifact
        && Object.keys(Artifacts).includes(paramArtifact)
        && (
                 Artifacts[paramArtifact].exclusive === this.hero.class
              || Artifacts[paramArtifact].heroExclusive.includes(this.heroID)
              || Artifacts[paramArtifact].exclusive === HeroClass.common
           )
      ) {
        this.selectArtifact(paramArtifact)
        
        if (Object.keys(this.queuedQueryParams).includes('artifactLevel')) {
          setTimeout(() => {
            this.slideInputs.filter(input => input.label === this.translationPipe.transform('level', 'form', this.language))[0]?.overrideValue(Number(this.queuedQueryParams?.artifactLevel || 30))
          }, 0);
        }
      }

      // delay to ensure hero and artifact have been selected
      await delay();

      // setvalue on sliders
      for (const param of Object.entries(this.queuedQueryParams)) {
        if (param[1].toLowerCase() === 'true') { // Handle boolean inputs
          paramInputs[param[0]] = true;
        } else if (param[1].toLowerCase() === 'false') {
          paramInputs[param[0]] = false;
        } else if (!isNaN(Number(param[1]))) { // Handle number inputs
          paramInputs[param[0]] = Number(param[1]);
          if (param[0] === 'targetDefense') {
            this.slideInputs.filter(input => input.label === this.translationPipe.transform(param[0].replace('targetD', 'd'), 'form', this.language))[0]?.overrideValue(Number(param[1]))
          } else if (param[0].endsWith('SetStack')) {
            this.stackingSets.push(param[0]);
            // settimeout so that the slider can be added first
            setTimeout(() => {
              this.slideInputs.filter(input => input.label === this.translationPipe.transform(param[0], 'form', this.language))[0]?.overrideValue(Number(param[1]))
            }, 0);
          } else {
            this.slideInputs.filter(input => input.label === this.translationPipe.transform(param[0], 'form', this.language))[0]?.overrideValue(Number(param[1]))
          }
        } else if (['defensePreset', 'reductionPreset'].includes(param[0])) { // Handle presets
          paramInputs[param[0]] = param[1];
        }
      }

      // Select defPreset from queryparam
      if (paramInputs['defensePreset']) {
        this.selectTarget(this.allTargetPresets.filter(preset => preset.id === paramInputs['defensePreset'])[0])
      }

      // Select reductionPreset from queryparam
      if (paramInputs['reductionPreset']) {
        this.selectReduction(this.allReductionPresets.filter(preset => preset.id === paramInputs['reductionPreset'])[0])
      }
  
      // Send all the queryparam info to dataService to update form
      this.dataService.updateDamageInputValues(paramInputs);
      this.refreshCompareBadge();

      setTimeout(() => {
        if ('showGraph' in (this.queuedQueryParams || {})) {
          this.showGraph = true;

          // settimeout so chart can render
          setTimeout(() => {
            this.damageGraph?.setChartHitType((this.queuedQueryParams as Record<string, string>).graphHitType)
            this.damageGraph?.setChartSkill((this.queuedQueryParams as Record<string, string>).graphSkill)
            this.damageGraph?.setOneshotHP(Number((this.queuedQueryParams as Record<string, string>).graphOneshotHP))
          }, 1);
        }
      }, 0);
    }
  }

  // copy link to clipboard with queryparams corresponding to form values
  shareResults() {
    const result: Record<string, string> = {};
    const defaultReduction = TargetReductionPresetGroups.default[0]

    for (const key in this.damageService.damageForm) {
      const value = this.damageService.damageForm[key]

      if (typeof value !== 'function' && key !== 'inputOverrides') {
        // Handle objects and arrays separately
        if (typeof value === 'object') {
          if (key === 'defensePreset' && value && value.id !== TargetPresetGroups.default[0].id) {
            result[key] = String(value.id);
          } else if (key === 'reductionPreset' && value && value.id !== defaultReduction.id) {
            result[key] = String(value.id);
          }
        } else {
          if (Object.keys(FormDefaults).includes(key) && (FormDefaults[key]?.defaultValue || FormDefaults[key]?.default) != undefined) {
            if (value !== (FormDefaults[key]?.defaultValue || FormDefaults[key]?.default)){
              if (key === 'artifactLevel' && this.artifact.id === 'noProc') {
                continue;
              } else {
                result[key] = String(value);
              }
            }
          } else {
            if (key.includes('molagora')) {
              const defaultMolas = this.hero.skills[key.slice(-2)]?.enhance?.length
              if (defaultMolas && value !== defaultMolas) {
                result[key] = String(value)
              }
            } else if (['damageReduction', 'damageTransfer', 'targetDefenseIncrease'].includes(key)) {
              if (value && this.reductionPresetControl.value?.id === 'manual'
              ) {
                result[key] = String(value)
              }
            } else if (key === 'heroID') {
              result['hero'] = String(value)
            } else if (value) {
              result[key] = String(value)
            }
          }
        }
      }
    }

    // TODO: should probably find magic strings like this and make them defined consts somewhere...
    if (this.artifact.id !== 'noProc') {
        result['artifact'] = this.artifact.id;
    }

    if (this.showGraph) {
      result['showGraph'] = 'true';
      result['graphSkill'] = String(this.damageGraph?.skillControl.value)
      result['graphHitType'] = String(this.damageGraph?.damageToUse)
      result['graphOneshotHP'] = String(this.damageGraph?.oneshotHP.value)
    }

    const queryParams = new URLSearchParams(result)
    const linkURL = new URL(window.location.href);
    linkURL.search = queryParams.toString();
    navigator.clipboard.writeText(linkURL.href);

    this.shareButtonText = 'linkCopied'

    this.gtmService.pushTag({
      'event': 'shared_query_params',
      'page': 'damage',
      'shared_params': linkURL.search
    });
  }
}
