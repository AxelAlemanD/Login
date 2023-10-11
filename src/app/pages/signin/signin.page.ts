import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from 'src/app/shared/utils/custom-validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  form!: FormGroup;
  isPasswordVisible: boolean = false;
  signInStatus: 'default' | 'loading' | 'success' = 'default';
  showInvalidCredentials: boolean = false;

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
      this.signInStatus = 'default';
    }
  }

  private _buildForm(): FormGroup {
    return this.formBuilder.group({
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
      remember: { value: false, disabled: false },
    });
  }

  togglePasswordVisibilty() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  signIn() {
    this.signInStatus = 'loading';
    this.form.disable();
    const { remember, ...credentials } = this.form.value;
    this.authService.login(credentials, remember).subscribe({
      next: async (response) => {
        const toast = await this.toastController.create({
          message: response.message,
          duration: 2000,
          position: 'top',
          cssClass: 'alert alert-success',
          icon: 'checkmark-circle'
        });
        await toast.present();
        this.signInStatus = 'success';
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
        this.form.enable();
        this.signInStatus = 'default';
      }
    });
  }
}
