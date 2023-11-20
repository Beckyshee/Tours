import { Component, OnInit } from '@angular/core';
import { TourService } from '../services/tours.service'; // Update the path accordingly
import { Tours } from '../interfaces/tours'; // Update the path accordingly

@Component({
  selector: 'app-userdboard',
  templateUrl: './userdboard.component.html',
  styleUrls: ['./userdboard.component.css']
})
export class UserdboardComponent implements OnInit {
  tours: Tours[] = [];

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.fetchTours();
  }

  fetchTours(): void {
    this.tourService.getTours().then((tours: Tours[]) => {
      this.tours = tours;
    });
  }

  viewDetails(tour: Tours): void {
    // Add logic for viewing tour details, e.g., navigate to a details page
    console.log('View Details:', tour);
  }

  bookTour(tour: Tours): void {
    // Add logic for booking a tour
    console.log('Book Tour:', tour);
  }

  leaveReview(tour: Tours): void {
    // Add logic for leaving a review, e.g., open a review modal
    console.log('Leave Review:', tour);
  }
}
