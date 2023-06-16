import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root',
})

  export class ClientGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthenticationService){}
    canActivate(): boolean{
      if(this.auth.user.client != true) {
        this.router.navigate([''])
        }  
      return true
  }
  }