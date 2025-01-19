import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth.service'; // Adjust the path if necessary

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent {
  private firestore = inject(Firestore);
  private authService = inject(AuthService); // Inject AuthService

  pollOptions = [
    { name: 'Option 1', votes: 0 },
    { name: 'Option 2', votes: 0 },
    { name: 'Option 3', votes: 0 }
  ];
  userVoted = false;
  votedOptionIndex: number | null = null; // Track which option the user voted for

  get isLoggedIn(): boolean {
    return this.authService.currentUserSig() !== null; // Adjust to match your AuthService logic
  }

  async vote(optionIndex: number) {
    if (this.userVoted || !this.isLoggedIn) {
      alert('You must log in or you have already voted!');
      return;
    }

    try {
      const pollRef = doc(this.firestore, 'polls/k82LMqsGGcuvf5vXLG7j');
      const pollSnapshot = await getDoc(pollRef);

      if (pollSnapshot.exists()) {
        const pollData = pollSnapshot.data() as any;
        pollData.options[optionIndex].votes += 1;
        await updateDoc(pollRef, { options: pollData.options });

        this.pollOptions[optionIndex].votes += 1;
        this.userVoted = true;
        this.votedOptionIndex = optionIndex; // Save the voted option index
      } else {
        console.error('Poll not found in Firestore.');
      }
    } catch (error) {
      console.error('Error while voting:', error);
    }
  }

  async retractVote() {
    if (!this.userVoted || this.votedOptionIndex === null) {
      alert('You have not voted yet!');
      return;
    }

    try {
      const pollRef = doc(this.firestore, 'polls/k82LMqsGGcuvf5vXLG7j');
      const pollSnapshot = await getDoc(pollRef);

      if (pollSnapshot.exists()) {
        const pollData = pollSnapshot.data() as any;

        // Decrement the vote count for the previously voted option
        if (pollData.options[this.votedOptionIndex].votes > 0) {
          pollData.options[this.votedOptionIndex].votes -= 1;
          await updateDoc(pollRef, { options: pollData.options });

          this.pollOptions[this.votedOptionIndex].votes -= 1;
          this.userVoted = false;
          this.votedOptionIndex = null; // Reset the voted option index
        } else {
          console.error('Invalid vote count.');
        }
      } else {
        console.error('Poll not found in Firestore.');
      }
    } catch (error) {
      console.error('Error while retracting vote:', error);
    }
  }

  async fetchPollData() {
    try {
      const pollRef = doc(this.firestore, 'polls/k82LMqsGGcuvf5vXLG7j');
      const pollSnapshot = await getDoc(pollRef);

      if (pollSnapshot.exists()) {
        const pollData = pollSnapshot.data() as any;
        this.pollOptions = pollData.options;
      } else {
        console.error('Poll not found in Firestore.');
      }
    } catch (error) {
      console.error('Error fetching poll data:', error);
    }
  }

  ngOnInit() {
    this.fetchPollData();
  }
}
