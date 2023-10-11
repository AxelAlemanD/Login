import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from 'src/app/shared/utils/custom-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  form!: FormGroup;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  resetPasswordStatus: 'default' | 'loading' | 'success' = 'default';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this._buildForm();
  }

  private _buildForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          CustomValidators.password()
        ])
      ],
      confirmPassword: '',
    });

    form.controls['confirmPassword']?.setValidators([
      Validators.required,
      CustomValidators.passwordMatch(form.controls['password'], form.controls['confirmPassword']),
    ]);

    return form;
  }

  togglePasswordVisibilty(controlName: 'password' | 'confirmPassword') {
    if (controlName === 'password') {
      this.isPasswordVisible = !this.isPasswordVisible;
    } else {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }
  }

  resetPassword() {
    this.resetPasswordStatus = 'loading';
    const { confirmPassword, ...credentials } = this.form.value;
    this.authService.resetPassword(credentials).subscribe({
      next: async (response) => {
        const toast = await this.toastController.create({
          message: response.message,
          duration: 2500,
          position: 'top',
          cssClass: 'alert alert-success',
          icon: 'checkmark-circle'
        });
        await toast.present();
        this.resetPasswordStatus = 'success';
        this.router.navigate(['/home']);
      },
      error: async (error) => {
        const toast = await this.toastController.create({
          message: error,
          duration: 3500,
          position: 'top',
          cssClass: 'alert alert-danger',
          icon: 'alert-circle'
        });
        await toast.present();
        this.resetPasswordStatus = 'default';
      }
    });
  }
}
