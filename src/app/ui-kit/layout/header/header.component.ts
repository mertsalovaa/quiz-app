import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logoSrc: string = 'main-logo.svg';
  isMenuOpen = false;

  menuItems = [
    { link: 'quizzes-catalog', label: 'Quizzes catalog' },
    { link: 'quiz/0', label: 'Quiz' },
    { link: 'statistics', label: 'Statistics' },
  ];

  constructor(
    private router: Router,
    private destroyRef: DestroyRef,
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.router.events
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMenuOpen = false;
      }
    });
  }
}
