import { Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-number-input-group',
  templateUrl: './number-input-group.component.html',
  styleUrls: ['./number-input-group.component.scss']
})
export class NumberInputGroupComponent implements OnInit {

  @Input() value: BehaviorSubject<number> = new BehaviorSubject(0);
  @Input() max: number = 10000;
  @Input() min: number = 0;
  @Input() default: number = this.min;
  @Input() step: number = 1;
  @Output() valueChange: BehaviorSubject<number> = new BehaviorSubject(this.default);

  numberValue: number = 0;


  ngOnInit() {
    this.value.subscribe(value => {
      this.numberValue = value;
    })
  }

  minus() {
    if (this.numberValue - this.step >= this.min) {
      this.numberValue -= this.step;
      this.valueChange.next(this.numberValue);
    }
  }

  plus() {
    if (this.numberValue + this.step <= this.max) {
      this.numberValue += this.step;
      this.valueChange.next(this.numberValue);
    }
  }

  valueUpdated(event: any) {
    this.numberValue = Number(event.target.value);
    this.valueChange.next(Number(event.target.value))
  }
}
