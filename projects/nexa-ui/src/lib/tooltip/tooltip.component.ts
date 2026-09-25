import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaTooltipSide = 'top' | 'bottom' | 'left' | 'right';

/**
 * NexaTooltip — zero-JS hover/focus hint for icon buttons and abbreviations.
 * Shows on hover AND keyboard focus.
 *
 * ```html
 * <nexa-tooltip text="Save changes">
 *   <nexa-button size="icon" ariaLabel="Save">💾</nexa-button>
 * </nexa-tooltip>
 * ```
 */
@Component({
  selector: 'nexa-tooltip',
  standalone: true,
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaTooltipComponent {
  readonly text = input('');
  readonly side = input<NexaTooltipSide>('top');
  readonly disabled = input(false);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() => nexaCn('nexa-tooltip-host', this.extraClass()));
  protected readonly bubbleClasses = computed(() =>
    nexaCn('nexa-tooltip__bubble', `nexa-tooltip__bubble--${this.side()}`)
  );
}
