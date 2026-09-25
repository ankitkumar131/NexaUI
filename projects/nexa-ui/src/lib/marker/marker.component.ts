import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaMarkerVariant = 'pin' | 'dot' | 'tag';
export type NexaMarkerTone = 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'info';

/**
 * NexaMarker — map pin, status dot or inline tag with optional pulse.
 *
 * ```html
 * <nexa-marker variant="pin" tone="destructive" ariaLabel="Office: Berlin" />
 * <nexa-marker variant="dot" tone="success" [pulse]="true" ariaLabel="Live" />
 * <nexa-marker variant="tag" tone="info">New</nexa-marker>
 * ```
 */
@Component({
  selector: 'nexa-marker',
  standalone: true,
  templateUrl: './marker.component.html',
  styleUrl: './marker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaMarkerComponent {
  readonly variant = input<NexaMarkerVariant>('pin');
  readonly tone = input<NexaMarkerTone>('primary');
  readonly size = input<'sm' | 'default' | 'lg'>('default');
  readonly pulse = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn(
      'nexa-marker-host',
      `nexa-marker-host--${this.variant()}`,
      `nexa-marker-host--${this.tone()}`,
      `nexa-marker-host--${this.size()}`,
      { 'nexa-marker-host--pulse': this.pulse() },
      this.extraClass()
    )
  );
}
