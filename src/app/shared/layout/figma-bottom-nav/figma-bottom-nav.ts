import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'figma-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './figma-bottom-nav.html',
  styleUrls: ['./figma-bottom-nav.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FigmaBottomNav implements OnDestroy {
  showAppMenu: boolean = true;
  private routerSub?: Subscription;

  constructor(private router: Router) {

    this.updateVisibility(this.router.url);
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd)
        this.updateVisibility(event.urlAfterRedirects);
      });
}

private updateVisibility(url: string): void {
  const hide: { [key: string]: boolean } = {
    '/login': true,
    '/sign-up': true,
    '/privacy-policy': true,
    '/legal-notice': true,
  };
  this.showAppMenu = true;
  for (const key in hide) {
    if (url.startsWith(key))
      this.showAppMenu = false;
  }
}

  ngOnDestroy(): void {
    if (this.routerSub)
      this.routerSub.unsubscribe();
  }
}
