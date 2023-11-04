import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario-model';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
  usuarioAtual!: Usuario;
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.usuarioAtual = this.data;
  }
  public onCancel(): void {
    this.dialogRef.close(false);
  }

  excluirUsuario(): void {
    this.dialogRef.close(true);
  }
}
