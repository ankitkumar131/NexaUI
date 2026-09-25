import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';

export type NexaDir = 'ltr' | 'rtl';

const STORAGE_KEY = 'nexa-ui-dir';

/**
 * NexaDirectionService — global LTR/RTL controller. Sets `dir` on `<html>`
 * (SSR-safe) and persists the choice. All Nexa components use logical CSS
 * properties, so they mirror automatically.
 *
 * ```ts
 * private readonly dir = inject(NexaDirectionService);
 * this.dir.toggle(); // or .setDir('rtl')
 * ```
 */
@Injectable({ providedIn: 'root' })
export class NexaDirectionService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT, { optional: true });

  readonly dir = signal<NexaDir>('ltr');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEY);
      const initial =
        stored === 'rtl' || stored === 'ltr'
          ? stored
          : (this.document?.documentElement.getAttribute('dir') as NexaDir | null) ?? 'ltr';
      this.dir.set(initial === 'rtl' ? 'rtl' : 'ltr');
    }
    effect(() => {
      const dir = this.dir();
      const el = this.document?.documentElement;
      if (el) el.setAttribute('dir', dir);
      if (isPlatformBrowser(this.platformId)) localStorage.setItem(STORAGE_KEY, dir);
    });
  }

  setDir(dir: NexaDir): void {
    this.dir.set(dir);
  }

  toggle(): void {
    this.dir.update((d) => (d === 'ltr' ? 'rtl' : 'ltr'));
  }
}
