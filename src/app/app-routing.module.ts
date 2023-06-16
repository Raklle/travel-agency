import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTourComponent } from './add-tour/add-tour.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToursMainComponent } from './tours-main/tours-main.component';
import { SingleTourComponent } from './single-tour/single-tour.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminGuard} from '../app/guards/admin'
import { ManagerGuard} from '../app/guards/manager'
import { ClientGuard} from '../app/guards/client'
import { LoginGuard} from '../app/guards/login'
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TourHistoryComponent } from './tour-history/tour-history.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [LoginGuard]},
  {path: 'tours', component: ToursMainComponent},
  {path: 'history', component: TourHistoryComponent, canActivate: [ClientGuard]},
  {path: 'tours/:id', component: SingleTourComponent, canActivate: [ClientGuard]},
  {path: 'add-tour', component: AddTourComponent, canActivate: [ManagerGuard, AdminGuard]},
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]}, 
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
