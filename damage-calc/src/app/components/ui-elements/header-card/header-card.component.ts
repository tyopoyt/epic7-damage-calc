import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

export enum HeaderCardComponentColorOption {
  none = '',
  green = 'green', 
  blue = 'blue',
  red = 'red'
}

export enum HeaderCardComponentSizeOption {
  small = 'small',
  medium = 'medium', 
  large = 'large'
}

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.scss']
})
export class HeaderCardComponent {

  @Input() header: string = '';
  @Input() content: string = '';
  @Input() subContent: string = '';
  @Input() left: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() color: HeaderCardComponentColorOption = HeaderCardComponentColorOption.none;
  @Input() contentSize: HeaderCardComponentSizeOption = HeaderCardComponentSizeOption.medium;
  @Input() normalWeight: boolean = false;
  @Input() hint: string = '';
  @Input() additional: string = '';
  @Input() additionalIcon: string = ''; // file url
}
