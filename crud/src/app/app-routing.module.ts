import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUserComponent } from './components/form-user/form-user.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'listar-times',
    component: UsersComponent,
  },
  {
    path: 'adicionar-usuario',
    component: FormUserComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}