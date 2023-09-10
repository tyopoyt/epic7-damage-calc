import { Component, Input, OnInit, Output} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScreenService } from 'src/app/services/screen.service';

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
  @Input() column: boolean = false;
  @Input() hint: string = '';

  @Output() change: BehaviorSubject<number> = new BehaviorSubject(this.default);
  @Output() valueChange: BehaviorSubject<number> = new BehaviorSubject(this.default);

  value: number = 0;

  thingy: any = 0;

  constructor(public screenService: ScreenService) { }

  ngOnInit(): void {
    this.value = this.default;
    this.change.next(this.value)
    this.valueChange.next(this.value)
  }

  valueChanged(event: any) {
    this.change.next(Number(event.target.value))
    this.valueChange.next(Number(event.target.value))
  }

  setValue(value: number) {
    this.value = value;
    this.valueChange.next(this.value)
  }
}
