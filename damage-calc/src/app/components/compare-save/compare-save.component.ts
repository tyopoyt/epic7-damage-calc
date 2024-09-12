import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppModule } from 'src/app/app.module';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService, Theme } from 'src/app/services/screen.service';

export interface BuildSaveData {
  buildName: string;
}

@Component({
  selector: 'app-compare-save',
  templateUrl: './compare-save.component.html',
  styleUrls: ['./compare-save.component.scss'],
})
export class CompareSaveComponent {

  Theme = Theme;
  multiCompare = false;

  constructor(
    public dialogRef: MatDialogRef<CompareSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BuildSaveData,
    public screenService: ScreenService,
    public languageService: LanguageService
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
