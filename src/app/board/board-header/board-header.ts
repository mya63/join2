import { Component } from '@angular/core';

@Component({
  selector: 'app-board-header',
  imports: [],
  templateUrl: './board-header.html',
  styleUrl: './board-header.scss',
})
export class BoardHeader {

  searchPhrase: string = '';

  constructor() {}




  onSearch(searchPhrase: string): void {
    console.log('searching for', searchPhrase );
  };

addCard(): void {
    console.log('add card');
  }



}
