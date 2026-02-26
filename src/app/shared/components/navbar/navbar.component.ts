import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="navbar">
      <div class="navbar__inner">
        <div class="navbar__brand">
          <div class="navbar__logo">
            <svg viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#grad)"/>
              <path d="M8 16L14 22L24 10" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%"   stop-color="#0078d4"/>
                  <stop offset="100%" stop-color="#50e6ff"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="navbar__brand-text">
            <span class="navbar__title">ProductHub</span>
            <span class="navbar__subtitle">Inventory Manager</span>
          </div>
        </div>

        <nav class="navbar__nav">
          <a routerLink="/products" routerLinkActive="navbar__link--active" class="navbar__link">
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
            Products
          </a>
        </nav>

        <div class="navbar__right">
          <div class="navbar__avatar" title="Admin User">A</div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      position: sticky; top: 0; z-index: 100;
      background: #fff;
      border-bottom: 1px solid #d0e8f7;
      box-shadow: 0 2px 8px rgba(0,120,212,.08);
    }
    .navbar__inner {
      max-width: 1360px; margin: 0 auto;
      display: flex; align-items: center;
      padding: 0 28px; height: 64px; gap: 32px;
    }
    .navbar__brand {
      display: flex; align-items: center; gap: 12px; text-decoration: none;
    }
    .navbar__logo {
      width: 36px; height: 36px; flex-shrink: 0;
      svg { width: 100%; height: 100%; }
    }
    .navbar__brand-text {
      display: flex; flex-direction: column; line-height: 1;
    }
    .navbar__title {
      font-size: 17px; font-weight: 800; color: #0078d4; letter-spacing: -.4px;
    }
    .navbar__subtitle {
      font-size: 11px; font-weight: 500; color: #718096; letter-spacing: .02em;
    }
    .navbar__nav {
      display: flex; align-items: center; gap: 4px; flex: 1;
    }
    .navbar__link {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 16px; border-radius: 8px;
      font-size: 14px; font-weight: 600; color: #4a5568;
      text-decoration: none; transition: all .2s;
      &:hover { color: #0078d4; background: #e6f2fb; }
      &--active { color: #0078d4; background: #e6f2fb; }
    }
    .navbar__right {
      margin-left: auto; display: flex; align-items: center;
    }
    .navbar__avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: linear-gradient(135deg, #0078d4, #50e6ff);
      color: #fff; font-size: 14px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; box-shadow: 0 2px 8px rgba(0,120,212,.3);
    }
  `]
})
export class NavbarComponent {}