import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'figma-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './figma-header.html',
  styleUrls: ['./figma-header.scss'],
})
export class FigmaHeader {
  userInitial = 'Y';
  dropdownOpen = signal(false);

  constructor(private router: Router) {}

  toggle(){ this.dropdownOpen.set(!this.dropdownOpen()); }
  logout(){ this.router.navigate(['/login']); }
}
