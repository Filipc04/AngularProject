import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service'; // import the service
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() toggleNavbarEvent = new EventEmitter<void>();

  constructor(@Inject(AuthService) public authService: AuthService) {} // use @Inject here

  toggleNavbar(): void {
    this.toggleNavbarEvent.emit();
  }

  onLogout(): void {
    this.authService.logout(); // logout the user
  }
}
