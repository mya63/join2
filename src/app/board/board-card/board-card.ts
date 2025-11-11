import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBoardCard, IAvatar } from '../../interfaces/i-task';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-card.html',
  styleUrls: ['./board-card.scss'],
})
export class BoardCard {
  @Input() card!: IBoardCard;
  @Output() cardClick = new EventEmitter<IBoardCard>();

  onCardClick(): void {
    this.cardClick.emit(this.card);
  }

  getPriorityIcon(): string {
    const icons = {
      low: 'assets/icons/prio-low.svg',
      medium: 'assets/icons/prio-medium.svg',
      urgent: 'assets/icons/prio-urgent.svg',
    };
    return icons[this.card.priority] || icons.urgent;
  }
}
