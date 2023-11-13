import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/utils/angular-material.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    // NgxMaskDirective,
    // NgxMaskPipe,
  ],
  exports: [HeaderComponent],
  //providers: [provideNgxMask()],
})
export class HeaderModule {}
