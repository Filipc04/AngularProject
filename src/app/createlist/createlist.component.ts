import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
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

  private firestore: Firestore = inject(Firestore);

  onAnimeSelected(anime: string) {
    this.selectedAnime = anime;
  }

  onRatingSelected(rating: number) {
    this.selectedRating = rating;
  }
  
  removeAnimeFromList(index: number) {
    this.animeList = this.animeList.filter((_, i) => i !== index);
  }
  
  

  async addAnimeToList() {
    if (this.selectedAnime && this.selectedRating) {
      this.animeList = [...this.animeList, { name: this.selectedAnime, rating: this.selectedRating }];

      try {
        const animeRef = doc(this.firestore, `anime_ratings/${this.selectedAnime}`);
        const animeSnapshot = await getDoc(animeRef);

        if (animeSnapshot.exists()) {
          // If anime exists, update its rating
          const animeData = animeSnapshot.data() as { totalRating: number; voteCount: number };
          const updatedTotal = animeData.totalRating + this.selectedRating;
          const updatedCount = animeData.voteCount + 1;
          await updateDoc(animeRef, { totalRating: updatedTotal, voteCount: updatedCount });
        } else {
          // If anime doesn't exist, create a new entry
          await setDoc(animeRef, { totalRating: this.selectedRating, voteCount: 1 });
        }

      } catch (error) {
        console.error('Error updating anime rating:', error);
      }

      // Reset inputs
      this.selectedAnime = '';
      this.selectedRating = 0;
      this.resetTypeahead = true;
      this.resetRating = true;

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
