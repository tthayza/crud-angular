import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/utils/angular-material.module';
import { HeaderModule } from '../header/header.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    UsersRoutingModule,
    HeaderModule,
    // NgxMaskDirective,
    // NgxMaskPipe,
  ],
  //providers: [provideNgxMask()],
})
export class UsersModule {}
