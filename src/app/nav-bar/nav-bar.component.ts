import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FirestoreServiceService, NewTour} from '../services/firestore-service.service';
import { AuthenticationService } from '../services/authentication.service';






@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  reserved: number;
  newTours: any;
  user:any;
  tour :any = []
  displayedColumns: string[] = ['name', 'destination', 'startDate', 'endDate', 'quantity', 'total'];
  dataSource = this.tour;

  constructor(private cartService : CartService,private dbService : FirestoreServiceService, public auth : AuthenticationService){
    this.dbService.getTours().subscribe((res:any) => {
      this.newTours = res;

    });
  }

  ngOnInit(): void {
    this.cartService.getTours().subscribe(
      list =>{
      this.dataSource = list
      this.reserved = this.getReservedNumber()
      }
    )
  }

  getReservedNumber():number{
    let resNumber = 0;
    this.dataSource.map((a:any)=>{
      resNumber = resNumber + a.quantity
    })
    return resNumber
  }

  log():void{
    console.log(this.auth.user)
  }

  setCurrency(c:string){
    this.cartService.setCurrency(c)
  }

}
