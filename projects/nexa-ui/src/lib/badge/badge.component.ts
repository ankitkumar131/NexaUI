import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaBadgeVariant =
  | 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
export type NexaBadgeSize = 'sm' | 'default' | 'lg';

/** NexaBadge — compact status/count label. `<nexa-badge variant="success">Active</nexa-badge>` */
@Component({
  selector: 'nexa-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-variant]': 'variant()',
  },
})
export class NexaBadgeComponent {
  readonly variant = input<NexaBadgeVariant>('default');
  readonly size = input<NexaBadgeSize>('default');
  readonly pill = input(true);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() => nexaCn('nexa-badge-host'));

  protected readonly badgeClasses = computed(() =>
    nexaCn(
      'nexa-badge',
      `nexa-badge--${this.variant()}`,
      `nexa-badge--${this.size()}`,
      { 'nexa-badge--pill': this.pill() },
      this.extraClass()
    )
  );
}
