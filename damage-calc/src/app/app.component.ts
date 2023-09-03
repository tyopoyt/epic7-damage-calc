import { Component, OnInit } from '@angular/core';
import { languages } from './models/languages';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'damage-calc';

  constructor (private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {}
}
