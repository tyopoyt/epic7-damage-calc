import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { Skill } from 'src/app/models/skill';
import { DamageRow, DamageService } from 'src/app/services/damage.service';
import { DataService } from 'src/app/services/data.service';
import { DisplayConstants } from 'src/assets/data/constants';
import Annotation, { AnnotationOptions } from 'chartjs-plugin-annotation';
import { FormControl } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ScreenService, Theme } from 'src/app/services/screen.service';
import { debounce } from 'src/app/utils/utils';
import { BaseChartDirective } from 'ng2-charts';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';


export interface ChartDamageData {
  [key: string]: Record<string, number[]>;
}

export type StatType = 'attack' | 'critDamage' | 'casterDefense' | 'casterMaxHP' | 'casterSpeed';

export type DamageRowStringKey = 'crit' | 'crush' | 'normal' | 'miss';

export interface DamageDataset {
  datasets: {
    data?: number[] | any;
    label?: string;
    borderWidth?: number;
    backgroundColor?: string;
    borderColor?: string;
    pointStyle?: string;
  }[]
  labels: string[]
  
}

@Component({
  selector: 'app-damage-graph',
  templateUrl: './damage-graph.component.html',
  styleUrls: ['./damage-graph.component.scss']
})
export class DamageGraphComponent implements OnInit, OnDestroy, AfterViewInit {

  // Grab the chart from dom
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Graph controls -------------------------------------------------------------------------
  public heroSkills: string[];
  public skillControl: FormControl<string | null>;

  hitTypeControl: FormControl<string | null>;

  oneshotHP: BehaviorSubject<number> = new BehaviorSubject(0);
  onlyCrit = false;
  noCrit = false;
  onlyMiss = false;
  noMiss = false;
  // ----------------------------------------------------------------------------------------
  
  // Used during graph calcualtions +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  calculationValues: Record<string, number> = {};
  public damageData: ChartConfiguration['data'] = {datasets: [], labels: []};
  allDamages: ChartDamageData = {'crit': {}, 'crush': {}, 'normal': {}, 'miss': {}};
  
  damageToUse = 'crit';
  maxDamages: number[] = [];
  minDamages: number[] = [];
  patchValues = {};
  labels: string[] = [];
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Graph configuration ====================================================================
  statIndices = {
    'attack': 0,
    'critDamage': 1,
    'casterDefense': 2,
    'casterMaxHP': 3,
    'casterSpeed': 4,
  };

  pointBackgrounds = ['rgba(23, 119, 212, 0.75)', 'rgba(212, 55, 88,0.75)', 'rgba(199, 129, 16, 0.75)', 'rgba(28, 145, 106, 0.75)', 'rgba(83, 62, 176, 0.75)'];
  pointOutlines = ['#36a2eb', '#ff6384', '#fcaf32', '#08c988', '#7059d4'];
  pointStyles = ['circle', 'triangle', 'rect', 'rectRot', 'star'];

  options: ChartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: this.screenService.theme === Theme.dark ? '#5f5f5f': '#898989'
        },
        ticks: {
          color: this.screenService.theme === Theme.dark ? '#DDDDDD': '#898989'
        }
      },
      x: {
        ticks: {
          display: false
        },
        grid: {
          color: this.screenService.theme === Theme.dark ? '#5f5f5f': '#898989'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          // TODO: translate, obviously
          label: (item: any) => `${this.translationPipe.transform('withMore', 'graph', this.languageService.language.value)} ${item.dataset.label}: ${item.formattedValue}`// TODO: define type?            
        },
      },
      legend: {
        labels: {
          color: this.screenService.theme === Theme.dark ? '#DDDDDD': '#898989'
        }
      },
      annotation: {
        annotations: [
          {
            id: 'currentStats',
            type: 'line',
            value: 40,
            scaleID: 'x',
            borderColor: 'rgba(25, 25, 25, 0.75)',
            borderWidth: 2,
            label: {
              display: true,
              content: 'Current Stats',
              position: 'end',
              color: '#DDDDDD',
              font: {
                family: DisplayConstants['font-family']
              }
            }
          }
        ]
      }
    }
  }
  // ========================================================================================= 

  // Misc.
  translationPipe: TranslationPipe = new TranslationPipe(this.languageService);
  heroSubscription: Subscription;

  // Getters
  get artifact() {
    return this.dataService.currentArtifact.value;
  }

  get hero() {
    return this.dataService.currentHero.value;
  }

  get inputValues() {
    return this.dataService.damageInputValues;
  }

  constructor(private damageService: DamageService,
              private dataService: DataService,
              public languageService: LanguageService,
              public screenService: ScreenService
             )
  {
    // TODO: Make this type safe
    if (this.options.plugins?.annotation?.annotations && (this.options.plugins?.annotation?.annotations as any[])[0]) {
      (this.options.plugins.annotation.annotations as any[])[0].label.content = this.translationPipe.transform('currentStats', 'ui', this.languageService.language.value)
    }

    this.skillControl = new FormControl<string | null>('s1')
    this.hitTypeControl = new FormControl<string | null>('crit')
    this.heroSkills = [];

    // Listen for hero updates
    this.heroSubscription = this.dataService.currentHero.subscribe(hero => {
      this.heroSkills = [];
      for (const skill of Object.keys(hero.skills)) {
        if (hero.skills[skill].rate(false, this.inputValues, false) || hero.skills[skill].pow(false, this.inputValues)) {
          this.heroSkills.push(skill);
          // TODO: support extra attacks when relevant (prayer of solitude)
          if (hero.skills[skill].soulburn) {
            this.heroSkills.push(skill + '_soulburn')
          }
        }
      }
      this.damageToUse = 'crit';
      this.hitTypeControl.setValue('crit')
      this.skillControl.setValue(this.heroSkills[0])
    })
  }

  ngOnInit() {
    Chart.register(Annotation);
  }

  ngAfterViewInit(): void {
    if (this.inputValues.targetMaxHP) {
      Promise.resolve().then(() => {
        this.setOneshotHP(this.inputValues.targetMaxHP)
      })
    }
  }

  ngOnDestroy() {
    if (this.heroSubscription) {
      this.heroSubscription.unsubscribe();
    }
  }
  
  // Add/remove/update the oneshot line
  updateOneshotLine = () => {
    // TODO: remove this since queryparams are generated when clikcing the share button?
    if (this.oneshotHP) {
      debounce('updateDamageQueryParams', this.dataService.updateDamageQueryParams, [this.dataService.damageInputValues]);
    }
  
    // check if damage is close enough to oneshot that the line should be shown
    if (this.oneshotHP.value && this.oneshotHP.value <= Math.max(...this.maxDamages) * 1.25 && Math.min(...this.minDamages) <= this.oneshotHP.value * 1.25) {
      // Just to ensure it can be assigned
      if (this.options?.plugins?.annotation?.annotations) {
        // Update value if the line already exists
        if (this.options.plugins.annotation.annotations.length === 2) {
          (this.options.plugins.annotation.annotations as {value: number}[])[1].value = this.oneshotHP.value;
        } else { // Add new line if it doesn't exist
          (this.options.plugins.annotation.annotations as AnnotationOptions[]).push(
            {
              id: 'oneshot',
              type: 'line',
              value: this.oneshotHP.value,
              borderColor: 'rgba(25, 25, 25, 0.75)',
              borderWidth: 2,
              scaleID: 'y',
              label: {
                display: true,
                content: this.translationPipe.transform('oneshot', 'ui', this.languageService.language.value),
                position: 'start',
                backgroundColor: 'rgba(25, 25, 25, 0.75)',
                font: {
                  family: DisplayConstants['font-family']
                }
              }
            });
        }
      }
    } else { // Delete the oneshot line if it's no longer applicable
      if (this.options?.plugins?.annotation?.annotations && this.options.plugins.annotation.annotations.length === 2) {
        (this.options.plugins.annotation.annotations as AnnotationOptions[]).length = 1;
      }
    }
    // This is janky but it gets the graph to update without totally redrawing it which causes a jarring animation...
    // Probably a better way but it's not obvious how.  Calling chart.update doesn't do the trick. Seems to have 0 performance hit.
    this.labels = [...this.labels]
  };
  // TODO: fix bugs, look at ml yufine, hers is messed up.  Also other languages have an extra attack line when changing languages
  // Calculate data points for the graph
  calculateChart() {
    this.maxDamages = [];
    this.minDamages = [];
  
    const skill = this.dataService.currentHero.value.skills[this.skillControl.value?.replace(/_.*/, '') || 's1']
    if (!skill) {
      return;
    }

    const soulburn = this.skillControl.value?.endsWith('_soulburn') || false;

    this.noCrit = skill.noCrit;
    this.onlyCrit = skill.onlyCrit(soulburn);
    this.noMiss = skill.noMiss;
    this.onlyMiss = skill.onlyMiss;

    // Update damage type when needed i.e. after hero change
    if (['crit', 'crush'].includes(this.damageToUse) && skill.noCrit) {
      this.damageToUse = 'normal';
      this.hitTypeControl.setValue('normal');
    } else if (['crush', 'normal'].includes(this.damageToUse) && skill.onlyCrit(soulburn)) {
      this.damageToUse = 'crit';
      this.hitTypeControl.setValue('crit')
    } else if (this.damageToUse === 'miss' && skill.noMiss) {
      this.damageToUse = 'crit';
      this.hitTypeControl.setValue('crit')
    } else if (this.damageToUse !== 'miss' && skill.onlyMiss) {
      this.damageToUse = 'miss';
      this.hitTypeControl.setValue('miss')
    }
  
    this.labels = [];
  
    // pick different num steps if skill.nocrit
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const intersectionRatio = 3; // denominator of fraction, so 3 = intersection 1/3 from the left of chart
    const numSteps = windowWidth < 768 ? 50 : 120;
    const intersectionPoint = numSteps / intersectionRatio;
    if (this.options?.plugins?.annotation?.annotations) {
      // TS doesn't see the right type here, so cast
      (this.options.plugins.annotation.annotations as {value: number}[])[0].value = intersectionPoint;
    }
    
    const artifactApplies = this.dataService.currentArtifact.value.applies(skill, this.dataService.damageInputValues);
  
    // Filter out any unneeded datasets for unused stats ============================================================
    const attackLabel = this.translationPipe.transform('attack', 'graph', this.languageService.language.value);
    let filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === attackLabel);
    // TODO: if extras are supported fix the skill.rate calls in this file
    if (!skill.rate(!!soulburn, this.dataService.damageInputValues, false) && filteredDatasets.length && !(this.artifact.attackPercent && artifactApplies)) {
      this.damageData.datasets.splice(this.damageData.datasets.indexOf(filteredDatasets[0]), 1);
    }
  
    const critDamageLabel = this.translationPipe.transform('critDamage', 'graph', this.languageService.language.value);
    filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === critDamageLabel);
    if (this.damageToUse !== 'crit' && filteredDatasets.length) {
      this.damageData.datasets.splice(this.damageData.datasets.indexOf(filteredDatasets[0]), 1);
    }
  
    const casterDefenseLabel = this.translationPipe.transform('casterDefense', 'graph', this.languageService.language.value);
    filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === casterDefenseLabel);
    if (!skill.defenseScaling && filteredDatasets.length && !(this.artifact.defenseScaling && artifactApplies)) {
      this.damageData.datasets.splice(this.damageData.datasets.indexOf(filteredDatasets[0]), 1);
    }
  
    const casterMaxHPLabel = this.translationPipe.transform('casterMaxHP', 'graph', this.languageService.language.value);
    filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === casterMaxHPLabel);
    if (!skill.hpScaling && filteredDatasets.length && !(this.artifact.hpScaling && artifactApplies)) {
      this.damageData.datasets.splice(this.damageData.datasets.indexOf(filteredDatasets[0]), 1);
    }
  
    const casterSpeedLabel = this.translationPipe.transform('casterSpeed', 'graph', this.languageService.language.value);
    filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === casterSpeedLabel);
    if (!skill.speedScaling && filteredDatasets.length && !(this.artifact.speedScaling && artifactApplies)) {
      this.damageData.datasets.splice(this.damageData.datasets.indexOf(filteredDatasets[0]), 1);
    }
    // =============================================================================================================================

    // Calculate damage data points for relevant stat changes ----------------------------------------------------------------------
    if (skill.rate(!!soulburn, this.dataService.damageInputValues, false) || (this.artifact.attackPercent && artifactApplies)) {
      const attackStep = Math.max(Math.floor(((8 / 7) / 100) * this.hero.baseAttack * (1 + (this.hero.innateAtkUp ? this.hero.innateAtkUp() : 0))), 1);
      this.getStatDataPoints('attack', attackStep, intersectionPoint, numSteps, skill);
    }

    if (this.damageToUse === 'crit') {
      this.getStatDataPoints('critDamage', 1, intersectionPoint, numSteps, skill, soulburn, 350)
    }
  
    if (skill.defenseScaling || (this.artifact.defenseScaling && artifactApplies)) {
      const defenseStep = Math.max(Math.floor(((8 / 7) / 100) * this.hero.baseDefense), 1);
      this.getStatDataPoints('casterDefense', defenseStep, intersectionPoint, numSteps, skill, soulburn)
    }
    
    if (skill.hpScaling || (this.artifact.hpScaling && artifactApplies)) {
      const hpStep = Math.max(Math.floor(((8 / 7) / 100) * this.hero.baseHP), 1);
      this.getStatDataPoints('casterMaxHP', hpStep, intersectionPoint, numSteps, skill, soulburn)
    }
    
    if (skill.speedScaling || this.artifact.speedScaling) {
      const speedStep = (4 / 7);
      this.getStatDataPoints('casterSpeed', speedStep, intersectionPoint, numSteps, skill, soulburn)
    }
    // --------------------------------------------------------------------------------------------------------------------------
  
    this.updateOneshotLine();
  }
  
  // Update the hit type to use for calculation
  setChartHitType = (hitType = 'crit') => {
    this.damageToUse = hitType;

    // for manual sets like loading query params
    if (this.hitTypeControl.value !== hitType) {
      this.hitTypeControl.setValue(hitType)
    }

    this.calculateChart();
  };

  // Update the hit type to use for calculation
  setChartSkill = (skill = 's1') => {
    this.skillControl.setValue(skill);
    this.calculateChart();
  };

  // calculate the data points for changing a particular stat
  getStatDataPoints(stat: StatType, step: number, intersectionPoint: number, stepCount: number, skill: Skill, soulburn = false, maxStat = Infinity) {
    // filteredDatasets = this.damageData.filter(dataset => dataset.label === formLabel(stat));
    // Dataset configuation
    const statLabel = this.translationPipe.transform(stat, 'graph', this.languageService.language.value);
    const filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === statLabel);
    if (!filteredDatasets.length) {
      this.damageData.datasets.push({
        label: statLabel,
        data: [],
        borderWidth: 1,
        backgroundColor: this.pointBackgrounds[this.statIndices[stat]],
        borderColor: this.pointOutlines[this.statIndices[stat]],
        pointStyle: this.pointStyles[this.statIndices[stat]],
        pointBackgroundColor: this.pointBackgrounds[this.statIndices[stat]],
        pointBorderColor: this.pointOutlines[this.statIndices[stat]],
      });
      filteredDatasets.push(this.damageData.datasets[this.damageData.datasets.length - 1]);
    } else {
      // TODO: is this else block needed in the refactor?
      const indexOfDataset = this.damageData.datasets.indexOf(filteredDatasets[0]);
      this.damageData.datasets[indexOfDataset].backgroundColor = this.pointBackgrounds[this.statIndices[stat]];
      this.damageData.datasets[indexOfDataset].borderColor = this.pointOutlines[this.statIndices[stat]];
      // this.damageData.datasets[indexOfDataset]['pointBackgroundColor'] = this.pointBackgrounds[this.statIndices[stat]];
      // (this.damageData.datasets[indexOfDataset] as any).pointBorderColor = this.pointOutlines[this.statIndices[stat]];
    }

    // Calculation setup
    const statDataIndex = this.damageData.datasets.indexOf(filteredDatasets[0]);
    this.calculationValues[stat] = Math.floor(this.inputValues[stat] - (intersectionPoint * step));
    this.damageData.datasets[statDataIndex].data = [];

    // Datapoint calculation
    while (this.damageData.datasets[statDataIndex].data.length < stepCount && this.calculationValues[stat] <= maxStat) {
      // Get the damage
      // TODO: handle extra attacks when applicable (prayer of solitude)
      const damage = this.damageService.getDamage(skill, soulburn, false, this.calculationValues)
      const finalDam = (damage[this.damageToUse as keyof DamageRow] || 0) as number;

      // Create dataset if needed
      if (!this.damageData.datasets[statDataIndex].data.length) {
        this.minDamages.push(Number(finalDam));
        Object.keys(damage).forEach(damageType => {
          if (damageType !== 'skill' && damage[damageType as keyof DamageRow] != null) {
            this.allDamages[damageType as keyof ChartDamageData][stat] = [];
          }
        });
      }

      // Push data to dataset
      Object.keys(damage).forEach(damageType => {
        if (damageType !== 'skill' && damage[damageType as keyof DamageRow] != null) {
          this.allDamages[damageType as keyof ChartDamageData][stat].push(damage[damageType as DamageRowStringKey] || 0);
        }
      });
      this.damageData.datasets[statDataIndex].data.push(finalDam);

      // Update labels
      // this.damageData[statDataIndex].label = (`${Math.floor(this.calculationValues[stat])} ${formLabel(stat)}`);
      if (this.damageData.labels && this.damageData.labels.length < stepCount) {
        this.damageData.labels.push((`${Math.floor(this.calculationValues[stat])} ${statLabel}`));
      } else if (this.damageData.labels) {
        if (statDataIndex === 0) {
          this.damageData.labels[this.damageData.datasets[statDataIndex].data.length - 1] = `${Math.floor(this.calculationValues[stat])} ${statLabel}`
        } else {
          this.damageData.labels[this.damageData.datasets[statDataIndex].data.length - 1] = `${this.damageData.labels[this.damageData.datasets[statDataIndex].data.length - 1]} vs ${Math.floor(this.calculationValues[stat])} ${statLabel}`;
        }
      }
      this.calculationValues[stat] += step;
      if (this.damageData.datasets[statDataIndex].data.length >= stepCount) {
        this.maxDamages.push(finalDam);
      }
    }

    // Reset the temporary calculation values
    delete this.calculationValues[stat]
  }

  // Set hp for the oneshot line
  setOneshotHP(hp: number) {
    this.oneshotHP.next(hp);
    this.updateOneshotLine();
  }
}
