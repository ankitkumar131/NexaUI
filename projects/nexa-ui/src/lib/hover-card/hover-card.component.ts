import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaHoverCardSide = 'top' | 'bottom' | 'left' | 'right';

/**
 * NexaHoverCard — rich preview card revealed on hover/focus (CSS-only).
 * Ideal for profile previews and link unfurls.
 *
 * ```html
 * <nexa-hover-card>
 *   <a slot="trigger" href="/u/ada">&#64;ada</a>
 *   <strong>Ada Lovelace</strong><p>First programmer…</p>
 * </nexa-hover-card>
 * ```
 */
@Component({
  selector: 'nexa-hover-card',
  standalone: true,
  templateUrl: './hover-card.component.html',
  styleUrl: './hover-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaHoverCardComponent {
  readonly side = input<NexaHoverCardSide>('bottom');
  readonly width = input('19rem');
  readonly openDelay = input(200);
  readonly closeDelay = input(120);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() => nexaCn('nexa-hover-card-host', this.extraClass()));
  protected readonly cardClasses = computed(() =>
    nexaCn('nexa-hover-card__card', `nexa-hover-card__card--${this.side()}`)
  );
}
