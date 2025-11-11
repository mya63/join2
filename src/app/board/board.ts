import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardCard } from './board-card/board-card';
import { BoardColumn } from '../interfaces/i-board-column';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardCard],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board {
  columns: BoardColumn[] = [
    { title: 'To do', cards: [] },
    { title: 'In progress', cards: [] },
    { title: 'Await feedback', cards: [] },
    { title: 'Done', cards: [] },
  ];
}
