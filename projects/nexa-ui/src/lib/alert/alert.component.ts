import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaAlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

/**
 * NexaAlert — inline status message with variant iconography.
 *
 * ```html
 * <nexa-alert variant="success" title="Saved">Your changes are live.</nexa-alert>
 * <nexa-alert variant="destructive" [dismissible]="true">Something failed.</nexa-alert>
 * ```
 */
@Component({
  selector: 'nexa-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaAlertComponent {
  readonly variant = input<NexaAlertVariant>('default');
  readonly title = input('');
  readonly icon = input<string | undefined>(undefined);
  readonly dismissible = input(false);
  readonly extraClass = input('');

  readonly dismissed = output<void>();

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-alert-host', `nexa-alert-host--${this.variant()}`, this.extraClass())
  );
  protected readonly role = computed(() => (this.variant() === 'destructive' ? 'alert' : 'status'));
  protected readonly glyph = computed(() => {
    const custom = this.icon();
    if (custom !== undefined) return custom;
    switch (this.variant()) {
      case 'destructive':
        return '⛔';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📌';
    }
  });

  protected dismiss(): void {
    this.dismissed.emit();
  }
}
