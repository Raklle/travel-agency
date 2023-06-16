import { Component, ViewEncapsulation, ViewChild, OnInit  } from "@angular/core";
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { FirestoreServiceService } from "../services/firestore-service.service";
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from "../services/authentication.service";
import { CartService } from "../services/cart.service";
import { AvalibilityService } from "../services/avalibility.service";

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-single-tour',
  templateUrl: './single-tour.component.html',
  styleUrls: ['./single-tour.component.css']
})
export class SingleTourComponent {
  id: any;
  tour:any
  comments:any;
  rating = 0
  average = 0 
  message = ''
  valid:boolean = false
  error = ''
  validForComment = false
  finished = false
  reserved = 0

  private subscription: Subscription | undefined
  constructor(private route: ActivatedRoute, private db: FirestoreServiceService, public auth:AuthenticationService, public cartService : CartService, private avService : AvalibilityService) {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id']
      console.log(this.id)
    })
    this.db.getTourById(this.id).subscribe((res:any) => {
      this.tour = res;
      Object.assign(this.tour, {id:this.id})
      console.log(this.tour)
      this.reserved = this.avService.getReserved(this.tour.id)
    });
    this.db.getComments(this.id).subscribe((res:any) => {
      this.comments = res;
      console.log(this.comments)
      this.getAverageRating()
      console.log(`nowy rating: ${this.average}`)
      this.db.updateRating(this.id, this.average)
    });
    this.db.isValidForComment(this.id, this.auth.uid).subscribe((res:any) => {

      if(res != undefined && res.quantity > 0){
        this.validForComment = true
      }
      if(this.auth.user.manager == true){
        this.validForComment = true
      }
      if(this.auth.user.banned == true){
        this.validForComment = false
      }
              let end = new Date(this.tour.endDate);
              let today = new Date
              if (end < today) {
                this.finished  = true
              }      
    });
  }

  updateRating(e:any){
      this.rating = e
      this.isValid()
  }



  updateText(){
    this.isValid()
  }

  isValid(){
    if(this.rating == 0){
      this.valid=false
      this.error = 'wymagana ocena wycieczki'
      return
    }
    if(this.message.length < 50 && this.message.length > 0 || this.message.length > 500){
      this.valid = false
      this.error = 'wymagana długość między 50 a 500'
      return
    }
    if(this.message.length == 0){
      this.valid = false
      this.error = 'wymagany komentarz'
      return
    }
    this.valid = true
    this.error = '' 
  }

  onSubmit() {
    this.db.addComment(this.id,
    {
      rating:this.rating,
      comment: this.message,
      name:this.auth.user.username
    }, this.auth.uid)
    this.message = ''
    this.rating = 0
  }

  getAverageRating(){
    if(this.comments == undefined || this.comments.length == 0){
      return
    }
    let sum = 0
   let ratings = this.comments.map((element:any)=>{
      sum += parseInt(element.rating)
      return parseInt(element.rating)
   })
   this.average = Math.round( sum / ratings.length);
  }

  buyTour(){
    console.log(this.tour)
    this.avService.reserveTour(this.tour)
    this.reserved = this.avService.getReserved(this.tour.id)
    this.cartService.addToCart(this.tour)
  }

  returnTour(){
    this.avService.unreserveTour(this.tour)
    this.cartService.removeFromCart(this.tour)
    this.reserved = this.avService.getReserved(this.tour.id)
  }

}
