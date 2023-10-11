import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormControlComponent } from '../components/form-control/form-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationPipe } from './pipes/validation/validation.pipe';
import { FormSubmitButtonComponent } from '../components/form-submit-button/form-submit-button.component';
import { SvgLogoComponent } from '../components/svg-logo/svg-logo.component';

@NgModule({
  declarations: [
    FormControlComponent,
    FormSubmitButtonComponent,
    ValidationPipe,
    SvgLogoComponent,
  ],
  exports: [
    FormControlComponent,
    FormSubmitButtonComponent,
    SvgLogoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
