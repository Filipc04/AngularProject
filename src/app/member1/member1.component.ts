import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AccordionComponent } from '../accordion/accordion.component';


@Component({
  selector: 'app-member1',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AccordionComponent], 
  templateUrl: './member1.component.html',
  styleUrls: ['./member1.component.css']
})
export class Member1Component {
}
