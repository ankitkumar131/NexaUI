import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaProgressVariant = 'default' | 'success' | 'warning' | 'destructive' | 'info';

/**
 * NexaProgress — determinate bar (or indeterminate shimmer) with progressbar semantics.
 *
 * ```html
 * <nexa-progress [value]="uploadPct" ariaLabel="Upload progress" />
 * <nexa-progress [indeterminate]="true" ariaLabel="Loading" />
 * ```
 */
@Component({
  selector: 'nexa-progress',
  standalone: true,
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaProgressComponent {
  readonly value = input(0);
  readonly max = input(100);
  readonly variant = input<NexaProgressVariant>('default');
  readonly size = input<'sm' | 'default' | 'lg'>('default');
  readonly indeterminate = input(false);
  readonly showLabel = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() => nexaCn('nexa-progress-host', this.extraClass()));
  protected readonly pct = computed(() => {
    const max = Math.max(1, this.max());
    return Math.min(100, Math.max(0, (this.value() / max) * 100));
  });
  protected readonly barClasses = computed(() =>
    nexaCn(
      'nexa-progress__bar',
      `nexa-progress__bar--${this.variant()}`,
      `nexa-progress__bar--${this.size()}`,
      { 'nexa-progress__bar--indeterminate': this.indeterminate() }
    )
  );
}
