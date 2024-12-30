import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Default route (home page)
    { path: 'about', component: AboutComponent }, // Route for the About page
    { path: '**', redirectTo: '' }, // Redirect unknown routes to home
  ];
