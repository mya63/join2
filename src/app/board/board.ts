// board.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardCard } from './board-card/board-card';
import { IBoardCard, IAvatar, BoardColumn } from '../interfaces/i-task';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardCard],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board implements OnInit {
  searchQuery = '';

  columns: BoardColumn[] = [
    { title: 'To do', cards: [] },
    { title: 'In progress', cards: [] },
    { title: 'Await feedback', cards: [] },
    { title: 'Done', cards: [] },
  ];

  ngOnInit(): void {
    this.loadDemoData();
  }

  // Add card to specific column
  addCard(columnTitle: string, cardData: Partial<IBoardCard>): void {
    const column = this.columns.find((col) => col.title === columnTitle);
    if (column) {
      const newCard: IBoardCard = {
        id: this.generateId(),
        label: cardData.label || 'Task',
        labelColor: cardData.labelColor || 'blue',
        title: cardData.title || 'New Task',
        text: cardData.text || '',
        progress: cardData.progress || 0,
        subtasksText: cardData.subtasksText || '',
        avatars: cardData.avatars || [],
        priority: cardData.priority || 'medium',
      };
      column.cards.push(newCard);
    }
  }

  // Add card to first column (default)
  addCardToFirstColumn(cardData: Partial<IBoardCard>): void {
    this.addCard('To do', cardData);
  }

  // Remove card by ID from any column
  removeCard(cardId: string): void {
    this.columns.forEach((column) => {
      column.cards = column.cards.filter((card) => card.id !== cardId);
    });
  }

  // Update card
  updateCard(cardId: string, updates: Partial<IBoardCard>): void {
    this.columns.forEach((column) => {
      const cardIndex = column.cards.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        column.cards[cardIndex] = { ...column.cards[cardIndex], ...updates };
      }
    });
  }

  // Move card between columns
  moveCard(cardId: string, targetColumnTitle: string): void {
    let cardToMove: IBoardCard | undefined;

    // Find and remove card from current column
    this.columns.forEach((column) => {
      const cardIndex = column.cards.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        cardToMove = column.cards[cardIndex];
        column.cards.splice(cardIndex, 1);
      }
    });

    // Add to target column
    if (cardToMove) {
      const targetColumn = this.columns.find((col) => col.title === targetColumnTitle);
      if (targetColumn) {
        targetColumn.cards.push(cardToMove);
      }
    }
  }

  // Get card by ID
  getCard(cardId: string): IBoardCard | undefined {
    for (const column of this.columns) {
      const card = column.cards.find((c) => c.id === cardId);
      if (card) return card;
    }
    return undefined;
  }

  // Search functionality
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.toLowerCase();
  }

  // Filter cards based on search
  getFilteredCards(columnCards: IBoardCard[]): IBoardCard[] {
    if (!this.searchQuery) {
      return columnCards;
    }
    return columnCards.filter(
      (card) =>
        card.title.toLowerCase().includes(this.searchQuery) ||
        card.text.toLowerCase().includes(this.searchQuery) ||
        card.label.toLowerCase().includes(this.searchQuery)
    );
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

  // Generate unique ID
  private generateId(): string {
    return `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Load demo data
  private loadDemoData(): void {
    // To do column
    this.addCard('To do', {
      label: 'User Story',
      labelColor: 'blue',
      title: 'Contact Form & Imprint',
      text: 'Create a contact form and imprint page…',
      progress: 0,
      subtasksText: '0/2 Subtasks',
      avatars: [
        { initials: 'AS', color: '#9327FF' },
        { initials: 'DE', color: '#FC71FF' },
      ],
      priority: 'medium',
    });

    // In progress column
    this.addCard('In progress', {
      label: 'User Story',
      labelColor: 'blue',
      title: 'Kochwelt Page & Recipe Recommender',
      text: 'Build start page with recipe recommendation…',
      progress: 50,
      subtasksText: '1/2 Subtasks',
      avatars: [
        { initials: 'AS', color: '#9327FF' },
        { initials: 'EF', color: '#FFBB2B' },
      ],
      priority: 'urgent',
    });

    // Await feedback column
    this.addCard('Await feedback', {
      label: 'Technical Task',
      labelColor: 'green',
      title: 'HTML Base Template Creation',
      text: 'Create reusable HTML base template…',
      progress: 0,
      subtasksText: '',
      avatars: [{ initials: 'DE', color: '#FC71FF' }],
      priority: 'low',
    });

    // Done column
    this.addCard('Done', {
      label: 'Technical Task',
      labelColor: 'cyan',
      title: 'CSS Architecture Planning',
      text: 'Define CSS naming conventions and structure…',
      progress: 100,
      subtasksText: '2/2 Subtasks',
      avatars: [
        { initials: 'AS', color: '#9327FF' },
        { initials: 'DE', color: '#FC71FF' },
        { initials: 'EF', color: '#FFBB2B' },
      ],
      priority: 'medium',
    });
  }
}
