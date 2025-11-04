import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'figma-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './figma-sidenav.html',
  styleUrls: ['./figma-sidenav.scss'],
})
export class FigmaSidenav {
  trackByIdx(_: number, item: any) { return item?.id ?? _; }
}
