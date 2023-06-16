import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root',
})

export class ManagerGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService){}
  canActivate(): boolean{
    if(this.auth.user.manager != true) {
      this.router.navigate([''])
      }  
    return true
}
  }
