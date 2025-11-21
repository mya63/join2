import { Component, output } from '@angular/core';

@Component({
  selector: 'app-board-header',
  imports: [],
  templateUrl: './board-header.html',
  styleUrl: './board-header.scss',
})
export class BoardHeader {

  searchPhrase: string = '';
  
  // Output Event für das Öffnen der Add-Card Komponente
  addTaskToColumn = output<string>();

  constructor() {}

  onSearch(searchPhrase: string): void {
    console.log('searching for', searchPhrase );
  };

  addCard(columnType: string): void {
    console.log('Adding task to column:', columnType);
    this.addTaskToColumn.emit(columnType);
  }

}
