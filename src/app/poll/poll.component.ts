import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, getDoc, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent {
  private firestore = inject(Firestore);
  pollOptions = [
    { name: 'Option 1', votes: 0 },
    { name: 'Option 2', votes: 0 },
    { name: 'Option 3', votes: 0 }
  ];
  userVoted = false;

  async vote(optionIndex: number) {
    if (this.userVoted) {
      alert('You have already voted!');
      return;
    }

    try {
      // Get a reference to the poll document in Firebase
      const pollRef = doc(this.firestore, 'polls/k82LMqsGGcuvf5vXLG7j');
      const pollSnapshot = await getDoc(pollRef);

      if (pollSnapshot.exists()) {
        // Update the vote count in Firestore
        const pollData = pollSnapshot.data() as any;
        pollData.options[optionIndex].votes += 1;
        await updateDoc(pollRef, { options: pollData.options });

        // Update the local state
        this.pollOptions[optionIndex].votes += 1;
        this.userVoted = true;
      } else {
        console.error('Poll not found in Firestore.');
      }
    } catch (error) {
      console.error('Error while voting:', error);
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

