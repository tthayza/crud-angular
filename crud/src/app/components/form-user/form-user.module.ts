import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/utils/angular-material.module';
import { HeaderModule } from '../header/header.module';
import { FormUserRoutingModule } from './form-user-routing.module';
import { FormUserComponent } from './form-user.component';

@NgModule({
  declarations: [FormUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormUserRoutingModule,
    HeaderModule,
    // NgxMaskDirective,
    // NgxMaskPipe,
  ],
  exports: [FormUserComponent],
  //providers: [provideNgxMask()],
})
export class FormUserModule {}
