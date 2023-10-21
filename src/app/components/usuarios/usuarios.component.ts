import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Table } from 'primeng/table';
import { User } from 'src/app/models/User';

import * as moment from 'moment';
import { UsersService } from 'src/app/services/users.service';
import { VariablesService } from 'src/app/services/variables.service';
import { ToastService } from 'src/app/services/toast.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
  users: User[];
  @ViewChild('dt1') table: Table;
  input: string;
  today = moment().format('DD/MM/YYYY');
  visible: boolean = false;
  userInfo: any;

  constructor(
    private usersSvc: UsersService,
    public router: Router,
    public varSvc: VariablesService,
    private confirmationService: ConfirmationService,
    private toastSvc: ToastService
  )
  {
    this.usersSvc.getUsers().subscribe((res) => {
      this.users = res;
      this.varSvc.users = res;
    });
  }

  clear(table: Table) {
    table.clear();
    this.input = '';
  }

  resetInput() {
    this.input = '';
    this.clear(this.table);
  }

  getStatus(fecha_renov: string) {
    if (moment(fecha_renov, 'DD/MM/YYYY') >= moment()) return 'success';
    else return 'danger';
  }

  getLabel(fecha_renov: string) {
    if (moment(fecha_renov, 'DD/MM/YYYY') >= moment()) return 'Activo';
    else return 'Inactivo';
  }

  deleteUser(id: string, event: Event) {
    this.confirmationService.confirm({
      header: 'Confirmar borrado',
      message: '¿Estás seguro de que quieres eliminar a este usuario?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.usersSvc.deleteUser(id);
          this.clear(this.table);
          this.toastSvc.showInfo('Usuario eliminado', 'El usuario ha sido eliminado correctamente');
        } catch (e) {
          this.toastSvc.showError('Error', 'Ha ocurrido un error al eliminar este usuario');
        }
      }
    });
  }

  viewUserInfo(dni: string) {
    this.visible = true;
    this.userInfo = this.users.find((user: any) => user.dni == dni);
  }
}
