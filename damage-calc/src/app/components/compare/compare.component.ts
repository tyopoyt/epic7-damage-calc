import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompareSaveComponent } from '../compare-save/compare-save.component';
import { MatTableDataSource } from '@angular/material/table';
import { ScreenService } from 'src/app/services/screen.service';
import { LanguageService } from 'src/app/services/language.service';
import { DataService } from 'src/app/services/data.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

export interface CompareData {
  buildName?: string;
  damages?: number[];
}

export interface MultiCompareData {
  buildName?: string;
  damages?: Record<string, number>;
  hero?: string;
}

export interface CompareDamageRow {
  crit?: number;
  normal?: number;
  miss?: number;
}

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent {

  // Single hero compare
  displayedColumns: string[] = ['delete', 'buildName'];
  skills: string[] = [];
  damageData = new MatTableDataSource<CompareData>();

  // Multi hero compare
  displayedMultiCompareColumns: string[] = ['delete', 'hero', 'buildName'];
  multiCompareSkills: string[] = [];
  multiCompareDamageData = new MatTableDataSource<MultiCompareData>();

  normalSkills = ['s1', 's2', 's3'];
  tabIndex = 0;

  constructor(
    public dialogRef: MatDialogRef<CompareSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompareData,
    public screenService: ScreenService,
    public languageService: LanguageService,
    public dataService: DataService,
    private gtmService: GoogleTagManagerService
  ) {
    // TODO: Convert to indexedDB?
    // Load build data from localstorage
    const buildArray: CompareData[] = [];
    for (const entry of Object.entries(data)) {
      const buildRow: CompareData = {};
      const rowDamages = [];

      buildRow.buildName = entry[0];
      for (const skillDamages of Object.entries(entry[1])) {
        this.displayedColumns.push(skillDamages[0])
        this.skills.push(skillDamages[0])
        rowDamages.push((skillDamages[1] as CompareDamageRow).crit || (skillDamages[1] as CompareDamageRow).normal || (skillDamages[1] as CompareDamageRow).miss || 0)
      }

      buildRow.damages = rowDamages;
      buildArray.push(buildRow)
    }

    this.displayedColumns = [...new Set(this.displayedColumns)]
    this.skills = [...new Set(this.skills)]
    this.damageData.data = buildArray;

    // Multi-compare
    const multiCompareBuilds = localStorage.getItem('multiHeroCompare');
    const allSets = multiCompareBuilds ? JSON.parse(multiCompareBuilds as string) : {builds: []};

    if (allSets.builds) {
      const multiBuildArray: MultiCompareData[] = [];

      for (const build of allSets.builds) {
        const multiBuildRow: MultiCompareData = {};
        const rowDamages: Record<string, number> = {};
  
        multiBuildRow.buildName = build.buildName;
        multiBuildRow.hero = build.hero;
        for (const skillDamages of Object.entries(build.damages)) {
          if (skillDamages[0].endsWith('_soulburn') || (!this.normalSkills.includes(skillDamages[0]) && Object.keys(rowDamages).includes('extraSkill'))) {
            continue;
          } else if (!this.normalSkills.includes(skillDamages[0])) {
            skillDamages[0] = 'extraSkill';
          }
          this.displayedMultiCompareColumns.push(skillDamages[0])
          this.multiCompareSkills.push(skillDamages[0])
          // rowDamages((skillDamages[1] as CompareDamageRow).crit || (skillDamages[1] as CompareDamageRow).normal || (skillDamages[1] as CompareDamageRow).miss || 0)
          rowDamages[skillDamages[0]] = (skillDamages[1] as CompareDamageRow).crit || (skillDamages[1] as CompareDamageRow).normal || (skillDamages[1] as CompareDamageRow).miss || 0
        }
  
        multiBuildRow.damages = rowDamages;
        multiBuildArray.push(multiBuildRow)
      }
  
      this.displayedMultiCompareColumns = ['delete', 'hero', 'buildName'].concat([...new Set(this.multiCompareSkills)].filter(skill => this.normalSkills.includes(skill)).sort());
      this.multiCompareSkills = [...new Set(this.multiCompareSkills)];
  
      if (this.multiCompareSkills.includes('extraSkill')) {
        this.displayedMultiCompareColumns.push('extraSkill');
      }
      
      this.multiCompareDamageData.data = multiBuildArray.sort((a: MultiCompareData, b: MultiCompareData) => a.hero?.localeCompare(b.hero || '') || 0);
    }
    
  }

  // Close the compare dialog
  close(): void {
    this.dialogRef.close();
  }

  // When closed, damage calc component will delete all builds for the selected hero
  removeAllBuilds() {
    this.dialogRef.close({remove: 'hero'});
  }

  // When closed, damage calc component will delete all builds for multi-hero compare
  removeAllMultiCompareBuilds() {
    this.dialogRef.close({remove: 'multi'})
  }

  // Remove an individual build when its trash icon is clicked
  removeBuild(build: CompareData) {  
    const builds = localStorage.getItem('heroes');
    const allSets = builds ? JSON.parse(builds as string) : {};

    delete allSets[this.dataService.currentHeroID.value][build.buildName as string]
    this.damageData.data = this.damageData.data.filter(dataBuild => {
      return dataBuild.buildName !== build.buildName
    })

    localStorage.setItem('heroes', JSON.stringify(allSets));
  }

  // Remove an individual multi-compare build when its trash icon is clicked
  removeMultiBuild(build: MultiCompareData) {  
    const builds = localStorage.getItem('multiHeroCompare');
    const allSets = builds ? JSON.parse(builds as string) : {builds: []};
    allSets.builds = allSets.builds.filter((multiBuild: MultiCompareData) => !(multiBuild.hero === build.hero && multiBuild.buildName === build.buildName))
    this.multiCompareDamageData.data = this.multiCompareDamageData.data.filter(dataBuild => !(dataBuild.hero === build.hero && dataBuild.buildName === build.buildName))

    localStorage.setItem('multiHeroCompare', JSON.stringify(allSets));
  }

  // Handle tab switching
  tabChange(tabIndex: number) {
    this.tabIndex = tabIndex;
    if (tabIndex === 1) {
      this.gtmService.pushTag({
        'event': 'view_multi_compare'
      });
    }
  }
}
