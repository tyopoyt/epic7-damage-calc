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

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  heroSubscription: Subscription;

  public heroSkills: string[];
  public skillControl: FormControl<string | null>;

  hitTypeControl: FormControl<string | null>;

  oneshotHP: BehaviorSubject<number> = new BehaviorSubject(0);
  onlyCrit = false;
  noCrit = false;
  onlyMiss = false;
  noMiss = false;
  
  calculationValues: Record<string, number> = {};

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
// TODO: color of axis and legend labels
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
          label: (item: any) => `with more ${item.dataset.label}: ${item.formattedValue}`// TODO: define type?
            // `${formLabel('with_more')} ${item.dataset.label}: ${item.formattedValue} ${formLabel('damage')}`,
            
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
              // content: formLabel('current_stats'),
              content: 'currentStats',
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
    this.skillControl = new FormControl<string | null>('s1')
    this.hitTypeControl = new FormControl<string | null>('crit')
    this.heroSkills = [];

    this.heroSubscription = this.dataService.currentHero.subscribe(hero => {
      this.heroSkills = [];
      for (const skill of Object.keys(hero.skills)) {
        if (hero.skills[skill].rate(false, this.inputValues) || hero.skills[skill].pow(false, this.inputValues)) {
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
  
  updateOneshotLine = () => {
    // TODO: implement after queryparams
    if (this.oneshotHP) {
      debounce('updateDamageQueryParams', this.dataService.updateDamageQueryParams, [this.dataService.damageInputValues]);
    }
  
    // check if damage is close enough to oneshot that the line should be shown
    if (this.oneshotHP.value && this.oneshotHP.value <= Math.max(...this.maxDamages) * 1.25 && Math.min(...this.minDamages) <= this.oneshotHP.value * 1.25) {
      // Just to ensuer it can be assigned
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
                // content: formLabel('oneshot'),
                content: 'oneshot',
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
  
  public damageData: ChartConfiguration['data'] = {datasets: [], labels: []};
  allDamages: ChartDamageData = {'crit': {}, 'crush': {}, 'normal': {}, 'miss': {}};
  
  damageToUse = 'crit';
  // skillSelect;
  maxDamages: number[] = [];
  minDamages: number[] = [];
  patchValues = {};
  labels: string[] = [];

  calculateChart() {
    // let oneshotHP = defPresetSelector.options[defPresetSelector.selectedIndex].dataset?.hp;
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
  
    // let filteredDatasets = this.damageData.filter(dataset => dataset.label === formLabel('attack'));
    let filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === 'attack');
    if (!skill.rate(!!soulburn, this.dataService.damageInputValues) && filteredDatasets.length && !(this.artifact.attackPercent && artifactApplies)) {
      this.damageData.datasets.splice(this.damageData.datasets.indexOf(filteredDatasets[0]), 1);
    }
  
    // filteredDatasets = this.damageData.filter(dataset => dataset.label === formLabel('cdam'));
    filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === 'critDamage');
    if (this.damageToUse !== 'crit' && filteredDatasets.length) {
      this.damageData.datasets.splice(this.damageData.datasets.indexOf(filteredDatasets[0]), 1);
    }
  
    filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === 'casterDefense');
    if (!skill.defenseScaling && filteredDatasets.length && !(this.artifact.defenseScaling && artifactApplies)) {
      this.damageData.datasets.splice(this.damageData.datasets.indexOf(filteredDatasets[0]), 1);
    }
  
    filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === 'casterMaxHP');
    if (!skill.hpScaling && filteredDatasets.length && !(this.artifact.hpScaling && artifactApplies)) {
      this.damageData.datasets.splice(this.damageData.datasets.indexOf(filteredDatasets[0]), 1);
    }
  
    filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === 'casterSpeed');
    if (!skill.speedScaling && filteredDatasets.length && !(this.artifact.speedScaling && artifactApplies)) {
      this.damageData.datasets.splice(this.damageData.datasets.indexOf(filteredDatasets[0]), 1);
    }

    if (skill.rate(!!soulburn, this.dataService.damageInputValues) || (this.artifact.attackPercent && artifactApplies)) {
      const attackStep = Math.max(Math.floor(((8 / 7) / 100) * this.hero.baseAttack * (1 + (this.hero.innateAtkUp ? this.hero.innateAtkUp() : 0))), 1);
      this.getStatDataPoints('attack', attackStep, intersectionPoint, numSteps, skill);
    }

    if (this.damageToUse === 'crit') {
      this.getStatDataPoints('critDamage', 1, intersectionPoint, numSteps, skill, soulburn, 350)
    }
  
    // if (skill.defenseScaling || (artifact.defenseScaling && artifactApplies)) {
    if (skill.defenseScaling || (this.artifact.defenseScaling && artifactApplies)) {
      const defenseStep = Math.max(Math.floor(((8 / 7) / 100) * this.hero.baseDefense), 1);
      this.getStatDataPoints('casterDefense', defenseStep, intersectionPoint, numSteps, skill, soulburn)
    }
    
    // if (skill.hpScaling || (artifact.hpScaling && artifactApplies)) {
    if (skill.hpScaling || (this.artifact.hpScaling && artifactApplies)) {
      const hpStep = Math.max(Math.floor(((8 / 7) / 100) * this.hero.baseHP), 1);
      this.getStatDataPoints('casterMaxHP', hpStep, intersectionPoint, numSteps, skill, soulburn)
    }
    
    if (skill.speedScaling || this.artifact.speedScaling) {
      const speedStep = (4 / 7);
      this.getStatDataPoints('casterSpeed', speedStep, intersectionPoint, numSteps, skill, soulburn)
    }
  
    this.updateOneshotLine();
  }
  
  setChartHitType = (hitType = 'crit') => {
    this.damageToUse = hitType;
    // TODO: fix when queryparams are implemented?
    // if (!loadingQueryParams) {
    //   updateQueryParams();
    // }
    this.calculateChart();
  };

  getStatDataPoints(stat: StatType, step: number, intersectionPoint: number, stepCount: number, skill: Skill, soulburn = false, maxStat = Infinity) {
    // filteredDatasets = this.damageData.filter(dataset => dataset.label === formLabel(stat));
    const filteredDatasets = this.damageData.datasets.filter(dataset => dataset.label === stat);
    if (!filteredDatasets.length) {
      this.damageData.datasets.push({
        // label: formLabel(stat),
        label: stat,
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

    const statDataIndex = this.damageData.datasets.indexOf(filteredDatasets[0]);

    this.calculationValues[stat] = Math.floor(this.inputValues[stat] - (intersectionPoint * step));
    this.damageData.datasets[statDataIndex].data = [];

    while (this.damageData.datasets[statDataIndex].data.length < stepCount && this.calculationValues[stat] <= maxStat) {
      // const damage = hero.getDamage(selected, soulburn);
      // TODO: handle extra attacks when applicable (prayer of solitude)
      const damage = this.damageService.getDamage(skill, soulburn, false, this.calculationValues)
      const finalDam = (damage[this.damageToUse as keyof DamageRow] || 0) as number;

      if (!this.damageData.datasets[statDataIndex].data.length) {
        this.minDamages.push(Number(finalDam));
        Object.keys(damage).forEach(damageType => {
          if (damageType !== 'skill' && damage[damageType as keyof DamageRow] != null) {
            this.allDamages[damageType as keyof ChartDamageData][stat] = [];
          }
        });
      }

      Object.keys(damage).forEach(damageType => {
        if (damageType !== 'skill' && damage[damageType as keyof DamageRow] != null) {
          this.allDamages[damageType as keyof ChartDamageData][stat].push(damage[damageType as DamageRowStringKey] || 0);
        }
      });
  
      this.damageData.datasets[statDataIndex].data.push(finalDam);
      // this.damageData[statDataIndex].label = (`${Math.floor(this.calculationValues[stat])} ${formLabel(stat)}`);
      if (this.damageData.labels && this.damageData.labels.length < stepCount) {
        this.damageData.labels.push((`${Math.floor(this.calculationValues[stat])} ${stat}`));
      } else if (this.damageData.labels) {
        if (statDataIndex === 0) {
          this.damageData.labels[this.damageData.datasets[statDataIndex].data.length - 1] = `${Math.floor(this.calculationValues[stat])} ${stat}`
        } else {
          this.damageData.labels[this.damageData.datasets[statDataIndex].data.length - 1] = `${this.damageData.labels[this.damageData.datasets[statDataIndex].data.length - 1]} vs ${Math.floor(this.calculationValues[stat])} ${stat}`;
        }
      }
      this.calculationValues[stat] += step;
      if (this.damageData.datasets[statDataIndex].data.length >= stepCount) {
        this.maxDamages.push(finalDam);
      }
    }

    delete this.calculationValues[stat]
  }

  setOneshotHP(hp: number) {
    this.oneshotHP.next(hp);
    this.updateOneshotLine();
  }
}
