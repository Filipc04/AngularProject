import { Component } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

const animes = [
	'Steins;Gate', 'Rurouni Kenshin: Trust and Betrayal', 'Berserk', 'Baccano!',
    'Mushi-Shi', 'Gintama°', 'Hunter x Hunter (2011)', 'Fruits Basket: The Final', 
    'Kaguya-sama: Love is War - Ultra Romantic',
    'Owarimonogatari (Second Season)', 'Clannad: After Story',
    'Monogatari Series: Second Season', 'Made in Abyss', 'Mob Psycho 100 II',
    'Vinland Saga', 'One Punch Man', 'Your Lie in April',
    'March Comes in Like a Lion 2nd Season', 'The Disappearance of Haruhi Suzumiya',
    'Samurai Champloo', 'Spirited Away', 'Princess Mononoke', 'Howl\'s Moving Castle',
    'My Neighbor Totoro', 'Grave of the Fireflies', 'Nausicaä of the Valley of the Wind',
    'Castle in the Sky', 'Kiki\'s Delivery Service', 'The Girl Who Leapt Through Time',
    '5 Centimeters Per Second', 'Paprika', 'Perfect Blue', 'Summer Wars', 'Akira',
    'Ghost in the Shell', 'The Disappearance of Haruhi Suzumiya',
    'Neon Genesis Evangelion: The End of Evangelion',
    'Final Fantasy VII: Advent Children', 'Cowboy Bebop: The Movie',
    'Fullmetal Alchemist: The Movie - Conqueror of Shamballa', 'Vampire Hunter D: Bloodlust',
    'Voices of a Distant Star', 'Whisper of the Heart', 'The Cat Returns',
    'The Secret World of Arrietty', 'From Up on Poppy Hill', 'The Wind Rises',
    'When Marnie Was There', 'The Tale of the Princess Kaguya', 'The Boy and the Beast',
    'Your Name.', 'A Silent Voice', 'In This Corner of the World',
    'Maquia: When the Promised Flower Blooms', 'Weathering With You',
    'Josee, the Tiger and the Fish', 'Belle', 'The Garden of Words', 'Children of the Sea',
    'Ride Your Wave', 'Mirai', 'The Night Is Short, Walk on Girl', 'Lu Over the Wall',
    'Mary and the Witch\'s Flower', 'The Red Turtle', 'Miss Hokusai',
    'The Anthem of the Heart', 'The Boy and the Beast', 'The Girl Who Leapt Through Time',
    'Summer Wars', 'Wolf Children', 'Fullmetal Alchemist: Brotherhood', 'Death Note',
    'Cowboy Bebop', 'Spirited Away', 'Princess Mononoke', 'The Melancholy of Haruhi Suzumiya',
    'Elfen Lied', 'Neon Genesis Evangelion', 'Code Geass: Lelouch of the Rebellion',
    'Bleach', 'Code Geass: Lelouch of the Rebellion R2', 'FLCL', 'Naruto',
    'Samurai Champloo', 'Trigun', 'Gurren Lagann', 'Rurouni Kenshin: Trust & Betrayal',
    'Full Metal Panic!', 'Ouran High School Host Club', 'Fullmetal Alchemist: Brotherhood',
    'Clannad', 'Akira', 'Fruits Basket', 'Cowboy Bebop: The Movie', 'Chobits',
    'Full Metal Panic? Fumoffu', '5 Centimeters Per Second', 'Rurouni Kenshin',
    'Ghost in the Shell', 'The Girl Who Leapt Through Time', 'Clannad After Story',
    'Hellsing', 'Final Fantasy VII: Advent Children', 'Azumanga Daioh',
    'Fullmetal Alchemist: The Movie - Conqueror of Shamballa',
    'Nausicaä of the Valley of the Wind', 'Ghost in the Shell: Stand Alone Complex',
    'Mushi-Shi', 'Steins;Gate', 'Darker than Black', 'Fate/stay night', 'Claymore',
    'Toradora!', 'Inuyasha', 'Castle in the Sky', 'Full Metal Panic! The Second Raid',
    'Black Lagoon', 'Blood+', 'Angel Beats!', 'Neon Genesis Evangelion: The End of Evangelion',
    'My Neighbor Totoro', 'Grave of the Fireflies', 'Dragon Ball Z', 'Eureka Seven',
    'Air', 'Berserk', 'Love Hina', 'Last Exile', 'When They Cry - Higurashi', 'Baccano!',
    'GTO: Great Teacher Onizuka', 'Wolfs Rain', 'Welcome to the NHK',
    'Serial Experiments Lain', 'Sword Art Online', 'Shakugan no Shana', 'One Piece',
    'Attack on Titan', 'Haibane Renmei', 'Kiki\'s Delivery Service', 'Naruto Shippūden',
    'The Vision of Escaflowne', 'Samurai 7', 'Soul Eater', 'Spice and Wolf', 'Ergo Proxy',
    'Black Lagoon: The Second Barrage', 'School Rumble', 'Lucky Star', 'Eden of the East',
    'Kanon', 'Gungrave', 'Puella Magi Madoka Magica', 'Monster', 'Dragon Ball',
    'High School of the Dead', 'Summer Wars', 'Bakemonogatari', 'Chrono Crusade',
    'anohana: The Flower We Saw That Day', 'Gunslinger Girl', 'Yu Yu Hakusho: Ghost Files',
    'Lunar Legend Tsukihime', 'The Familiar of Zero', 'Read or Die', 'R.O.D -The TV-',
    'Mobile Suit Gundam Seed', 'Durarara!!', 'Paranoia Agent', 'My-HiME', 'Cardcaptor Sakura',
    'Outlaw Star', 'Ah! My Goddess', 'Paprika', 'RahXephon', 'Mobile Suit Gundam Wing',
    '.hack//SIGN', 'Please Teacher!', 'K-ON!', 'Voices of a Distant Star',
    'The Disappearance of Haruhi Suzumiya', 'Rumbling Hearts', 'Ghost in the Shell 2: Innocence',
    'Honey and Clover', 'D.N.Angel', 'Perfect Blue', 'Gankutsuou: The Count of Monte Cristo',
    'Witch Hunter Robin', 'Kimi ni Todoke - From Me to You', 'Trinity Blood',
    'Nodame Cantabile', 'Shuffle!', 'Neon Genesis Evangelion: Death & Rebirth',
    'Ninja Scroll', 'Rurouni Kenshin: Reflection',
    'Ghost in the Shell: Stand Alone Complex 2nd GIG', 'Excel Saga', 'Genshiken',
    'BECK: Mongolian Chop Squad', 'Kino\'s Journey', 'Gantz', 'Hellsing Ultimate',
    'The Twelve Kingdoms', 'Whisper of the Heart', 'Vampire Hunter D: Bloodlust',
    'When They Cry - Kai', 'Vampire Knight', 'Scrapped Princess',
    'Tsubasa: RESERVoir CHRoNiCLE', 'Evangelion: 1.0 You Are (Not) Alone', 'Black Cat',
    'His and Her Circumstances', 'Noir', 'Blood: The Last Vampire', 'Sailor Moon',
    'D.Gray-man', 'xxxHOLiC', 'Mobile Suit Gundam 00', 'Spirited Away',
    'Princess Mononoke', 'Howl\'s Moving Castle', 'My Neighbor Totoro',
    'Grave of the Fireflies', 'Nausicaä of the Valley of the Wind', 'Castle in the Sky',
    'Kiki\'s Delivery Service', 'The Girl Who Leapt Through Time',
    '5 Centimeters Per Second', 'Paprika', 'Perfect Blue', 'Summer Wars', 'Akira',
    'Ghost in the Shell', 'The Disappearance of Haruhi Suzumiya',
    'Neon Genesis Evangelion: The End of Evangelion', 'Final Fantasy VII: Advent Children',
    'Cowboy Bebop: The Movie', 'Fullmetal Alchemist: The Movie - Conqueror of Shamballa',
    'Vampire Hunter D: Bloodlust', 'Voices of a Distant Star', 'Whisper of the Heart',
    'The Cat Returns', 'The Secret World of Arrietty', 'From Up on Poppy Hill',
    'The Wind Rises', 'When Marnie Was There', 'The Tale of the Princess Kaguya',
    'The Boy and the Beast', 'Your Name.', 'A Silent Voice', 'In This Corner of the World',
    'Maquia: When the Promised Flower Blooms', 'Weathering With You',
    'Josee, the Tiger and the Fish', 'Belle', 'The Garden of Words', 'Children of the Sea',
    'Ride Your Wave', 'Mirai', 'The Night Is Short, Walk on Girl', 'Lu Over the Wall',
    'Mary and the Witch\'s Flower', 'The Red Turtle', 'Miss Hokusai',
    'The Anthem of the Heart', 'The Boy and the Beast', 'The Girl Who Leapt Through Time',
    'Summer Wars', 'Wolf Children', 'The Boy and the Beast', 'Mirai', 'Belle',
];

@Component({
  selector: 'app-typeahead',
  standalone: true,
  imports: [NgbTypeaheadModule, FormsModule, JsonPipe],
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.css',
  styles: [
    `.form-control { 
        width: 400px;
        background-color: #1d2021;
        color: #d4be98; /* Ensure text is readable */
        border: 1px solid #d4be98; /* Replace #4caf50 with your desired color */
        border-radius: 4px; /* Optional: Adjusts the border radius */
     }`,
  ],
})
export class TypeaheadComponent {
  model: any;

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term.length < 2 ? [] : animes.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);
}






