import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Time } from 'src/app/models/time-model';
import { Usuario } from 'src/app/models/usuario-model';
import { TimeService } from 'src/app/service/time.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent {
  @Input() usuarioAtual!: Usuario;
  @Input() editarUsuario: boolean = false;
  @Output() fechar = new EventEmitter<any>();
  public user?: Usuario;
  public userForm!: FormGroup;

  usuarios!: Usuario[];
  times!: Time[];

  tipos = ['ADMIN', 'FUNCIONARIO'];
  cargos = [
    'Dev Júnior',
    'Dev Pleno',
    'Dev Senior',
    'Tech Lead',
    'Product Owner',
    'Scrum Master',
  ];

  public phoneMask = '(00) 0 0000-0000';

  constructor(
    private fb: FormBuilder,
    private service: TimeService,
    private userservice: UsuarioService,
    private router: Router
  ) {
    this.service.getTimes().subscribe((res) => {
      this.times = res;
    });
  }

  ngOnInit() {
    this.buildForm(this.usuarioAtual);
  }

  public buildForm(usuario: Usuario): void {
    this.userForm = this.fb.group({
      id: [usuario?.id ?? ''],
      nome: [
        usuario?.nome ?? '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        usuario?.email ?? '',
        [Validators.required, Validators.email, Validators.minLength(8)],
      ],
      senha: [
        usuario?.senha ?? '',
        [Validators.required, Validators.minLength(3)],
      ],
      tipo: [usuario?.tipo ?? '', [Validators.required]],
      cargo: [usuario?.cargo ?? '', [Validators.required]],
      salario: [usuario?.salario ?? '', [Validators.required]],
      time: [usuario?.time ?? '', [Validators.required]],
    });
  }

  public onCancel(): void {
    if (this.editarUsuario) {
      this.fechar.emit(false);
    } else {
      this.router.navigate(['/listar-times']);
    }
  }

  public onSubmit(): void {
    if (this.editarUsuario) {
      this.userservice.editarUsuario(this.userForm.value).subscribe((res) => {
        this.fechar.emit(true);
      });
    } else {
      this.userservice.criarUsuario(this.userForm.value).subscribe((res) => {
        this.router.navigate(['/listar-times']);
      });
    }
  }
}

// this.userservice.getUsuarios().subscribe((res) => {
//   if (res) {
//     this.usuarios = res;
//     this.buildTimes();
//     this.router.navigate(['/listar-times']);
//   } else {
//     res.error;
//   }
// });
// console.log(this.userForm.value);
//this.dialogRef.close(this.user);
// ngOnChanges(changes: SimpleChanges) {
//   // changes.prop contains the old and the new value...
//   console.log(changes);
// }
// if (this.data) {
//   this.editarUsuario = true;
//   this.usuarioAtual = this.data;
//   this.buildForm(this.usuarioAtual);
// } else {
//   this.editarUsuario = false;
//   this.buildForm(this.usuarioAtual);
// }
