import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent {

  @Input({ required: true }) title: string = '';
  @Input({ required: true }) icon: string = '';
  @Input({ required: true }) quantity: number = 0;
  @Input({ required: true }) percentage: number = 0;
  @Input({ required: true }) type: 'quantity' | 'money' = 'quantity';

}
