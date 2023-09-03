import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { languages } from 'src/app/models/languages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  languages = Object.values(languages);
  languageSelection = new FormControl(languages.us);

  selectLanguage = (event: MatSelectChange) => {
    console.log(event.value)
  }

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {}
}
