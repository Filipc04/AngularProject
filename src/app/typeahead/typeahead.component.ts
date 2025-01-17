import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

const animes = [
  'Weathering With You', 'Josee, the Tiger and the Fish', 'Belle', 'The Garden of Words', 'Children of the Sea',
  'Ride Your Wave', 'Mirai', 'The Night Is Short, Walk on Girl', 'Lu Over the Wall', 'Mary and the Witch\'s Flower'
];

@Component({
  selector: 'app-typeahead',
  standalone: true,
  imports: [NgbTypeaheadModule, FormsModule, JsonPipe],
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.css',
})
export class TypeaheadComponent implements OnChanges {
  @Output() animeSelected = new EventEmitter<string>();
  @Input() reset: boolean = false;

  model: string = '';

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : animes.filter((v) => v.toLowerCase().includes(term.toLowerCase())).slice(0, 10),
      ),
    );

  onSelect(event: any) {
    const selectedAnime = event.item; // ✅ Ensure full name is used
    this.model = selectedAnime; // ✅ Set the correct value
    this.animeSelected.emit(this.model); // ✅ Emit the correct value
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reset'] && this.reset) {
      this.model = ''; // ✅ Reset input field when necessary
    }
  }
}
