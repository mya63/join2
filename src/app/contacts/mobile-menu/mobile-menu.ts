// src/app/contacts/contact-edit-mobile-menu/contact-edit-mobile-menu.ts
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbService } from '../../services/fb-service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-menu.html',
  styleUrls: ['./mobile-menu.scss'],
})
export class MobileMenu {
  constructor(public fbService: FbService) { }

  isClosing = signal(false);

  @Input() contactId!: string;
  @Input() inline = false;
  /** Events für Parent */
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit(this.contactId ?? '');
    this.startClosingAnimation();
  }

  onDelete(): void {
    this.delete.emit(this.contactId ?? '');
    this.fbService.contactlistHidden = false;
    this.startClosingAnimation();
  }

  onBackdropClick(ev: MouseEvent): void {
    const target = ev.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      this.startClosingAnimation();
    }
  }

  startClosingAnimation(): void {
    this.isClosing.set(true);
  }

  onAnimationEnd(): void {
    if (this.isClosing()) {
      this.close.emit();
    }
  }
}
