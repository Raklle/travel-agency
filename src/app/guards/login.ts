import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root',
})

  export class LoginGuard implements CanActivate {
    canActivate():boolean{
      return this.auth.user.guest
    }
  
    constructor(private auth: AuthenticationService) {}
  }