import { Component, OnInit } from '@angular/core';
import { Tour, tours } from '../../assets/tours';
import { CartService } from '../services/cart.service';
import { AuthenticationService } from '../services/authentication.service';
import { FirestoreServiceService } from '../services/firestore-service.service';
import { AvalibilityService } from '../services/avalibility.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  tour :any = []
  displayedColumns: string[] = ['name', 'destination', 'startDate', 'endDate', 'quantity', 'total', 'buy']
  dataSource = this.tour

  constructor(public cartService : CartService, private auth : AuthenticationService, private dbService:FirestoreServiceService, private avService : AvalibilityService){ }

  ngOnInit(): void {
    this.cartService.getTours().subscribe(
      list => 
      this.dataSource = list
    )
  }

  buy(tour:any){
    this.dbService.addBought(tour, this.auth.uid, tour.quantity)
    this.dbService.updateTour(tour.id, tour.quantity)
    this.cartService.buyFromCart(tour)
    this.avService.removeReserved(tour.id)
  }

}
