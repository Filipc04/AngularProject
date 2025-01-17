import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateComponent } from "../rate/rate.component";
import { TypeaheadComponent } from "../typeahead/typeahead.component";
import { ButtonFx } from './buttonfx';

@Component({
  selector: 'app-createlist',
  standalone: true,
  imports: [CommonModule, RateComponent, TypeaheadComponent],
  templateUrl: './createlist.component.html',
  styleUrl: './createlist.component.css'
})
export class CreatelistComponent {
  animeList: { name: string; rating: number }[] = [];
  selectedAnime: string = '';
  selectedRating: number = 0;

  resetTypeahead: boolean = false; // To reset typeahead input
  resetRating: boolean = false; // To reset rating input

  onAnimeSelected(anime: string) {
    this.selectedAnime = anime;
  }

  onRatingSelected(rating: number) {
    this.selectedRating = rating;
  }

  addAnimeToList() {
    if (this.selectedAnime && this.selectedRating) {
      this.animeList = [...this.animeList, { name: this.selectedAnime, rating: this.selectedRating }];
      
      // Reset inputs
      this.selectedAnime = '';
      this.selectedRating = 0;
      
      // Notify child components to reset
      this.resetTypeahead = true;
      this.resetRating = true;
      
      // Immediately turn off the reset flags to allow new selections
      setTimeout(() => {
        this.resetTypeahead = false;
        this.resetRating = false;
      }, 10);
    }
  }

  addRippleEffect(event: MouseEvent): void {
    ButtonFx.addRippleEffect(event);  // Call the method from ButtonFx class
  }
}
