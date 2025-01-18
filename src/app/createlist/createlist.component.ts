import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
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
  
  resetTypeahead: boolean = false;
  resetRating: boolean = false;

  private firestore: Firestore = inject(Firestore); // Inject Firestore

  onAnimeSelected(anime: string) {
    this.selectedAnime = anime;
  }

  onRatingSelected(rating: number) {
    this.selectedRating = rating;
  }

  async addAnimeToList() {
    if (this.selectedAnime && this.selectedRating) {
      this.animeList = [...this.animeList, { name: this.selectedAnime, rating: this.selectedRating }];
      
      // Store in Firestore
      const listsRef = collection(this.firestore, 'lists');
      await addDoc(listsRef, {
        username: 'testUser', // Replace with actual user ID if authentication is implemented
        animeName: this.selectedAnime,
        rating: this.selectedRating,
        timestamp: new Date()
      });

      // Reset inputs
      this.selectedAnime = '';
      this.selectedRating = 0;
      this.resetTypeahead = true;
      this.resetRating = true;

      // Reset flags after a delay
      setTimeout(() => {
        this.resetTypeahead = false;
        this.resetRating = false;
      }, 10);
    }
  }

  addRippleEffect(event: MouseEvent): void {
    ButtonFx.addRippleEffect(event);
  }
}
