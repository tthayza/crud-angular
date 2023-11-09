import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Time } from 'src/app/models/time-model';
import { Usuario } from 'src/app/models/usuario-model';
import { TimeService } from 'src/app/service/time.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent {
  public user?: Usuario;
  public userForm!: FormGroup;

  usuarios!: Usuario[];
  times!: Time[];
  editarUsuario: boolean = false;
  usuarioAtual!: Usuario;
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
    public dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: TimeService
  ) {
    this.service.getTimes().subscribe((res) => {
      this.times = res;
    });
    if (this.data) {
      this.editarUsuario = true;
      this.usuarioAtual = this.data;
      this.buildForm(this.usuarioAtual);
    } else {
      this.editarUsuario = false;
      this.buildForm(this.usuarioAtual);
    }
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
    this.dialogRef.close(this.user);
  }

  fechar(event: any): void {
    this.dialogRef.close(event);
  }

  public onSubmit(): void {
    this.dialogRef.close(this.userForm.value);
  }
}
// if (this.editarUsuario) {
//   this.userservice.editarUsuario(this.userForm.value).subscribe((res) => {
//     this.fechar.emit(true);
//   });
// } else {
//   this.userservice.criarUsuario(this.userForm.value).subscribe((res) => {
//     this.router.navigate(['/listar-times']);
//   });
// }
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

// private buildTimes() {
//   this.times.forEach((time) => {
//     time.funcionarios = this.usuarios.filter(
//       (usuario) => usuario.time === time.nome
//     );
//   });
// }
