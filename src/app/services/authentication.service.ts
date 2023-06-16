import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, Persistence, inMemoryPersistence, browserLocalPersistence, browserSessionPersistence} from "firebase/auth";
import { User } from '../User';
import { FirestoreServiceService } from './firestore-service.service';
import { first } from 'rxjs';
import { onAuthStateChanged } from "firebase/auth";
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {

  userr:User = {
    email: '',
    username:'',
    guest: true,
    client:false,
    manager: false,
    admin: false,
    banned: false,
  };
  uid = ''
  public user = this.userr
  auth = getAuth();
  persist: Persistence = browserLocalPersistence

  constructor(private router: Router, private db: FirestoreServiceService, private cart: CartService) {
    const auth = getAuth();

    
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        this.uid = ''
      }
      this.updateUser()
    });
    console.log(this.user)
    console.log(this.auth.currentUser)
  }

signUp(email:string, password:string, userName:string){
  setPersistence(this.auth, this.persist)
  .then(() => {
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then((res) => {
      let newUser:User = {
        email: email,
        username: userName,
        guest: false,
        client:true,
        manager: false,
        admin: false,
        banned: false,
      }
      this.db.addUser(newUser, res.user.uid)
      this.uid = res.user.uid
      this.updateUser()
      this.router.navigate(['tours']);
      console.log(this.user)
    })
    .catch((error) => {
      window.alert(error.message);
    });
  })
  .catch((error) => {
    window.alert(error.message);
  });
    }

login(email:string, password:string){
  signInWithEmailAndPassword(this.auth, email, password)
    .then((res) => {
      this.uid = res.user.uid
      this.updateUser()
      this.router.navigate(['tours']);
    })
    .catch((error) => {
      window.alert(error.message);
    });
}

logout(){
  this.auth.signOut()
  .then((res) => {
    this.uid = ''
    this.updateUser()
    this.router.navigate(['']);

  })
  .catch((error) => {
    window.alert(error.message);
  });
}

updateUser(){
    this.db.getUserById(this.uid).pipe(first()).subscribe((res:any) => {
      this.user = res;
    });  
}

updatePersistence(x:string){
  if(x === 'local'){
    this.persist = browserLocalPersistence
  }else if(x === 'session'){
    this.persist = browserSessionPersistence
  }else{
    this.persist = inMemoryPersistence
  }
  setPersistence(this.auth, this.persist)
  console.log(this.persist)
}

}
