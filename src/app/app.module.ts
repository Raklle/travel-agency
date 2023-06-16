import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TourCardComponent } from './tour-card/tour-card.component';

import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { ToursMainComponent } from './tours-main/tours-main.component';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import { AddTourComponent } from './add-tour/add-tour.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; 
import {MatTableModule} from '@angular/material/table';
import { SingleTourComponent } from './single-tour/single-tour.component'; 
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { TourHistoryComponent } from './tour-history/tour-history.component';
import { RatingDisplayComponent } from './rating-display/rating-display.component';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './comment/comment.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
 


@NgModule({
  declarations: [
    AppComponent,
    TourCardComponent,
    ToursMainComponent,
    AddTourComponent,
    NavBarComponent,
    HomeComponent,
    CartComponent,
    PageNotFoundComponent,
    SingleTourComponent,
    LoginComponent,
    SignupComponent,
    AdminPanelComponent,
    StarRatingComponent,
    TourHistoryComponent,
    RatingDisplayComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    SwiperModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
