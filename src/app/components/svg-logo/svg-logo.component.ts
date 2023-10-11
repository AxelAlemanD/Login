import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-logo',
  templateUrl: './svg-logo.component.html',
  styleUrls: ['./svg-logo.component.scss']
})
export class SvgLogoComponent {

  @Input({ required: true }) type: 'default' | 'vertical' | 'only-icon' = 'default'

}
