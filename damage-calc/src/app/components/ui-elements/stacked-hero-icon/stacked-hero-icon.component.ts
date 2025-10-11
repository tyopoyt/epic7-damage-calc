import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stacked-hero-icon',
  templateUrl: './stacked-hero-icon.component.html',
  styleUrl: './stacked-hero-icon.component.scss',
  standalone: false
})
export class StackedHeroIconComponent {

  @Input() heroID = 'abigail';
}
