import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user?: any;
  users?: any[];

  createUser: any = {
    nome: 'thayza',
    profissao: 'dev',
    dataNascimento: '1998-09-08T00:00:00.000Z',
    email: 'thayza@gmail.com',
    password: '1222',
    telefone: '66666666',
    endereco: {
      street: 'padre 123',
      number: 99,
      complement: 'arvore',
      state: 'sp',
      city: 'sc',
      neighborhood: 'ze',
      zipCode: '55555555',
    },
  };

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('USERS') || '[]');

    const usuarioAutenticado = JSON.parse(
      localStorage.getItem('USER') || 'null'
    );

    if (usuarioAutenticado) {
      this.user = usuarioAutenticado;
    }
    this.users?.push(this.createUser);
    localStorage.setItem('USERS', JSON.stringify(this.users));
  }

  fazerLogin(user: any) {
    const userExist: any = this.users?.find((u) => u.email === user.email);
    console.log(user.userExist);
    if (userExist) {
      console.log('usuário autenticado! ✔', userExist);
      this.user = userExist;
      localStorage.setItem('USER', JSON.stringify(this.user));
    } else {
      console.log('falha no login');
    }
    console.log(user);

    // fazer login
  }
}
