import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { AdmindboardComponent } from './admindboard/admindboard.component';
import { ToursComponent } from './tours/tours.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersComponent } from './users/users.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UserdboardComponent } from './userdboard/userdboard.component';
import { OffersComponent } from './offers/offers.component';



const routes: Routes = [
  {path: 'navbar', component:NavbarComponent},
  {path: 'landing', component:LandingComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'admin', component:AdmindboardComponent},
  {path: 'footer', component:FooterComponent},
  {path: 'tours', component:ToursComponent},
  {path: 'users', component:UsersComponent},
  {path: 'bookings', component:BookingsComponent},
  {path: 'reviews', component:ReviewsComponent},
  {path: 'offers', component:OffersComponent},

  // everything user side
  {path: 'user', component: UserdboardComponent},
  // {path: 'search', component: SearchComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
