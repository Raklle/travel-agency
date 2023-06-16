import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = []
  public tourList = new BehaviorSubject<any>([])
  currency = 'zloty'
  
  constructor() { }

  getTours(){
    return this.tourList.asObservable()
  }

  setTour(tour : any){
    this.cartItemList.push(...tour)
    this.tourList.next(this.cartItemList)
  }

  addToCart(tour : any){
    let found = false
    this.cartItemList.map((a:any)=>{
      if(tour.id === a.id){
        a.quantity = a.quantity + 1
        a.total = a.quantity * a.price
        found = true
      }
      return a 
    })
    if(found){
      this.tourList.next(this.cartItemList)
      console.log(this.cartItemList)
      return
    }

    this.cartItemList.push(tour)
    Object.assign(tour,{quantity:1, total: tour.price})
    this.tourList.next(this.cartItemList)
  }

  getCartById(id:string){
    let singleTour = this.cartItemList.find((element:any) => element.id == id)
    return singleTour.asObservable()
  }

  removeFromCart(tour:any){
    this.cartItemList.map((a:any)=>{
      if(tour.id === a.id){
        a.quantity = a.quantity - 1
        a.total = a.quantity * a.price
      }
      return a
    })
    this.cartItemList = this.cartItemList.filter( (a:any) => a.quantity > 0 )
    this.tourList.next(this.cartItemList)
  }

  buyFromCart(tour:any){

    this.cartItemList.map((a:any)=>{
      if(tour.id === a.id){
        a.quantity = 0
        a.total = a.quantity * a.price
      }
      return a
    })
    this.cartItemList = this.cartItemList.filter( (a:any) => a.quantity > 0 )
    this.tourList.next(this.cartItemList)
  }
  removeAllCart(){
    this.cartItemList = []
    this.tourList.next(this.cartItemList)
  }

  getReservedNumber():number{
    let resNumber = 0;
    this.cartItemList.map((a:any)=>{
      resNumber = resNumber + a.quantity
    })
  
  return resNumber
  }

  getPrice(i:number):string{
    if(this.currency == 'dolar'){
      return (i/4).toString() + '$'
    }
    if(this.currency == 'pound'){
      return (i/5).toString() + '£'
    }
    return i.toString() + 'zł'
  }
 setCurrency(c:string){
  this.currency = c
 }
}
