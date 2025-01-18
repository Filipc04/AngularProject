import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Anime {
  name: string;
  ratings: number[]; // Store multiple ratings for averaging
}

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private animeList: Anime[] = [];
  private animeListSubject = new BehaviorSubject<Anime[]>([]);

  animeList$ = this.animeListSubject.asObservable();

  addAnimeRating(animeName: string, rating: number) {
    let existingAnime = this.animeList.find(a => a.name === animeName);
    
    if (existingAnime) {
      existingAnime.ratings.push(rating);
    } else {
      this.animeList.push({ name: animeName, ratings: [rating] });
    }

    this.animeListSubject.next([...this.animeList]); // Update the list
  }

  submitAnimeList(userAnimeList: { name: string; rating: number }[]) {
    userAnimeList.forEach(anime => {
      this.addAnimeRating(anime.name, anime.rating);
    });

    this.animeListSubject.next([...this.animeList]); // Notify subscribers
  }
}
