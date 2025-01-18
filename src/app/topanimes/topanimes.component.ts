import { Component, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';  // Ensure CommonModule is imported

@Component({
  selector: 'app-topanimes',
  standalone: true,  // For standalone components, this is correct
  imports: [CommonModule],  // Add CommonModule here in imports array
  templateUrl: './topanimes.component.html',
  styleUrl: './topanimes.component.css'
})
export class TopanimesComponent {
  private firestore: Firestore = inject(Firestore);
  topAnimeList: { name: string; averageRating: number }[] = [];

  async fetchTopAnimes() {
    const animeCollection = collection(this.firestore, 'anime_ratings');
    const animeSnapshot = await getDocs(animeCollection);

    this.topAnimeList = animeSnapshot.docs.map(doc => {
      const data = doc.data() as { totalRating: number; voteCount: number };
      return {
        name: doc.id,
        averageRating: data.voteCount > 0 ? (data.totalRating / data.voteCount) : 0
      };
    });

    // Sort by highest rating
    this.topAnimeList.sort((a, b) => b.averageRating - a.averageRating);
  }

  ngOnInit() {
    this.fetchTopAnimes();
  }
}
