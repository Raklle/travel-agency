import { Injectable } from '@angular/core';
// import { Tour, tours } from '../assets/tours';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { HttpHeaders} from '@angular/common/http';
import { IdTour} from './firestore-service.service';



@Injectable({
  providedIn: 'root'
})
export class AvalibilityService {

  reservedList:any = []
  public resList = new BehaviorSubject<any>([])

  constructor( private httpClient : HttpClient) { }

  getPosts(): Observable<JSON[]>{
    return this.httpClient.get<JSON[]>("https://tours-76f31-default-rtdb.europe-west1.firebasedatabase.app/tours")
  }

  getRes(){
    return this.resList.asObservable()
  }

  reserveTour(tour:IdTour){
    let found = false
    this.reservedList.map((a:any)=>{
      if(tour.id === a.id){
        a.reserved = a.reserved + 1
        found = true
      }
      return a
    })
    if(found){
      this.resList.next(this.reservedList)
      return
    }
    let id1 = tour.id
    this.reservedList.push({id: id1, reserved: 1})
  }

  unreserveTour(tour:any){
    this.reservedList.map((a:any)=>{
      if(tour.id === a.id){
        a.reserved = a.reserved - 1
      }
      return a
    })
    this.reservedList = this.reservedList.filter( (a:any) => a.reserved > 0 )
    this.resList.next(this.reservedList)
    console.log(this.reservedList)
  }

  getReserved(i:string){
    let x = 0;
    this.reservedList.map((a:any) =>{
      if(a.id === i){
        x = a.reserved
      }
    } )
      return x
  }

  removeReserved(id:any){
    this.reservedList.map((a:any) =>{
      if(a.id === id){
        a.reserved = 0
      }
    } )
  }

}
