import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { Member1Component } from './member1/member1.component';
import { Member2Component } from './member2/member2.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Default route (home page)
    { path: 'about', component: AboutComponent }, // Route for the About page
    { path: 'member1', component: Member1Component },
    { path: 'member2', component: Member2Component },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }, // Redirect unknown routes to home
  ];
