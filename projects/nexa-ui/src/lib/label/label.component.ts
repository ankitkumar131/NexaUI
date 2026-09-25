import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/** NexaLabel — accessible form label with required/disabled states. */
@Component({
  selector: 'nexa-label',
  standalone: true,
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaLabelComponent {
  /** Id of the associated control (native `for`). */
  readonly for = input<string | undefined>(undefined);
  readonly required = input(false);
  readonly disabled = input(false);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-label-host', { 'nexa-label-host--disabled': this.disabled() })
  );

  protected readonly labelClasses = computed(() =>
    nexaCn('nexa-label', { 'nexa-label--disabled': this.disabled() }, this.extraClass())
  );
}
