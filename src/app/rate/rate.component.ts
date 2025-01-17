import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadComponent } from "../typeahead/typeahead.component";

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [RouterModule, NgbRatingModule, TypeaheadComponent],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.css',
})
export class RateComponent {
  rating = 0;
}
