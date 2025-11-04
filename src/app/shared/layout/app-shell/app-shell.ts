import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FigmaHeader } from '../figma-header/figma-header';
import { FigmaSidenav } from '../figma-sidenav/figma-sidenav';
import { FigmaBottomNav } from '../figma-bottom-nav/figma-bottom-nav';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, FigmaHeader, FigmaSidenav, FigmaBottomNav],
  templateUrl: './app-shell.html',
  styleUrls: ['./app-shell.scss'],
})
export class AppShell {}
