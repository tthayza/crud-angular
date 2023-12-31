import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user?: any;
  form!: FormGroup;
  usuario!: any;
  usuarios!: any[];

  constructor(
    private fb: FormBuilder,
    private service: UsuarioService,
    private router: Router
  ) {
    this.buildForm();
    this.service.getUsuarios().subscribe((res) => {
      this.usuarios = res;
    });
  }
  ngOnInit(): void {
    const usuarioAutenticado = JSON.parse(
      localStorage.getItem('USER') || 'null'
    );
    if (usuarioAutenticado) {
      this.usuario = usuarioAutenticado;
    }
  }

  buildForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.minLength(3)]],
      senha: [null, [Validators.required]],
    });
  }

  login(): void {
    this.user = { email: this.form.value.email, senha: this.form.value.senha };
    this.fazerLogin(this.usuario);
  }
  fazerLogin(user: any) {
    const existeUsuario: any | undefined = this.usuarios?.find(
      (u) => u.email === user.email && u.senha === user.senha
    );

    if (existeUsuario) {
      console.log('Usuário autenticado', existeUsuario);
      this.usuario = existeUsuario;
      localStorage.setItem('USER', JSON.stringify(this.usuario));
      localStorage.setItem('TIMETOKEN', JSON.stringify(new Date().getTime()));
      this.router.navigate(['/listar-times']);
    } else {
      console.log('Falha no login');
    }
  }
}
