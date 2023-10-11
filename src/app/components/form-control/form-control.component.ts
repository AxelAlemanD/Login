import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { errorMessages } from 'src/app/shared/utils/error-messages';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormControlComponent,
      multi: true,
    },
  ],
})
export class FormControlComponent implements OnInit, ControlValueAccessor {

  innerValue: any;
  isFocused: boolean = false;
  isRequired: boolean = false;
  errorMessages = errorMessages;
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) type: 'text' | 'email' | 'password' = 'text';
  @Input({ required: true }) control!: AbstractControl;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() helper: string = '';
  @Input() hasAppend: boolean = false;
  @Input() appendIcon: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Output() onClickAppend: EventEmitter<undefined> = new EventEmitter();

  ngOnInit(): void {
    this.validateControlConfig();
    this.isRequired = this._hasTheRequiredValidator();
  }

  onChange = (value: any) => { };
  onTouched = (value: any) => { };
  onBlur = () => this.isFocused = false;
  onFocused = () => this.isFocused = true;
  writeValue = (value: any) => this.innerValue = value;
  registerOnChange = (fn: any) => this.onChange = fn;
  registerOnTouched = (fn: any) => this.onTouched = fn;

  validateControlConfig() {
    if (this.hasAppend && !this.appendIcon) {
      throw new Error('Without append to show, set a value to appendIcon or set hasAppend = false.');
    }
  }

  private _hasTheRequiredValidator(): boolean {
    if (this.control && this.control.validator) {
      const validator = this.control.validator({} as AbstractControl);
      return validator && validator['required'];
    }
    return false;
  }

  emitAppendClick() {
    this.onClickAppend.emit();
  }

}
