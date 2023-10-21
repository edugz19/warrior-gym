import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { VariablesService } from 'src/app/services/variables.service';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  data: any;
  options: any;
  activos: number = 0;
  inactivos: number = 0;
  today = moment().format('DD/MM/YYYY');
  users: User[];

  constructor(
    private usersSvc: UsersService,
    public router: Router,
    public varSvc: VariablesService,
  ) {
    this.usersSvc.getUsers().subscribe(res => {
      this.varSvc.users = res;
      
      res.forEach(user => {
        if (moment(user.fecha_renov, 'DD/MM/YYYY') >= moment()) {
          this.activos++
        } else {
          this.inactivos++;
        }
      });

      const documentStyle = getComputedStyle(document.documentElement);
    

    this.data = {
      labels: ['Activos', 'Inactivos'],
      datasets: [
        {
          data: [this.activos, this.inactivos],
          backgroundColor: [
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--green-300'),
            documentStyle.getPropertyValue('--red-300'),
          ],
        },
      ],
    };

    this.options = {
      cutout: '50%',
      plugins: {
        legend: {
          labels: {
            color: 'white',
          },
        },
      },
    };

    });
  }
}
