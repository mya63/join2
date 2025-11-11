// board.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BoardCard } from './board-card/board-card';
import { IBoardCard, BoardColumn } from '../interfaces/i-task';
import { BoardService } from '../services/board-service';
import { AddTask } from './add-task/add-task';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardCard, AddTask],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board implements OnInit, OnDestroy {
  columns: BoardColumn[] = [];
  searchQuery = '';
  private destroy$ = new Subject<void>();

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    // Subscribe to columns from service
    this.boardService.columns$.pipe(takeUntil(this.destroy$)).subscribe((columns) => {
      this.columns = columns;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Add card to specific column
  addCard(columnTitle: string, cardData: Partial<IBoardCard>): void {
    this.boardService.addCard(columnTitle, cardData);
  }

  // Add card to first column (default)
  addCardToFirstColumn(cardData: Partial<IBoardCard>): void {
    this.boardService.addCard('To do', cardData);
  }

  // Remove card
  removeCard(cardId: string): void {
    this.boardService.removeCard(cardId);
  }

  // Update card
  updateCard(cardId: string, updates: Partial<IBoardCard>): void {
    this.boardService.updateCard(cardId, updates);
  }

  // Move card between columns
  moveCard(cardId: string, targetColumnTitle: string): void {
    this.boardService.moveCard(cardId, targetColumnTitle);
  }

  // Search functionality
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.toLowerCase();
  }

  // Filter cards based on search
  getFilteredCards(columnCards: IBoardCard[]): IBoardCard[] {
    return this.boardService.filterCards(columnCards, this.searchQuery);
  }

  // Check if column has cards (after filtering)
  hasCards(columnCards: IBoardCard[]): boolean {
    return this.getFilteredCards(columnCards).length > 0;
  }

  // Handle card click
  onCardClick(card: IBoardCard): void {
    console.log('Card clicked:', card);
    // Add your edit logic here
  }
}
