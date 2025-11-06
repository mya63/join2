import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardCard} from './board-card/board-card';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardCard],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board { }
