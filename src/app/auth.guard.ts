import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);  // Inject AuthService
  const router = inject(Router);  // Inject Router

  if (authService.currentUserSig()) {
    return true;  // User is logged in, allow access
  } else {
    router.navigate(['/login']);  // User is not logged in, redirect to login
    return false;
  }
};
