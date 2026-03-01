import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- ================= NAVBAR ================= -->
    <header class="navbar">
      <div class="navbar__inner">

        <div class="navbar__brand">
          <div class="navbar__logo">
            <svg viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#grad)"/>
              <path d="M8 16L14 22L24 10" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stop-color="#0078d4"/>
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
          <a routerLink="/products"
             routerLinkActive="navbar__link--active"
             class="navbar__link">
            Products
          </a>
        </nav>

        <div class="navbar__right">
          <div class="navbar__avatar"
               title="Admin User"
               (click)="toggleProfile()">
            Admin
          </div>
        </div>

      </div>
    </header>

    <!-- ================= OVERLAY ================= -->
    <div class="overlay"
         *ngIf="isProfileOpen()"
         (click)="closeProfile()">
    </div>

    <!-- ================= PROFILE SIDEBAR ================= -->
    <aside class="profile-sidebar" [class.open]="isProfileOpen()">

      <div class="profile-sidebar__header">
        <div class="profile-sidebar__avatar">A</div>
        <div class="profile-sidebar__info">
          <h4>Admin User</h4>
          <p>Super Admin</p>
        </div>
        <button class="close-btn" (click)="closeProfile()">✕</button>
      </div>

      <div class="profile-sidebar__content">
        <div class="profile-item">
          <span class="label">Email:</span>
          <span class="value">admin@example.com</span>
        </div>
        <div class="profile-item">
          <span class="label">Phone:</span>
          <span class="value">+880 1234-567890</span>
        </div>
        <div class="profile-item">
          <span class="label">Address:</span>
          <span class="value">Dhaka, Bangladesh</span>
        </div>
      </div>

      <button class="logout-btn">Logout</button>

    </aside>
  `,
  styles: [`
    /* NAVBAR */
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #fff;
      border-bottom: 1px solid #d0e8f7;
      box-shadow: 0 2px 8px rgba(0,120,212,.08);
    }

    .navbar__inner {
      max-width: 1360px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      padding: 0 28px;
      height: 64px;
      gap: 32px;
    }

    .navbar__brand { display: flex; align-items: center; gap: 12px; }
    .navbar__logo { width: 36px; height: 36px; }
    .navbar__title { font-size: 17px; font-weight: 800; color: #0078d4; }
    .navbar__subtitle { font-size: 11px; color: #718096; }
    .navbar__nav { flex: 1; }
    .navbar__link {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      color: #4a5568;
      transition: .2s;
    }
    .navbar__link:hover,
    .navbar__link--active { background: #e6f2fb; color: #0078d4; }

    .navbar__right { margin-left: auto; }
    .navbar__avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0078d4, #50e6ff);
      color: #fff;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,120,212,.3);
    }

    /* OVERLAY */
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.4);
      z-index: 199;
    }

    /* PROFILE SIDEBAR */
    .profile-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 320px;
      height: 100vh;
      background: #f7f9fc;
      box-shadow: -4px 0 20px rgba(0,0,0,0.1);
      padding: 24px;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      z-index: 200;
      display: flex;
      flex-direction: column;
      border-top-left-radius: 12px;
    }

    .profile-sidebar.open { transform: translateX(0); }

    .profile-sidebar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .profile-sidebar__avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0078d4, #50e6ff);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .profile-sidebar__info h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: #1a202c;
    }

    .profile-sidebar__info p {
      margin: 2px 0 0 0;
      font-size: 13px;
      color: #718096;
    }

    .close-btn {
      border: none;
      background: transparent;
      font-size: 20px;
      cursor: pointer;
      color: #718096;
    }

    .profile-sidebar__content {
      flex: 1;
      margin-top: 12px;
    }

    .profile-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
      font-size: 14px;
      color: #4a5568;
    }

    .profile-item .label { font-weight: 600; }
    .logout-btn {
      margin-top: auto;
      padding: 10px;
      background: #0078d4;
      color: #fff;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background .2s;
    }

    .logout-btn:hover { background: #005fa3; }

  `]
})
export class NavbarComponent {
  isProfileOpen = signal(false);

  toggleProfile() { this.isProfileOpen.update(v => !v); }
  closeProfile() { this.isProfileOpen.set(false); }
}