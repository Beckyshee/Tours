// tours.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  private apiUrl = 'your_backend_api_url';

  constructor() {}

  private async performFetch<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  }

  getAllTours(): Promise<any[]> {
    const url = `${this.apiUrl}/tours`;
    return this.performFetch(url);
  }

  getTourById(tourId: number): Promise<any> {
    const url = `${this.apiUrl}/tours/${tourId}`;
    return this.performFetch(url);
  }

  addTour(newTour: any): Promise<any> {
    const url = `${this.apiUrl}/tours`;
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTour),
    };
    return this.performFetch(url, options);
  }

  updateTour(tourId: number, updatedTour: any): Promise<any> {
    const url = `${this.apiUrl}/tours/${tourId}`;
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTour),
    };
    return this.performFetch(url, options);
  }

  deleteTour(tourId: number): Promise<any> {
    const url = `${this.apiUrl}/tours/${tourId}`;
    const options: RequestInit = {
      method: 'DELETE',
    };
    return this.performFetch(url, options);
  }

  searchTours(location: string): Promise<any[]> {
    const url = `${this.apiUrl}/tours?location=${location}`;
    return this.performFetch(url);
  }

  bookTour(tourId: number, bookingDetails: any): Promise<any> {
    const url = `${this.apiUrl}/tours/${tourId}/bookings`;
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingDetails),
    };
    return this.performFetch(url, options);
  }
}

































// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Tours } from '../interfaces/tours';

// @Component({
//   selector: 'app-tours',
//   templateUrl: './tours.component.html',
//   styleUrls: ['./tours.component.css']
// })
// export class ToursComponent {
// addTour!: FormGroup
// constructor(private fb:FormBuilder, ){

  
// this.addTour = this.fb.group({
//   tourTitle: ['',[Validators.required]],
//   destination: ['',[Validators.required]],
//   duration: ['',[Validators.required]],
//   price: ['',[Validators.required]],
//   tourType: ['',[Validators.required]],
//   tourImage: ['',[Validators.required]],
//   shortDescription: ['',[Validators.required]],
 

// })
// }

// createTour(){
//   // console.log("sadasdasdasdasd");
//   let tour_details: Tours = this.addTour.value;
//   // this.authService.registerUser(tour_details)
  
// }
// }
