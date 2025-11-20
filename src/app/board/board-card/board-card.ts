import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../../interfaces/i-task';  

@Component({
  selector: 'app-board-card',
  imports: [CommonModule],
  templateUrl: './board-card.html',
  styleUrl: './board-card.scss',
})
export class BoardCard {

  @Input() card!: ITask;
  @Output() cardClick = new EventEmitter<ITask>();

  onCardClick(): void {
    this.cardClick.emit(this.card);
  }

}