import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Signal, effect, inject, signal } from '@angular/core';

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

export interface NexaOverlayMotion {
  /** True while the overlay (or its exit animation) should render. */
  readonly rendered: Signal<boolean>;
  /** True while the exit animation is playing. */
  readonly closing: Signal<boolean>;
}

/**
 * Exit-animation state machine for overlays. Handles internal AND external
 * closes uniformly: when `open` flips to false, `rendered` stays true for
 * `closeMs` while `closing` plays the exit animation, then unmounts.
 *
 * ```ts
 * private readonly motion = nexaOverlayMotion(this.open, 180);
 * protected readonly rendered = this.motion.rendered;
 * protected readonly closing = this.motion.closing;
 * ```
 * ```html
 * @if (rendered()) {
 *   <div class="panel" [class.panel--closing]="closing()">...</div>
 * }
 * ```
 */
export function nexaOverlayMotion(open: Signal<boolean>, closeMs = 180): NexaOverlayMotion {
  const rendered = signal(open());
  const closing = signal(false);
  effect((onCleanup) => {
    if (open()) {
      closing.set(false);
      if (!rendered()) rendered.set(true);
      return;
    }
    if (!rendered()) return;
    closing.set(true);
    const timer = setTimeout(() => {
      rendered.set(false);
      closing.set(false);
    }, closeMs);
    onCleanup(() => clearTimeout(timer));
  });
  return { rendered, closing };
}
