import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private toastSvc: ToastService
  ) { }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;

    } catch (error) {
      // this.toastSvc.showError('Error', 'El correo electrónico o la contraseña son incorrectos.');
    }
  }

  async logout() {
    await this.afAuth.signOut();
  }

  getActualUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
  
}
