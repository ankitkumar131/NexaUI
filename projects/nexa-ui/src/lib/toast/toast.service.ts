import { Injectable, signal } from '@angular/core';
import { nexaUniqueId } from '../utils/utils';

export type NexaToastVariant = 'default' | 'success' | 'warning' | 'destructive' | 'info';

export interface NexaToastOptions {
  title?: string;
  description?: string;
  variant?: NexaToastVariant;
  /** Milliseconds before auto-dismiss (`0` = sticky). Defaults to 4000. */
  duration?: number;
}

export interface NexaToast extends Required<Pick<NexaToastOptions, 'variant' | 'duration'>> {
  id: string;
  title?: string;
  description?: string;
  leaving?: boolean;
}

/**
 * NexaToastService — imperative toast queue. Render `<nexa-toaster />` once
 * (usually in the app root) and call `toast.success('Saved')` from anywhere.
 *
 * ```ts
 * private readonly toast = inject(NexaToastService);
 * this.toast.success('Saved', 'Your changes are live.');
 * ```
 */
@Injectable({ providedIn: 'root' })
export class NexaToastService {
  private readonly queue = signal<readonly NexaToast[]>([]);
  readonly toasts = this.queue.asReadonly();

  show(options: NexaToastOptions): string {
    const toast: NexaToast = {
      id: nexaUniqueId('nexa-toast'),
      title: options.title,
      description: options.description,
      variant: options.variant ?? 'default',
      duration: options.duration ?? 4000,
    };
    this.queue.update((q) => [...q, toast]);
    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(toast.id), toast.duration);
    }
    return toast.id;
  }

  success(title: string, description?: string, options?: Partial<NexaToastOptions>): string {
    return this.show({ ...options, title, description, variant: 'success' });
  }

  error(title: string, description?: string, options?: Partial<NexaToastOptions>): string {
    return this.show({ ...options, title, description, variant: 'destructive' });
  }

  warning(title: string, description?: string, options?: Partial<NexaToastOptions>): string {
    return this.show({ ...options, title, description, variant: 'warning' });
  }

  info(title: string, description?: string, options?: Partial<NexaToastOptions>): string {
    return this.show({ ...options, title, description, variant: 'info' });
  }

  dismiss(id: string): void {
    let found = false;
    this.queue.update((q) =>
      q.map((t) => {
        if (t.id !== id || t.leaving) return t;
        found = true;
        return { ...t, leaving: true };
      })
    );
    // Let the 170ms exit animation finish before unmounting.
    if (found) setTimeout(() => this.queue.update((q) => q.filter((t) => t.id !== id)), 200);
  }

  clear(): void {
    this.queue.set([]);
  }
}
