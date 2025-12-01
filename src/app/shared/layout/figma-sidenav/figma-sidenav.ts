import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'figma-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './figma-sidenav.html',
  styleUrls: ['./figma-sidenav.scss'],
})
export class FigmaSidenav {

  externalLegalMode: boolean = false;

  private lastUrl: string = '';

  constructor(private router: Router) {
    this.initRouteWatcher();
  }

  trackByIdx(_: number, item: any) { return item?.id ?? _; }

private initRouteWatcher(): void {
  this.router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe(event => {
    const nav = event as NavigationEnd;
    const current = nav.urlAfterRedirects;
    this.externalLegalMode = this.isExternalLegalView(current, this.lastUrl);
    this.lastUrl = current;
  });
}

private isExternalLegalView(current: string, previous: string): boolean {
  if (!this.isLegalPath(current)) return false;
if (!previous) return true; return ( previous.startsWith('/login') || previous.startsWith('/sign-up') );
};


private isLegalPath(url: string): boolean {
  return url.startsWith('/privacy-policy') || url.startsWith('/legal-notice')
};
}

