import { Component } from '@angular/core';
import { RateComponent } from "../rate/rate.component";
import { TypeaheadComponent } from "../typeahead/typeahead.component";

@Component({
  selector: 'app-createlist',
  standalone: true,
  imports: [RateComponent, TypeaheadComponent],
  templateUrl: './createlist.component.html',
  styleUrl: './createlist.component.css'
})
export class CreatelistComponent {

}
