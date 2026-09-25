import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaBubbleTone = 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'info';
export type NexaBubbleTail = 'none' | 'left' | 'right';

/**
 * NexaBubble — compact inline callout for annotations, quotes and chat notes.
 *
 * ```html
 * <nexa-bubble tone="info" tail="left">Heads up: deploy at 5pm.</nexa-bubble>
 * ```
 */
@Component({
  selector: 'nexa-bubble',
  standalone: true,
  templateUrl: './bubble.component.html',
  styleUrl: './bubble.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaBubbleComponent {
  readonly tone = input<NexaBubbleTone>('default');
  readonly size = input<'sm' | 'default'>('default');
  readonly tail = input<NexaBubbleTail>('none');
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn(
      'nexa-bubble-host',
      `nexa-bubble-host--${this.tone()}`,
      `nexa-bubble-host--${this.size()}`,
      `nexa-bubble-host--tail-${this.tail()}`,
      this.extraClass()
    )
  );
}
