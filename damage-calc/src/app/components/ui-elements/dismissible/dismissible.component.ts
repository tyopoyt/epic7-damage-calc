import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

export enum DismissibleColorOption {
  info = 'info',
  instructions = 'instructions',
  warn = 'warn'
}

@Component({
  selector: 'app-dismissible',
  templateUrl: './dismissible.component.html',
  styleUrls: ['./dismissible.component.scss']
})
export class DismissibleComponent {

  @Input() color: DismissibleColorOption = DismissibleColorOption.info;
  @Input() content = '';
  @Input() title = '';
  // @Output() hide: EventEmitter<null> = new EventEmitter();

  constructor (private element: ElementRef) {}

  dismiss() {
    this.element.nativeElement.style.display = 'none';
  }

}
