import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PollComponent } from '../poll/poll.component';

@Component({
  selector: 'app-member2',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, PollComponent],
  templateUrl: './member2.component.html',
  styleUrl: './member2.component.css'
})
export class Member2Component {

}
