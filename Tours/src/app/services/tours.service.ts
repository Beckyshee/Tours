// tour.service.ts

import { Injectable } from '@angular/core';
import { Tours } from '../interfaces/tours';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private apiUrl = 'http://localhost:1200/tours';

  constructor() {}

  async getTours(): Promise<Tours[]> {
    try {
      let response = await fetch(`${this.apiUrl}/tours`);
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }

      const data = await response.json();
      return data as Tours[];
    } catch (error) {
      console.error('Error during getTours:', error);
      throw error;
    }
  }

  async addTour(tour: Tours): Promise<Tours> {
    try {
    
      let response = await fetch(`${this.apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(tour),
      });

      // if (!response.ok) {
      //   throw new Error('Failed to add tour');
      // }

      // const newTour = await response.json();
      return response.json();
    } catch (error) {
      console.error('Error during addTour:', error);
      throw error;
    }
  }

  async updateTour(tourId: number, updatedTour: Tours): Promise<Tours> {
    try {
      let response = await fetch(`${this.apiUrl}/tours/${tourId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTour),
      });

      if (!response.ok) {
        throw new Error('Failed to update tour');
      }

      const updatedData = await response.json();
      return updatedData as Tours;
    } catch (error) {
      console.error('Error during updateTour:', error);
      throw error;
    }
  }

  async deleteTour(tourId: number): Promise<void> {
    try {
      let response = await fetch(`${this.apiUrl}/tours/${tourId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tour');
      }

     
    } catch (error) {
      console.error('Error during deleteTour:', error);
      throw error;
    }
  }
}
