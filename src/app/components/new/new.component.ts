import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/User';

import * as moment from 'moment';
import { UsersService } from 'src/app/services/users.service';
import { VariablesService } from 'src/app/services/variables.service';
import { ToastService } from 'src/app/services/toast.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent {
  abonos: SelectItem[];
  abono: string | undefined;

  date: Date;
  nombre: string;
  user: User;
  dni: string;
  users: User[];
  lastID: number;

  constructor(
    public router: Router,
    private varSvc: VariablesService,
    private usersSvc: UsersService,
    private toastSvc: ToastService
  ) {
    this.abonos = [
      { label: 'MENSUAL 10', value: 'MENSUAL 10' },
      { label: 'MENSUAL 20', value: 'MENSUAL 20' }
    ];
    this.usersSvc.getUsers().subscribe((res) => {
      this.varSvc.users = res;
      this.lastID = this.varSvc.users[this.varSvc.users.length - 1].id;
    });
  }

  saveUser() {
    if (
      this.nombre === undefined ||
      this.dni === undefined ||
      this.date === undefined ||
      this.nombre === '' ||
      this.dni === '' ||
      this.abono === undefined
    ) {
      this.toastSvc.showError('Error', 'Debes introducir todos los datos.');
    } else {
      this.user = {
        id: ++this.lastID,
        nombre: this.nombre.toUpperCase(),
        dni: this.dni.toUpperCase(),
        tipo_abono: this.abono.toUpperCase(),
        antiguedad: moment(this.date).format('DD-MM-YYYY'),
        fecha_alta: moment(this.date).format('DD-MM-YYYY'),
        fecha_renov: moment(this.date).add(1, 'month').format('DD-MM-YYYY'),
        puntos_warrior: 0,
        historico_puntos_warrior: 0,
        email: ''
      };

      console.log(this.user)


      try {
        this.usersSvc.addUser(this.user);
        this.toastSvc.showSuccess(
          'Usuario guardado',
          'El usuario se ha guardado correctamente'
        );
        this.router.navigateByUrl('/users');
      } catch (e) {
        console.log(e);
        this.toastSvc.showError('Error', 'Ha ocurrido un error al intentar guardar el usuario');
      }
    }
  }
}
