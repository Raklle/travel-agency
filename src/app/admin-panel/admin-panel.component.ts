import { Component, OnInit } from '@angular/core';
import { FirestoreServiceService } from '../services/firestore-service.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit  {

  users:any = []
  types = ['local', 'session', 'none']
  selectedValue = 'local'
  displayedColumns: string[] = ['username', 'email','manager', 'admin', 'banned'];
  dataSource = this.users;

  constructor(private dbService : FirestoreServiceService,public auth: AuthenticationService){}
  ngOnInit(): void {
    this.dbService.getUsers().subscribe(
      (res:any) => {
        this.users = res
        this.dataSource = this.users;
    })
}

  updateBan(uid : string, state:boolean){
    state = !state
    this.dbService.updateUser(uid, {banned: state})
  }
  updateAdmin(uid : string, state:boolean){
    state = !state
    this.dbService.updateUser(uid, {admin: state})
  }
  updateManager(uid : string, state:boolean){
    state = !state
    this.dbService.updateUser(uid, {manager: state})
  }
  updatePersistence(value:string){
    this.auth.updatePersistence(value)
  }
}
