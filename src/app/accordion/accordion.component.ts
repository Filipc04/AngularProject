import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
    items = ['First', 'Second', 'Third'];
}

