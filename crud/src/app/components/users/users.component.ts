import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Time } from 'src/app/models/time-model';
import { Usuario } from 'src/app/models/usuario-model';
import { TimeService } from 'src/app/service/time.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @Input() public usuario?: Usuario;
  usuarios!: Usuario[];
  times!: Time[];
  panelOpenState = false;
  constructor(
    private dialog: MatDialog,
    private service: UsuarioService,
    private serviceTimes: TimeService
  ) {
    console.log(this.service.getTeste());
    this.service.getUsuarios().subscribe((res) => {
      if (res) {
        this.usuarios = res;
        this.serviceTimes.getTimes().subscribe((res) => {
          this.times = res;

          this.buildTimes();
        });
      } else {
        res.error;
      }
    });
    this.service.setTeste();
  }

  private buildTimes() {
    this.times.forEach((time) => {
      time.funcionarios = this.usuarios.filter(
        (usuario) => usuario.time === time.nome
      );
    });
  }

  openDialogDeleteUser(usuario: Usuario) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      disableClose: true,
      width: '60%',
      data: usuario,
    });
    dialogRef.afterClosed().subscribe((devolutivaModal: Usuario) => {
      if (devolutivaModal) {
        this.service.excluirUsuario(usuario).subscribe((res) => {
          this.service.getUsuarios().subscribe((res) => {
            if (res) {
              this.usuarios = res;
              this.buildTimes();
            } else {
              res.error;
            }
          });
        });
      } else {
        alert('não foi excluído');
      }
    });
  }

  openDialogCreateUser() {
    const dialogRef = this.dialog.open(FormUserComponent, {
      disableClose: true,
      width: '80%',
    });

    dialogRef.afterClosed().subscribe((devolutivaModal: Usuario) => {
      console.log('foi invocado');
      if (devolutivaModal) {
        this.service.criarUsuario(devolutivaModal).subscribe((res) => {
          console.log(res);
          this.service.getUsuarios().subscribe((res) => {
            if (res) {
              this.usuarios = res;
              this.buildTimes();
            } else {
              res.error;
            }
          });
        });
      }
    });
  }

  openDialogEditUser(usuario: Usuario) {
    const dialogRef = this.dialog.open(FormUserComponent, {
      disableClose: true,
      width: '80%',
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((devolutivaModal: Usuario) => {
      if (devolutivaModal) {
        this.service.editarUsuario(devolutivaModal).subscribe((res) => {
          console.log(res);
          this.service.getUsuarios().subscribe((res) => {
            if (res) {
              this.usuarios = res;
              this.buildTimes();
            } else {
              res.error;
            }
          });
        });
      }
    });
  }
}
