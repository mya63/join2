import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'figma-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './figma-bottom-nav.html',
  styleUrls: ['./figma-bottom-nav.scss'],
  encapsulation: ViewEncapsulation.None, // Styles wirken global
})
export class FigmaBottomNav {}
