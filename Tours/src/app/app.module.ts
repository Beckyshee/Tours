import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { AdmindboardComponent } from './admindboard/admindboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToursComponent } from './tours/tours.component';
import { HeaderComponent } from './header/header.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersComponent } from './users/users.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UserdboardComponent } from './userdboard/userdboard.component';
import { OffersComponent } from './offers/offers.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    LandingComponent,
    FooterComponent,
    AdmindboardComponent,
    SidebarComponent,
    ToursComponent,
    HeaderComponent,
    BookingsComponent,
    UsersComponent,
    ReviewsComponent,
    UserdboardComponent,
    OffersComponent,
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
