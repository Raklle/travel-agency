import { Tour } from 'src/assets/tours';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreServiceService } from '../services/firestore-service.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent implements OnInit {



  modelForm : FormGroup;
  
  constructor(private formBuilder : FormBuilder,private dbService : FirestoreServiceService) {}
  
  ngOnInit() {
    this.modelForm = this.formBuilder.group({
     name: ['', Validators.required],
     destination: ['',[Validators.required]],
     startDate: ['', Validators.required],
     endDate: ['', Validators.required],
     price: ['', Validators.required],
     capacity: ['', Validators.required],
     about: ['', Validators.required],
     image: ['', Validators.required]
   });
   
  }

  onSubmit(form: any) {
    this.dbService.addTour(this.modelForm.value)
    this.modelForm.reset
    console.log(this.modelForm.value)
  }
  

}
