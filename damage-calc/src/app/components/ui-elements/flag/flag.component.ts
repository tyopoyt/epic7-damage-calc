import { Component, OnInit, Input } from '@angular/core';
import { Language, Languages } from 'src/app/models/languages';

@Component({
    selector: 'app-flag',
    templateUrl: './flag.component.html',
    styleUrls: ['./flag.component.scss'],
    standalone: false
})
export class FlagComponent implements OnInit {

  @Input() country: string = 'us';

  constructor() { }

  ngOnInit(): void {
  }

}
