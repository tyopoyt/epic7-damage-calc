import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
export class DismissibleComponent implements OnInit {

  @Input() color: DismissibleColorOption = DismissibleColorOption.info;
  @Input() content = '';
  @Input() title = '';
  @Input() key = '';
  // @Output() hide: EventEmitter<null> = new EventEmitter();

  constructor (private element: ElementRef) {}

  ngOnInit(): void {
    if (this.key && window.localStorage.getItem(`${this.key}Dismissed`)) {
      this.element.nativeElement.style.display = 'none';
    }
  }

  dismiss() {
    this.element.nativeElement.style.display = 'none';

    if (this.key) {
      window.localStorage.setItem(`${this.key}Dismissed`, 'true')
    }
  }

}
