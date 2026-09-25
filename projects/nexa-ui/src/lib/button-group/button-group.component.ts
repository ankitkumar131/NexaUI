import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaButtonGroup — joins `nexa-button` children into one segmented control.
 *
 * ```html
 * <nexa-button-group ariaLabel="Text alignment">
 *   <nexa-button>Left</nexa-button>
 *   <nexa-button>Center</nexa-button>
 *   <nexa-button>Right</nexa-button>
 * </nexa-button-group>
 * ```
 */
@Component({
  selector: 'nexa-button-group',
  standalone: true,
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaButtonGroupComponent {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-btn-group-host', `nexa-btn-group-host--${this.orientation()}`, this.extraClass())
  );
}
