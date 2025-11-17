import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../../interfaces/i-task';
import { FbService } from '../../services/fb-service';  

@Component({
  selector: 'app-board-card',
  imports: [],
  templateUrl: './board-card.html',
  styleUrl: './board-card.scss',
})
export class BoardCard {

  constructor(private fbService: FbService) {}

  @Input() card!: ITask;
  @Output() cardClick = new EventEmitter<ITask>();

  onCardClick(): void {
    this.cardClick.emit(this.card);
  }

  getPriorityIcon(): string {
    const icons = {
      low: 'assets/icons/prio-low.svg',
      medium: 'assets/icons/prio-medium.svg',
      urgent: 'assets/icons/prio-urgent.svg',
    };
    //return icons[this.card.priority] || icons.urgent;
    return icons[this.card.priority as keyof typeof icons] || icons.urgent; 
  }

}