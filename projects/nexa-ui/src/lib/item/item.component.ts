import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaItem — generic list row (settings, files, members) with leading/trailing slots.
 * Renders an `<a>` when `href` is set, otherwise a `<div>`.
 *
 * ```html
 * <nexa-item title="Notifications" description="Push, email, SMS">
 *   <span slot="leading">🔔</span>
 *   <nexa-switch slot="trailing" [(checked)]="on" ariaLabel="Notifications" />
 * </nexa-item>
 * <nexa-item title="Billing" href="/billing" />
 * ```
 */
@Component({
  selector: 'nexa-item',
  standalone: true,
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaItemComponent {
  readonly title = input('');
  readonly description = input('');
  readonly href = input<string | undefined>(undefined);
  readonly disabled = input(false);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn(
      'nexa-item-host',
      { 'nexa-item-host--link': !!this.href(), 'nexa-item-host--disabled': this.disabled() },
      this.extraClass()
    )
  );
}
