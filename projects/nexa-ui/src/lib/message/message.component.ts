import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaMessageFrom = 'user' | 'assistant' | 'system';

/**
 * NexaMessage — chat message row. Pairs with `nexa-bubble` / `nexa-message-scroller`.
 *
 * ```html
 * <nexa-message from="assistant" name="Nexa" time="10:24">
 *   Hello! How can I help?
 * </nexa-message>
 * ```
 */
@Component({
  selector: 'nexa-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaMessageComponent {
  readonly from = input<NexaMessageFrom>('assistant');
  readonly name = input('');
  readonly time = input('');
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-message-host', `nexa-message-host--${this.from()}`, this.extraClass())
  );
}
