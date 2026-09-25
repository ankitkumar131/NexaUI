import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaEmpty — friendly zero-state (no results, empty inbox, fresh project).
 *
 * ```html
 * <nexa-empty icon="📭" title="No messages" description="You're all caught up!">
 *   <nexa-button slot="action" size="sm">Compose</nexa-button>
 * </nexa-empty>
 * ```
 */
@Component({
  selector: 'nexa-empty',
  standalone: true,
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaEmptyComponent {
  readonly icon = input('📭');
  readonly title = input('Nothing here yet');
  readonly description = input('');
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() => nexaCn('nexa-empty-host', this.extraClass()));
}
