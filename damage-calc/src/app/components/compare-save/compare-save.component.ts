import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface BuildSaveData {
  buildName: string;
}

// TODO: Does this really need to be standalone?
@Component({
  selector: 'app-compare-save',
  templateUrl: './compare-save.component.html',
  styleUrls: ['./compare-save.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class CompareSaveComponent {
  constructor(
    public dialogRef: MatDialogRef<CompareSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BuildSaveData,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
