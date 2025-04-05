import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService, Theme } from 'src/app/services/screen.service';
import { HeaderCardComponentColorOption, HeaderCardComponentSizeOption } from '../ui-elements/header-card/header-card.component';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';
import { DismissibleColorOption } from '../ui-elements/dismissible/dismissible.component';
import { FormControl } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { DisplayConstants } from 'src/assets/data/constants';

@Component({
  selector: 'app-speed-solver',
  templateUrl: './speed-solver.component.html',
  styleUrls: ['./speed-solver.component.scss']
})
export class SpeedSolverComponent implements OnInit {

  solverTypeControl: FormControl<string | null>;

  HeaderCardComponentColorOption = HeaderCardComponentColorOption;
  HeaderCardComponentSizeOption = HeaderCardComponentSizeOption;

  translationPipe: TranslationPipe = new TranslationPipe(this.languageService);

  displayColor: HeaderCardComponentColorOption = HeaderCardComponentColorOption.green;

  slowerSpeed = 200;
  fasterSpeed = 300;
  slowerCR = 75;
  fasterCR = 50;
  unitCRs = [1, 0, 0, 0]
  unitSpeeds = [200, 200, 200, 200]
  enemyCR = 0.95
  teamMode = true;

  avgSpeedText = '225';
  speedRangeText = '210 - 237';

  DismissibleColorOption = DismissibleColorOption;

  fullCRCombinations: [number, number][][] = [
    [[5, 0]],
    [[5, 1], [4, 0]],
    [[5, 2], [4, 1], [3, 0]],
    [[5, 3], [4, 2], [3, 1], [2, 0]],
    [[5, 4], [4, 3], [3, 2], [2, 1], [1, 0]],
    [[5, 5], [4, 4], [3, 3], [2, 2], [1, 1], [0, 0]],
    [[4, 5], [3, 4], [2, 3], [1, 2], [0, 1]],
    [[3, 5], [2, 4], [1, 3], [0, 2]],
    [[2, 5], [1, 4], [0, 3]],
    [[1, 5], [0, 4]],
    [[0, 5]]
  ]

  fullPossibleCRRolls = [0,1,2,3,4,5]
  fullCRRollCounts    = [6,6,6,6,6,6]

  unitRanges = {
    'maximums': [4000, 4000, 4000, 4000],
    'minimums': [-100, -100, -100, -100]
  }

  initialSpeedMatrix = [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]
  ]

  // Graphing stuff
  public speedData: ChartConfiguration['data'] = {datasets: [], labels: []};
  // public speedData: ChartConfiguration['data'] = {};
  labels: string[] = ['one', 'two', 'three', 'four', 'five'];
  probabilityData = [1/36, 2/36, 3/36, 4/36, 5/36, 6/36, 5/36, 4/36, 3/36, 2/36, 1/36];
  colorSeries = ['#ff0000', '#fc7a00', '#f9ff00', '#bbff00', '#85ff00', '#4eff00', '#85ff00', '#bbff00', '#f9ff00', '#fc7a00', '#ff0000']
  probabilitySeries = [
    {
      backgroundColor: this.colorSeries,
      // label: "speeds",
      barPercentage: 1,
      categoryPercentage: 1,
      data: this.probabilityData,
    }
  ]

  options: ChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            generateLabels: () => {return []}
          }
        },
        tooltip: {
          callbacks: {
            label: (item: any) => {
              const dataDiff = Math.abs(5 - item.dataIndex)
              const minData = 5 - dataDiff;
              const maxData = dataDiff + 5
              const labels = this.speedData.labels || []
              const cumulativeProbability = this.probabilityData.slice(minData, maxData + 1).reduce((sum, value) => Number(sum) + Number(value), 0)
              return `${(item.formattedValue * 100).toFixed(1)}% ${this.translationPipe.transform('chanceSpeed', 'graph', this.languageService.language.value)} ≈${item.label}${dataDiff !== 0 ? ('\n|\n' + (cumulativeProbability * 100).toFixed(1) + '% ' + this.translationPipe.transform('chanceSpeedBetween', 'graph', this.languageService.language.value) + ' ' + labels[minData] +  '~' + labels[maxData]) : ''}`
            }
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: this.screenService.theme === Theme.dark ? '#5f5f5f': '#898989'
          },
          ticks: {
            color: this.screenService.theme === Theme.dark ? '#DDDDDD': '#898989'
          }
        },
        x: {
          grid: {
            color: this.screenService.theme === Theme.dark ? '#5f5f5f': '#898989'
          },
          ticks: {
            color: this.screenService.theme === Theme.dark ? '#DDDDDD': '#898989'
          }
        }
      }
    }
  

  constructor(public screenService: ScreenService,
              public languageService: LanguageService,
              private route: ActivatedRoute,
            )
  {
    this.solverTypeControl = new FormControl<string | null>('slower')
    this.solverTypeControl.setValue('slower')
  }

  ngOnInit(): void {
    const langParam = this.route.snapshot.paramMap.get('lang') || 'us';
    this.languageService.setLanguage(Languages[langParam])

    this.languageService.language.subscribe(() => {
      this.calculate();
    })
  }

  setSolverType(type: string) {
    this.solverTypeControl.setValue(type);
    this.calculate();
  }

  slowerSpeedChange(value: number) {
    this.slowerSpeed = value;
    this.calculate();
  }

  slowerCRChange(value: number) {
    this.slowerCR = value;
    this.calculate();
  }

  fasterSpeedChange(value: number) {
    this.fasterSpeed = value;
    this.calculate();
  }

  fasterCRChange(value: number) {
    this.fasterCR = value;
    this.calculate();
  }

  unitCRChange(value: number, unit: number) {
    this.unitCRs[unit - 1] = value / 100;
    this.calculate();
  }

  enemyCRChange(value: number) {
    this.enemyCR = value / 100;
    this.calculate();
  }

  unitSpeedChange(value: number, unit: number) {
    this.unitSpeeds[unit - 1] = value;
    this.calculate();
  }

  toggleTeamMode() {
    this.teamMode = !this.teamMode;
    // if (!this.fasterPushesSlower) {
    //   this.slowerHeader = 'slower_max_speed'
    //   this.fasterHeader = 'faster_min_speed'
    // } else {
    //   this.slowerHeader = 'slower_min_speed'
    //   this.fasterHeader = 'faster_max_speed'
    // }
    this.calculate();
  }

  translate(key: string) {
    return this.translationPipe.transform(key, 'form', this.languageService.language.value);
  }

  // TODO: use calculateEnemySpeed in this fxn
  calculateRange(unitSpeed: number, unitCR: number, enemyCR: number) {
    let solveUnitMinSpeed, solveUnitMaxSpeed, solveUnitAvgSpeed;

    if (enemyCR <= unitCR) { // enemy is slower
      const slowerUnitCR = enemyCR / 100;
      const minCRRatio = slowerUnitCR - 0.05;
      const avgCRRatio = slowerUnitCR;
      const maxCRRatio = slowerUnitCR / 0.95;

      console.log(`enemy slower: unitspeed ${unitSpeed} unitcr ${unitCR} enemycr ${enemyCR}`)

      solveUnitMinSpeed = unitSpeed * minCRRatio;
      solveUnitAvgSpeed = unitSpeed * avgCRRatio;
      solveUnitMaxSpeed = unitSpeed * maxCRRatio;
    } else { // unit is slower
      const slowerUnitCR = unitCR / 100;
      const fasterUnitCR = enemyCR / 100;

      const minCRRatio = (fasterUnitCR - 0.05) / slowerUnitCR;
      const avgCRRatio = fasterUnitCR / slowerUnitCR;
      const maxCRRatio = fasterUnitCR / (slowerUnitCR - 0.05);
      console.log(`enemy faster: unitspeed ${unitSpeed} unitcr ${unitCR} enemycr ${enemyCR}`)

      solveUnitMinSpeed = unitSpeed * minCRRatio;
      solveUnitAvgSpeed = unitSpeed * avgCRRatio;
      solveUnitMaxSpeed = unitSpeed * maxCRRatio;
    }

    return [solveUnitMinSpeed, solveUnitAvgSpeed, solveUnitMaxSpeed]
  }

  calculateEnemySpeed(unitSpeed: number, unitCR: number, enemyCR: number) {
    console.log(`${unitSpeed} / (${unitCR} / ${enemyCR}) = ${unitSpeed / (unitCR / enemyCR)}`)
    return unitSpeed / (unitCR / enemyCR);
  }

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
    let solveUnitMinSpeed, solveUnitMaxSpeed, solveUnitAvgSpeed;

    if (this.teamMode) {
      // initialize data
      const unitProbabilities:[number, number][][][] = [[], [], [], []]
      const unitPossibleCRRolls: number[][] = [[], [], [], []]
      const unitSpeedMatrix: number[][][] = [[], [], [], []]
      const unitCRRollCounts: number[][] = [[], [], [], []]

      for (const unit in this.unitCRs) {
        if (this.unitCRs[unit]) {
          unitProbabilities[unit] = structuredClone(this.fullCRCombinations)
          unitPossibleCRRolls[unit] = structuredClone(this.fullPossibleCRRolls)
          unitSpeedMatrix[unit] = structuredClone(this.initialSpeedMatrix)
          unitCRRollCounts[unit] = structuredClone(this.fullCRRollCounts)

          for (let unitRoll = 0; unitRoll < 6; unitRoll++) {
            for (let enemyRoll = 0; enemyRoll < 6; enemyRoll++) {
              unitSpeedMatrix[unit][unitRoll][enemyRoll] = this.calculateEnemySpeed(this.unitSpeeds[unit], (this.unitCRs[unit] * 100) - unitRoll, (this.enemyCR * 100) - enemyRoll)
            }
          }
        }
      }

      // console.log('****************&&&&&&&&&&&&&&&&&&&&&*********************')
      // console.log(unitSpeedMatrix)
      // console.log('****************&&&&&&&&&&&&&&&&&&&&&*********************')

      // calculate possible unit CR Rolls

      // first calculate expected CR relative to fastest unit
      const maxSpeed = Math.max(...this.unitSpeeds)
      const fastestUnit = this.unitSpeeds.indexOf(maxSpeed)
      const CRDiffs: number[] = [0, 0, 0, 0]
      for (const unit in this.unitCRs) {
        if (this.unitCRs[unit]) {
          CRDiffs[unit] = (this.unitCRs[unit] * 100) - Math.round((this.unitSpeeds[unit] / maxSpeed) * 100)
        }
      }
      
      // calculate possible rolls for units given their relation to fastest unit
      const maxDiff = Math.max(...CRDiffs)
      const minDiff = Math.min(...CRDiffs)

      // filter out impossible rolls for fastest unit that can't support the observed differences with slower units
      unitPossibleCRRolls[fastestUnit] = unitPossibleCRRolls[fastestUnit].filter(val => 5 - val >= maxDiff)
      unitPossibleCRRolls[fastestUnit] = unitPossibleCRRolls[fastestUnit].filter(val => val + minDiff >= 0)

      for (let i = 0; i < 6; i++) {
        if (!unitPossibleCRRolls[fastestUnit].includes(i)) {
          unitCRRollCounts[fastestUnit][i] = 0;
        }
      }

      // remove impossible probabilities for fastest unit
      for (const differential in unitProbabilities[fastestUnit]) {
        unitProbabilities[fastestUnit][differential] = unitProbabilities[fastestUnit][differential].filter(combo => unitPossibleCRRolls[fastestUnit].includes(combo[0]))
      }

      // for each slower unit, filter out rolls that are incompatible with available rolls of fastest unit
      for (const unit in this.unitCRs) {
        // why does `in` yield strings and not numbers...???
        if (this.unitCRs[unit] && Number(unit) !== fastestUnit) {
          unitPossibleCRRolls[unit] = unitPossibleCRRolls[unit].filter(val => val - CRDiffs[unit] in unitPossibleCRRolls[fastestUnit])

          for (let i = 0; i < 6; i++) {
            if (!unitPossibleCRRolls[unit].includes(i)) {
              unitCRRollCounts[unit][i] = 0;
            }
          }

          // filter out invalid combos
          for (const differential in unitProbabilities[unit]) {
            unitProbabilities[unit][differential] = unitProbabilities[unit][differential].filter(combo => unitPossibleCRRolls[unit].includes(combo[0]))
          }
        }
      }
      
      // calculate speed ranges per-unit
      for (const unit in this.unitCRs) {
        if (this.unitCRs[unit]) {
          let minFound = false;
          let maxFound = false;
          let minRangeCombo = [0, 5];
          let maxRangeCombo = [5, 0];
          for (let i = 0; i < unitProbabilities[unit].length; i++) {
            if (!maxFound && unitProbabilities[unit][i].length) {
              maxRangeCombo = unitProbabilities[unit][i][0];
              maxFound = true
            }
            if (!minFound && unitProbabilities[unit][unitProbabilities[unit].length - (1 + i)].length) {
              // i love not having negative indexing
              minRangeCombo = unitProbabilities[unit][unitProbabilities[unit].length - (1 + i)][unitProbabilities[unit][unitProbabilities[unit].length - (1 + i)].length - 1];
              minFound = true
            }

            if (maxFound && minFound) {
              break;
            }
          }

          this.unitRanges.minimums[unit] = unitSpeedMatrix[unit][minRangeCombo[0]][minRangeCombo[1]];
          this.unitRanges.maximums[unit] = unitSpeedMatrix[unit][maxRangeCombo[0]][maxRangeCombo[1]];
          console.log('==============================================')
          console.log(`unit ${unit} min range combo: ${minRangeCombo} | max range combo: ${maxRangeCombo}`)
          console.log(`unit ${unit} min: ${this.unitRanges.minimums[unit]} | max: ${this.unitRanges.maximums[unit]}`)
          console.log('-------------------------------------------')
        }
      }

      let narrowestRange = [Math.ceil(Math.max(...this.unitRanges.minimums)), Math.floor(Math.min(...this.unitRanges.maximums))]
      console.log(narrowestRange)

      for (const unit in this.unitCRs) {
        if (this.unitCRs[unit]) {
          for (const differential in unitProbabilities[unit]) {
            for (const probability in unitProbabilities[unit][differential]) {
              const prob = unitProbabilities[unit][differential][probability]
              const speed = unitSpeedMatrix[unit][prob[0]][prob[1]]
              if (speed > narrowestRange[1] || speed < narrowestRange[0]) {
                console.log(`removing ${prob} from unit ${unit} (spd = ${speed})`)
              }
            }
          }
        }
      }

      return
    } else {
      if (this.solverTypeControl.value === 'slower') {
        const breakPointSpeeds = []
        const slowerUnitCR = this.slowerCR / 100;

        const targetSpeedRange = this.calculateRange(this.fasterSpeed, 100, this.slowerCR)
  
        solveUnitMinSpeed = targetSpeedRange[0];
        solveUnitAvgSpeed = targetSpeedRange[1];
        solveUnitMaxSpeed = targetSpeedRange[2];
  
        for (let i = 0; i < 11; i++) {
          const crDiff = (i - 5) / 100;
          if (crDiff < 0) {
            breakPointSpeeds.push(`${Math.ceil(this.fasterSpeed * (slowerUnitCR + crDiff))}`)
          } else if (crDiff > 0) {
            breakPointSpeeds.push(`${Math.floor(this.fasterSpeed * (slowerUnitCR / (1 - crDiff)))}`)
          } else {
            breakPointSpeeds.push(`${Math.ceil(this.fasterSpeed * slowerUnitCR)}`)
          }
        }
    
        this.speedRangeText = `${Math.ceil(solveUnitMinSpeed)} - ${Math.floor(solveUnitMaxSpeed)}`;
        this.avgSpeedText = `~${Math.ceil(solveUnitAvgSpeed)}`;
  
        this.speedData = {
          labels: breakPointSpeeds,
          datasets: this.probabilitySeries,
        }
      } else {
        const breakPointSpeeds = []
  
        const slowerUnitCR = this.slowerCR / 100;
        const fasterUnitCR = this.fasterCR / 100;
  
        const targetSpeedRange = this.calculateRange(this.slowerSpeed, this.slowerCR, this.fasterCR)
  
        solveUnitMinSpeed = targetSpeedRange[0];
        solveUnitAvgSpeed = targetSpeedRange[1];
        solveUnitMaxSpeed = targetSpeedRange[2];
  
        for (let i = 0; i < 11; i++) {
          const crDiff = (i - 5) / 100;
          if (crDiff < 0) {
            breakPointSpeeds.push(`${Math.ceil(this.slowerSpeed * ((fasterUnitCR + crDiff) / slowerUnitCR))}`)
          } else if (crDiff > 0) {
            breakPointSpeeds.push(`${Math.floor(this.slowerSpeed * (fasterUnitCR /(slowerUnitCR - crDiff)))}`)
          } else {
            breakPointSpeeds.push(`${Math.ceil(this.slowerSpeed / (slowerUnitCR / fasterUnitCR))}`)
          }
        }
    
        this.speedRangeText = `${Math.ceil(solveUnitMinSpeed)} - ${Math.floor(solveUnitMaxSpeed)}`;
        this.avgSpeedText = `~${Math.ceil(solveUnitAvgSpeed)}`;
  
        this.speedData = {
          labels: breakPointSpeeds,
          datasets: this.probabilitySeries,
        }
      }
    }
  
    //TODO: enable when queryparams work?
    // debounce('updateQueryParams', updateQueryParams, [false]);
  }
}
