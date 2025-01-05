import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import this for *ngFor
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'; // Import this for accordion

@Component({
  selector: 'app-member1',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule, NgbAccordionModule], // Add CommonModule and NgbAccordionModule here
  templateUrl: './member1.component.html',
  styleUrls: ['./member1.component.css']
})
export class Member1Component {
  items = ['First', 'Second', 'Third'];
}
