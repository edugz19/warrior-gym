import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string;
  password: string;
  showPass: boolean = false;

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {

  }

  async login() {
    if (this.email === undefined || this.password === undefined || this.email === '' || this.password === '') {
      // this.toastSvc.showError('Error', 'El email o la contraseña son incorrectos');
    } else {

      try {
        const user = await this.authSvc.login(this.email, this.password);

        if (user) {
          this.router.navigateByUrl('');
        }

      } catch (e) {
        // this.toastSvc.showError('Error', 'El email o la contraseña son incorrectos');
        alert('Data error');
      }

    }
  }

}
