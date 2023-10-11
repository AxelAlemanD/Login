import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-submit-button',
  templateUrl: './form-submit-button.component.html',
  styleUrls: ['./form-submit-button.component.scss']
})
export class FormSubmitButtonComponent {

  @Input({ required: true }) title: string = '';
  @Input({ required: true }) isFormValid: boolean = false;
  @Input({ required: true }) status: 'default' | 'loading' | 'success' = 'default';
  @Input() color: string = 'primary';
  @Input() successTitle: string = '';
  @Input() loadingTitle: string = '';
  @Output() onClick: EventEmitter<undefined> = new EventEmitter();

  emitClick() {
    this.onClick.emit();
  }
}
