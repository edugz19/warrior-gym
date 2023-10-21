import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';
import { VariablesService } from 'src/app/services/variables.service';

import * as moment from 'moment';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  abonos: SelectItem[];
  abono: string | undefined | any;

  fecha_alta: Date;
  fecha_renov: Date;
  nombre: string | undefined;
  puntos_warrior: number;
  puntos_warrior_string: string;
  historico_puntos_warrior: number;
  antiguedad: string;
  user: User;
  dni: string;
  users: User[];
  id: number;
  email: string | undefined;

  constructor(
    public router: Router,
    private usersSvc: UsersService,
    private toastSvc: ToastService
  ) {
    this.abonos = [
      { label: 'MENSUAL 10', value: 'MENSUAL 10' },
      { label: 'MENSUAL 20', value: 'MENSUAL 20' },
    ];
    let url = this.router.url.split('/');
    this.dni = url[2];
  }

  ngOnInit() {
    this.usersSvc.getUserwithID(this.dni).subscribe((res) => {
      this.id = res!.id;
      this.nombre = res!.nombre;
      this.abono = res!.tipo_abono;
      this.antiguedad = res!.antiguedad;
      this.fecha_alta = new Date(
        moment(res!.fecha_alta, 'DD-MM-YYYY').format()
      );
      this.fecha_renov = new Date(
        moment(res!.fecha_renov, 'DD-MM-YYYY').format()
      );
      this.puntos_warrior = res!.puntos_warrior;
      this.puntos_warrior_string = this.puntos_warrior.toString();
      this.historico_puntos_warrior = res!.historico_puntos_warrior;
      this.email = res!.email;
    });
  }

  saveUser() {
    if (
      this.nombre === undefined ||
      this.dni === undefined ||
      this.fecha_alta === undefined ||
      this.fecha_renov === undefined ||
      this.nombre === '' ||
      this.dni === '' ||
      this.abono === undefined
    ) {
      this.toastSvc.showError('Error', 'Debes introducir todos los datos.');
    } else {
      this.user = {
        id: this.id,
        nombre: this.nombre.toUpperCase(),
        dni: this.dni.toUpperCase(),
        tipo_abono: this.abono.toUpperCase(),
        antiguedad: this.antiguedad,
        fecha_alta: moment(this.fecha_alta).format('DD-MM-YYYY'),
        fecha_renov: moment(this.fecha_alta)
          .add(1, 'month')
          .format('DD-MM-YYYY'),
        puntos_warrior: this.puntos_warrior,
        historico_puntos_warrior: this.historico_puntos_warrior,
        email: this.email
      };

      try {
        this.usersSvc.editUser(this.user);
        this.toastSvc.showSuccess(
          'Usuario guardado',
          'El usuario se ha guardado correctamente'
        );
        this.router.navigateByUrl('/users');
      } catch (e) {
        console.log(e);
        this.toastSvc.showError(
          'Error',
          'Ha ocurrido un error al intentar guardar el usuario'
        );
      }
    }
  }

  getSeverity(n: number) {
    if (n > 0) return 'success';
    else return 'danger';
  }

  addWarriorPoint() {
    this.puntos_warrior++;
    this.historico_puntos_warrior++;
    this.puntos_warrior_string = this.puntos_warrior.toString();
  }

  clearWarriorPoint() {
    this.puntos_warrior = 0;
    this.puntos_warrior_string = this.puntos_warrior.toString();
  }
}
