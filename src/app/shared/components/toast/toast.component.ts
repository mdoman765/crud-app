import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast toast--{{ toast.type }}">
          <div class="toast__icon">
            @switch (toast.type) {
              @case ('success') { <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> }
              @case ('error')   { <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg> }
              @case ('warning') { <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg> }
              @default           { <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg> }
            }
          </div>
          <span class="toast__message">{{ toast.message }}</span>
          <button class="toast__close" (click)="toastService.remove(toast.id)" aria-label="Close">
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed; bottom: 28px; right: 28px;
      display: flex; flex-direction: column; gap: 10px; z-index: 9999;
    }
    .toast {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px; border-radius: 10px; border-left: 4px solid transparent;
      min-width: 300px; max-width: 420px; background: #fff;
      box-shadow: 0 8px 32px rgba(0,0,0,.15), 0 2px 8px rgba(0,0,0,.08);
      animation: slideIn .28s cubic-bezier(.34,1.56,.64,1);
    }
    .toast--success { border-color: #107c10; }
    .toast--error   { border-color: #a4262c; }
    .toast--warning { border-color: #ff8c00; }
    .toast--info    { border-color: #0078d4; }
    .toast__icon {
      width: 20px; height: 20px; flex-shrink: 0;
    }
    .toast--success .toast__icon { color: #107c10; }
    .toast--error   .toast__icon { color: #a4262c; }
    .toast--warning .toast__icon { color: #ff8c00; }
    .toast--info    .toast__icon { color: #0078d4; }
    .toast__message { font-size: 14px; font-weight: 500; color: #1a2332; flex: 1; }
    .toast__close {
      background: none; border: none; cursor: pointer; color: #718096;
      width: 20px; height: 20px; padding: 0; border-radius: 4px;
      transition: color .2s, background .2s; flex-shrink: 0;
      &:hover { color: #1a2332; background: #f0f4f8; }
    }
    @keyframes slideIn {
      from { transform: translateX(110%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}