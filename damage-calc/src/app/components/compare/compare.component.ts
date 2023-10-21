import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompareSaveComponent } from '../compare-save/compare-save.component';
import { MatTableDataSource } from '@angular/material/table';
import { ScreenService } from 'src/app/services/screen.service';
import { LanguageService } from 'src/app/services/language.service';

export interface CompareData {
  buildName?: string;
  damages?: number[];
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

  displayedColumns: string[] = ['buildName'];
  skills: string[] = [];
  damageData = new MatTableDataSource<CompareData>();

  constructor(
    public dialogRef: MatDialogRef<CompareSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompareData,
    public screenService: ScreenService,
    public languageService: LanguageService
  ) {
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
  }

  close(): void {
    this.dialogRef.close();
  }

  removeAllBuilds() {
    this.dialogRef.close(true);
  }
}
