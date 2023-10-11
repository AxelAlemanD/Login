import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from 'src/app/shared/utils/custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  form!: FormGroup;
  isPasswordVisible: boolean = false;
  signUpStatus: 'default' | 'loading' | 'success' = 'default';
  isConfirmPasswordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this._buildForm();
  }

  async ionViewWillEnter() {
    if (this.form) {
      this.form.reset();
      this.signUpStatus = 'default';
    }
  }

  private _buildForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
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

  signUp() {
    this.signUpStatus = 'loading';
    const {confirmPassword, ...credentials} = this.form.value;
    this.authService.signUp(credentials).subscribe({
      next: async (response) => {
        const toast = await this.toastController.create({
          message: response.message,
          duration: 2000,
          position: 'top',
          cssClass: 'alert alert-success',
          icon: 'checkmark-circle'
        });
        await toast.present();
        this.signUpStatus = 'success';
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
        this.signUpStatus = 'default';
      } 
    })
  }
}
