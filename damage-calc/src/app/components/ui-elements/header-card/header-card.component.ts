import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.scss']
})
export class HeaderCardComponent {

  @Input() header: string = '';
  @Input() content: BehaviorSubject<string> = new BehaviorSubject('');
  @Input() left: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() color: '' | 'green' | 'blue' | 'red' = '';
  @Input() contentSize: 'small' | 'medium' | 'large' = 'medium';
  @Input() hint: string = '';

}
