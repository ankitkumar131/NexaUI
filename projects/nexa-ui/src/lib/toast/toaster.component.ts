import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { nexaCn } from '../utils/utils';
import { NexaToastService, NexaToastVariant } from './toast.service';

export type NexaToasterPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

/**
 * NexaToaster — renders the `NexaToastService` queue. Place once in the app root.
 *
 * ```html
 * <nexa-toaster position="bottom-right" />
 * ```
 */
@Component({
  selector: 'nexa-toaster',
  standalone: true,
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaToasterComponent {
  readonly position = input<NexaToasterPosition>('bottom-right');
  readonly extraClass = input('');

  protected readonly service = inject(NexaToastService);

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-toaster-host', `nexa-toaster-host--${this.position()}`, this.extraClass())
  );

  protected glyph(variant: NexaToastVariant): string {
    switch (variant) {
      case 'success':
        return '✅';
      case 'destructive':
        return '⛔';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📌';
    }
  }
}
