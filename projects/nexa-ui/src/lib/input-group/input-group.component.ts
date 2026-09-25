import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaInputGroup — prefix/suffix adornments around an input.
 * Pair with `<nexa-input [borderless]="true">` for a seamless join.
 *
 * ```html
 * <nexa-input-group>
 *   <span slot="prefix">$</span>
 *   <nexa-input [borderless]="true" placeholder="0.00" />
 *   <span slot="suffix">USD</span>
 * </nexa-input-group>
 * ```
 */
@Component({
  selector: 'nexa-input-group',
  standalone: true,
  templateUrl: './input-group.component.html',
  styleUrl: './input-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaInputGroupComponent {
  readonly size = input<'sm' | 'default' | 'lg'>('default');
  readonly invalid = input(false);
  readonly disabled = input(false);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn(
      'nexa-input-group-host',
      `nexa-input-group-host--${this.size()}`,
      { 'nexa-input-group-host--invalid': this.invalid(), 'nexa-input-group-host--disabled': this.disabled() },
      this.extraClass()
    )
  );
}
