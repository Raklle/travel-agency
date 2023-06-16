import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private authenticationService: AuthenticationService) {}

  signUp(email:string, password:string, username:string){
    this.authenticationService.signUp(email, password, username)
  }
}