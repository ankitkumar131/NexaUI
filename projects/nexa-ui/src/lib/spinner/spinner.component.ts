import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaSpinner — accessible loading ring. Announces via `role="status"`.
 *
 * ```html
 * <nexa-spinner label="Saving…" />
 * <nexa-button [loading]="true">…</nexa-button> <!-- inline alternative -->
 * ```
 */
@Component({
  selector: 'nexa-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaSpinnerComponent {
  readonly size = input<'xs' | 'sm' | 'default' | 'lg' | 'xl'>('default');
  /** Screen-reader announcement (also visible when `showLabel`). */
  readonly label = input('Loading');
  readonly showLabel = input(false);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-spinner-host', `nexa-spinner-host--${this.size()}`, this.extraClass())
  );
}
