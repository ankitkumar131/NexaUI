import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Signal, effect, inject } from '@angular/core';

/**
 * Locks body scroll while `open()` is true. Call it in an overlay component's
 * constructor (injection context required). SSR-safe no-op on the server.
 *
 * ```ts
 * constructor() {
 *   nexaLockBodyScroll(this.open);
 * }
 * ```
 */
export function nexaLockBodyScroll(open: Signal<boolean>): void {
  const platformId = inject(PLATFORM_ID);
  const document = inject(DOCUMENT, { optional: true });
  if (!isPlatformBrowser(platformId) || !document) return;
  effect((onCleanup) => {
    if (!open()) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    onCleanup(() => {
      document.body.style.overflow = prev;
    });
  });
}
