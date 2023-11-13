import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { FormUserModule } from './components/form-user/form-user.module';
import { cepMaskPipe } from './pipes/cep-mask.pipe';
import { AngularMaterialModule } from './utils/angular-material.module';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    cepMaskPipe,
    DeleteUserComponent,
    EditFormComponent,
    // HeaderComponent,
  ],
  // exports: [HeaderComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    AngularMaterialModule,
    AppRoutingModule,
    FormUserModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
