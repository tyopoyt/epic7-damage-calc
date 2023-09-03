import { Component } from '@angular/core';
import { languages } from './models/languages';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'damage-calc';
  languages = Object.values(languages);
  languageSelection = new FormControl(languages.us);

  selectLanguage = (event: MatSelectChange) => {
    console.log(event.value)
  }
}
