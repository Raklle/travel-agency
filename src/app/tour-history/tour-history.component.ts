import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthenticationService } from '../services/authentication.service';
import { FirestoreServiceService } from '../services/firestore-service.service';
import { AvalibilityService } from '../services/avalibility.service';

@Component({
  selector: 'app-tour-history',
  templateUrl: './tour-history.component.html',
  styleUrls: ['./tour-history.component.css']
})
export class TourHistoryComponent {

  constructor(private auth : AuthenticationService, private dbService:FirestoreServiceService, private avService : AvalibilityService, public cartService:CartService){ }
tour :any = []

  ngOnInit(): void {
    this.dbService.getUserTours(this.auth.uid).subscribe(
      list => {
      this.dataSource = list
        this.dataSource.forEach((element:any) => {
          this.dbService.getAllTourData(element.id).then((elem)=>{
            Object.assign(element, elem)

              let date1 = new Date(element.startDate);
              let date2 = new Date(element.endDate);
              let today = new Date
              console.log(`start: ${date1}`);
              console.log(`koniec: ${date2}`);
              console.log(`dzis: ${today}`);
              if (date1 < today && today < date2) {
                Object.assign(element, {status: 'Aktywna'})
              } else if (date2 < today) {
                Object.assign(element, {status: 'Zakończona'})
              } else {
                Object.assign(element, {status: 'Nadchodząca'})      
            };
          })
        });
        

      }
    )
  }


displayedColumns: string[] = ['name', 'startDate', 'endDate', 'quantity', 'total', 'status'];
dataSource = this.tour;


}
