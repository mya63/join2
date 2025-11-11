import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBoardCard, IAvatar, BoardColumn } from '../interfaces/i-task';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private columnsSubject = new BehaviorSubject<BoardColumn[]>([
    { title: 'To do', cards: [] },
    { title: 'In progress', cards: [] },
    { title: 'Await feedback', cards: [] },
    { title: 'Done', cards: [] },
  ]);

  columns$ = this.columnsSubject.asObservable();

  constructor() {
    this.loadDemoData();
  }

  // Get current columns value
  getColumns(): BoardColumn[] {
    return this.columnsSubject.value;
  }

  // Add card to specific column
  addCard(columnTitle: string, cardData: Partial<IBoardCard>): void {
    const columns = this.getColumns();
    const column = columns.find((col) => col.title === columnTitle);

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
      this.columnsSubject.next([...columns]);
    }
  }

  // Remove card by ID from any column
  removeCard(cardId: string): void {
    const columns = this.getColumns();
    columns.forEach((column) => {
      column.cards = column.cards.filter((card) => card.id !== cardId);
    });
    this.columnsSubject.next([...columns]);
  }

  // Update card
  updateCard(cardId: string, updates: Partial<IBoardCard>): void {
    const columns = this.getColumns();
    columns.forEach((column) => {
      const cardIndex = column.cards.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        column.cards[cardIndex] = { ...column.cards[cardIndex], ...updates };
      }
    });
    this.columnsSubject.next([...columns]);
  }

  // Move card between columns
  moveCard(cardId: string, targetColumnTitle: string): void {
    const columns = this.getColumns();
    let cardToMove: IBoardCard | undefined;

    // Find and remove card from current column
    columns.forEach((column) => {
      const cardIndex = column.cards.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        cardToMove = column.cards[cardIndex];
        column.cards.splice(cardIndex, 1);
      }
    });

    // Add to target column
    if (cardToMove) {
      const targetColumn = columns.find((col) => col.title === targetColumnTitle);
      if (targetColumn) {
        targetColumn.cards.push(cardToMove);
      }
    }

    this.columnsSubject.next([...columns]);
  }

  // Get card by ID
  getCard(cardId: string): IBoardCard | undefined {
    const columns = this.getColumns();
    for (const column of columns) {
      const card = column.cards.find((c) => c.id === cardId);
      if (card) return card;
    }
    return undefined;
  }

  // Filter cards based on search query
  filterCards(cards: IBoardCard[], searchQuery: string): IBoardCard[] {
    if (!searchQuery) {
      return cards;
    }
    const query = searchQuery.toLowerCase();
    return cards.filter(
      (card) =>
        card.title.toLowerCase().includes(query) ||
        card.text.toLowerCase().includes(query) ||
        card.label.toLowerCase().includes(query)
    );
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
