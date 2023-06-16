import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { CartService } from '../services/cart.service';
import { AvalibilityService} from '../services/avalibility.service';
import { FirestoreServiceService, IdTour} from '../services/firestore-service.service';



export interface Status{
  id: string;
  disabled: boolean;
}


@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit{

  private _highlight = '0';
  private _tour = { 
    id:"",
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    price: 0,
    capacity: 0,
    avalible: 0,
    about:"",
    image: ""
    };
  tourStatus ='linear-gradient(34deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 45%, rgba(112,255,0,1) 100%)'
  imgPath = ''
  quantity = 0;
  avalible = 0;
  reserved = 0;
  comments:any = []
  average = 0 
  counter = 0;
  highlightColor = '2px 2px 4px grey';

  constructor(public cartService : CartService, private avService : AvalibilityService, private dbService: FirestoreServiceService){

  }

  @Input()
  get tour(): IdTour { 
    return this._tour; }
  set tour(tour: IdTour) {
    this._tour = tour;
  }

  @Input()
  get highlight(): string { 
    return this._highlight; }
  set highlight(highlight: string) {
    this._highlight = highlight;
  }

  @Output() emitStatus = new EventEmitter<Status>();

  ngOnInit(){
    this.reserved = this.avService.getReserved(this.tour.id)
    this.updateStatus()
    this.imgPath = '../../assets/' + this.tour.image
    this.dbService.getComments(this.tour.id).subscribe((res:any) => {
      this.comments = res;
      if(this.comments != undefined){
         this.getAverageRating()
      }else{
        this.comments = []
      }
    });
  }

  buyTour(){
    console.log(this.tour)
    this.avService.reserveTour(this.tour)
    this.reserved = this.avService.getReserved(this.tour.id)
    this.cartService.addToCart(this.tour)
    this.updateStatus()
  }

  returnTour(){
    this.avService.unreserveTour(this.tour)
    this.cartService.removeFromCart(this.tour)
    this.reserved = this.avService.getReserved(this.tour.id)
    this.updateStatus()
  }

  updateStatus():void{
    if(this.tour.avalible - this.reserved == 0 ){
      this.tourStatus ='linear-gradient(34deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 45%, rgba(255,0,0,1) 100%)'
      this.emitStatus.emit({
        id: this.tour.id,
        disabled: true,
      });
    }else if(this.tour.avalible - this.reserved <= 3){
      this.tourStatus ='linear-gradient(34deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 45%, rgba(255,128,0,1) 100%)'
      this.emitStatus.emit({
        id: this.tour.id,
        disabled: false,
      });
    }else{
      this.tourStatus ='linear-gradient(34deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 45%, rgba(112,255,0,1) 100%)'
      this.emitStatus.emit({
        id: this.tour.id,
        disabled: false,
      });
    }
  }

  deleteThis(){
    this.updateStatus()
    this.dbService.deleteTour(this.tour.id)
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
}
