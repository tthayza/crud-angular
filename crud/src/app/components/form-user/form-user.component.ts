import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Time } from 'src/app/models/time-model';
import { Usuario } from 'src/app/models/usuario-model';
import { TimeService } from 'src/app/service/time.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent {
  public user?: Usuario;
  public userForm!: FormGroup;

  editarUsuario: boolean = false;

  usuarioAtual!: Usuario;
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
    public dialogRef: MatDialogRef<FormUserComponent>,
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
    this.dialogRef.close();
  }

  public onSubmit(): void {
    console.log(this.userForm.value);
    this.dialogRef.close(this.userForm.value);
    //this.user = this.userForm.value;
    //this.dialogRef.close(this.user);
  }
}
