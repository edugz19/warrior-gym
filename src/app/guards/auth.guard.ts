import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}
  
  async canActivate(): Promise<boolean> {
    const user = await this.authSvc.getActualUser();

    if (!user) {
      this.router.navigateByUrl('login');
      return false;
    } else {
      return true;
    }

  }
  
}
