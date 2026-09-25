import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn, nexaUniqueId } from '../utils/utils';
import { NexaLabelComponent } from '../label/label.component';

/**
 * NexaField — label + control + description/error composition.
 * Pass the same `controlId` to the inner control's `id` for association.
 *
 * ```html
 * <nexa-field label="Email" controlId="email" description="We never share it." [required]="true">
 *   <nexa-input id="email" type="email" />
 * </nexa-field>
 * ```
 */
@Component({
  selector: 'nexa-field',
  standalone: true,
  imports: [NexaLabelComponent],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaFieldComponent {
  readonly label = input('');
  readonly description = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly required = input(false);
  readonly controlId = input(nexaUniqueId('nexa-field'));
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-field-host', { 'nexa-field-host--invalid': !!this.error() }, this.extraClass())
  );
  protected readonly descId = computed(() => `${this.controlId()}-desc`);
  protected readonly errorId = computed(() => `${this.controlId()}-error`);
}
