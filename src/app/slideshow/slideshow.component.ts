import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgbCarouselModule],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent {
  images = ['demonslayer_slideshow.jpg', 'lain_slideshow.jpg', 'mobpsycho_slideshow.jpg'].map((filename) => `assets/${filename}`);
}



