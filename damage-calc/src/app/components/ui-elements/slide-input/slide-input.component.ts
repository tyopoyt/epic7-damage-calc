import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slide-input',
  templateUrl: './slide-input.component.html',
  styleUrls: ['./slide-input.component.scss']
})
export class SlideInputComponent implements OnInit {

  @Input() max: number = 10000;
  @Input() min: number = 0;
  @Input() default: number = this.min;
  @Input() step: number = 1;
  @Input() label: string = '';

  @Output() change: EventEmitter<number> = new EventEmitter();

  value: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.value = this.default;
    console.log(this.step)
  }
}
