import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBoardCard } from '../../interfaces/i-task';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-card.html',
  styleUrls: ['./board-card.scss'],
})
export class BoardCard implements IBoardCard {
  @Input() label = '';
  @Input() labelColor: 'blue' | 'green' | 'cyan' | 'orange' = 'blue';
  @Input() title = '';
  @Input() text = '';
  @Input() progress = 0;
  @Input() subtasksText = '';
}
