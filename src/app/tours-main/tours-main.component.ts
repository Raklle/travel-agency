import { Component } from '@angular/core';
import { Status } from '../tour-card/tour-card.component';
import { FirestoreServiceService, IdTour} from '../services/firestore-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tours-main',
  templateUrl: './tours-main.component.html',
  styleUrls: ['./tours-main.component.css']
})
export class ToursMainComponent{
  
toursCopy:any;
toursCopy2:any;
prices: Array<number> | undefined
highlights = [0]
tours:any;

destinations = new FormControl('');
destinationsList : any[]= [];
filteredDestinations : any[]= [];
activeFilters = {
  minPrice:0,
  maxPrice:0,
  minRating:0,
  maxRating:0,
  date: ''
}


  constructor(private dbService: FirestoreServiceService){
    this.dbService.getTours().subscribe((res:any) => {
      let rawtours = res;
      this.tours = rawtours.filter((element:any)=>{
        if(element.active == true){
          return true
        }
        return false
      })
      this.toursCopy= this.tours.map((element:any) =>{
        return{disabled: false,
        tour: element,
        highlight: '2px 2px 4px #3f51b5'}
      })
      this.toursCopy2 = this.toursCopy
      let tempdestinations = this.toursCopy.map((elem:any) => elem.tour.destination)
      this.destinationsList = [...new Set(tempdestinations)];
      
      this.updateFilters()
      this.setHighlights()
    });
  }




setHighlights(){

  let tab = this.toursCopy.filter((element:any) => !element.disabled)
  let ids = tab.map((element:any) => element.tour.id)
  let prices = tab.map((element:any) => element.tour.price)
  let id = prices.indexOf(Math.min(...prices))
  let idMax = prices.indexOf(Math.max(...prices))

  this.toursCopy.map((element:any) =>{
    if(element.tour.id === ids[id]){
      element.highlight = '3px 3px 20px red'
    }else if(element.tour.id === ids[idMax]){
      element.highlight = '3px 3px 20px green'
    }else{
      element.highlight = '2px 2px 4px #3f51b5'
    }
    return element
  })

}

updateFromChild(me :Status){
  this.toursCopy =this.toursCopy.map( (elem:any) => {
    if(elem.id === me.id){
      elem.disabled = me.disabled
    }
    return elem
  })
  this.setHighlights()
}

resetFilters(){
  this.activeFilters = {
    minPrice:0,
    maxPrice:0,
    minRating:0,
    maxRating:0,
    date: ''
  }
  this.filteredDestinations = []
  this.updateFilters()
}


updateFilters(){
  this.toursCopy = this.toursCopy2
  console.log(this.toursCopy)
  if(this.activeFilters.minPrice != 0){
    this.toursCopy = this.toursCopy.filter((elem:any) => {
      if(elem.tour.price >= this.activeFilters.minPrice){
        return true
      }
      return false
    })
  }
  if(this.activeFilters.maxPrice != 0){
    this.toursCopy = this.toursCopy.filter((elem:any) => {
      if(elem.tour.price <= this.activeFilters.maxPrice){
        return true
      }
      return false
    })
  }
  console.log(this.destinationsList)
  if(this.filteredDestinations.length != 0){
    this.toursCopy = this.toursCopy.filter((elem:any) => {
      if(this.filteredDestinations.includes(elem.tour.destination)){
        return true
      }
      return false
    })
  }
  if(this.activeFilters.date != ''){
    let filter = new Date(this.activeFilters.date)
    this.toursCopy = this.toursCopy.filter((elem:any) => {
      let start = new Date(elem.tour.startDate);
      let end = new Date(elem.tour.endDate);
      if(start <= filter && filter <= end){
        return true
      }
      return false
    })
  }
  if(this.activeFilters.minRating != 0){
    this.toursCopy = this.toursCopy.filter((elem:any) => {
      if(elem.tour.rating >= this.activeFilters.minRating){
        return true
      }
      return false
    })
  }
  if(this.activeFilters.maxRating != 0){
    this.toursCopy = this.toursCopy.filter((elem:any) => {
      if(elem.tour.rating <= this.activeFilters.maxRating){
        return true
      }
      return false
    })
  }
}

}
