import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {

  /**
   * Validates that the password contains 6 characters, 
   * where at least one is uppercase, one lowercase and one number
   * @returns Pattern that validates the password
   */
  static password(): ValidatorFn {
    return Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/);
  }

  static passwordMatch(passwordControl: AbstractControl, confirmPasswordControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (passwordControl && confirmPasswordControl) {
        if (passwordControl.value !== confirmPasswordControl.value) {
          return { 'mismatch': true };
        }
      }
      return null;
    };
  }
}
