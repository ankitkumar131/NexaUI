import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaScrollOrientation = 'vertical' | 'horizontal' | 'both';

/**
 * NexaScrollArea — themed scroll container with slim cross-browser scrollbars.
 *
 * ```html
 * <nexa-scroll-area maxHeight="14rem">
 *   …long content…
 * </nexa-scroll-area>
 * ```
 */
@Component({
  selector: 'nexa-scroll-area',
  standalone: true,
  templateUrl: './scroll-area.component.html',
  styleUrl: './scroll-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaScrollAreaComponent {
  readonly maxHeight = input('16rem');
  readonly orientation = input<NexaScrollOrientation>('vertical');
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-scroll-host', `nexa-scroll-host--${this.orientation()}`, this.extraClass())
  );
}
