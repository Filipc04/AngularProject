import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.css',
})
export class RateComponent implements OnChanges {
  @Output() ratingSelected = new EventEmitter<number>();
  @Input() reset: boolean = false; // New input to reset rating

  rating = 0;

  emitRating() {
    this.ratingSelected.emit(this.rating);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reset'] && this.reset) {
      this.rating = 0; // ✅ Reset rating
    }
  }
}
