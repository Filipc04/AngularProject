import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-createlist',
  standalone: true,
  imports: [RouterModule, NgbRatingModule],
  templateUrl: './createlist.component.html',
  styleUrl: './createlist.component.css',
   
})
export class CreatelistComponent {
  rating = 0;
}
