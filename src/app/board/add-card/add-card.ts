import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-add-card',
  imports: [],
  templateUrl: './add-card.html',
  styleUrl: './add-card.scss',
})
export class AddCard {

  // Input für die ausgewählte Spalte
  selectedColumn = input<string>('');
  
  // Output Event zum Schließen des Overlays
  closeOverlay = output<void>();

  getColumnDisplayName(column: string): string {
    switch (column) {
      case 'to-do':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'await-feedback':
        return 'Await Feedback';
      case 'done':
        return 'Done';
      default:
        return column;
    }
  }

  onClose(): void {
    this.closeOverlay.emit();
  }

}
