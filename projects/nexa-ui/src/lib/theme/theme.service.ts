import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';

export type NexaTheme = 'light' | 'dark' | 'system';
export type NexaResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'nexa-ui-theme';

/**
 * NexaThemeService — runtime theme controller for Nexa UI.
 *
 * - Persists to localStorage (SSR-safe, guarded by platform check).
 * - Toggles the `nexa-dark` class + `data-theme` attribute on <html>.
 * - `resolved()` always reports the effective light/dark value.
 *
 * Customize: wrap it, or simply set the class/attribute yourself and
 * override the `--nexa-*` CSS variables — components never read this
 * service directly for colors, only the CSS variables.
 */
@Injectable({ providedIn: 'root' })
export class NexaThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT, { optional: true });
  private mediaQuery: MediaQueryList | null = null;

  readonly theme = signal<NexaTheme>('system');
  readonly resolved = signal<NexaResolvedTheme>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEY) as NexaTheme | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        this.theme.set(stored);
      }
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQuery.addEventListener?.('change', () => this.apply());
    }
    effect(() => {
      this.theme();
      this.apply();
    });
  }

  setTheme(theme: NexaTheme): void {
    this.theme.set(theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }

  toggle(): void {
    this.setTheme(this.resolved() === 'dark' ? 'light' : 'dark');
  }

  private apply(): void {
    const prefersDark = this.mediaQuery?.matches ?? false;
    const current = this.theme();
    const resolved: NexaResolvedTheme =
      current === 'system' ? (prefersDark ? 'dark' : 'light') : current;
    this.resolved.set(resolved);
    const el = this.document?.documentElement;
    if (!el) return;
    el.classList.toggle('nexa-dark', resolved === 'dark');
    el.setAttribute('data-theme', resolved);
  }
}
