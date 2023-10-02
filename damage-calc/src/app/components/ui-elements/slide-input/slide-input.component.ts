import { Component, Input, OnInit, Output} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-slide-input',
  templateUrl: './slide-input.component.html',
  styleUrls: ['./slide-input.component.scss']
})
export class SlideInputComponent implements OnInit {

  @Input() max = 10000;
  @Input() min = 0;
  @Input() default: number = this.min;
  @Input() step = 1;
  @Input() label = '';
  @Input() column = false;
  @Input() row = false;
  @Input() hint = '';

  @Output() slideValue: BehaviorSubject<number> = new BehaviorSubject(this.default);
  @Output() valueChange: BehaviorSubject<number> = new BehaviorSubject(this.default);

  value = 0;

  constructor(public screenService: ScreenService) { }

  ngOnInit(): void {
    this.value = this.default;
    this.slideValue.next(this.value)
    this.valueChange.next(this.value)
  }

  valueChanged(event: any) {
    this.slideValue.next(Number(event.target.value))
    this.valueChange.next(Number(event.target.value))
  }

  setValue(value: number) {
    this.value = value;
    this.valueChange.next(this.value)
  }

  overrideValue(value: number) {
    this.value = value;
    this.slideValue.next(value)
    this.valueChange.next(value)
  }
}
