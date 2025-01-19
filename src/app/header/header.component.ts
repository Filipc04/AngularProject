import { Component, EventEmitter, Output, Inject, ElementRef, ViewChild, Renderer2 } from '@angular/core';
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
  @ViewChild('toast', { static: false }) toast!: ElementRef;

  constructor(@Inject(AuthService) public authService: AuthService, private renderer: Renderer2) {}

  toggleNavbar(): void {
    this.toggleNavbarEvent.emit();
  }

  showToast() {
    this.renderer.addClass(this.toast.nativeElement, 'show');
    setTimeout(() => {
      this.renderer.removeClass(this.toast.nativeElement, 'show');
    }, 3000);
  }

  // Prevent default link navigation if the user is not logged in
  preventNavigation(event: Event) {
    event.preventDefault(); // Prevent navigation
    if (!this.authService.currentUserSig()) {
      this.showToast(); // Show the alert (toast) if not logged in
    }
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      console.log('User logged out');
    });
  }
}
