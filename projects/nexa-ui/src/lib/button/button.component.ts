import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
export type NexaButtonSize = 'sm' | 'default' | 'lg' | 'icon';

/**
 * NexaButton — primary action control.
 *
 * Usage:
 * ```html
 * <nexa-button variant="default" (pressed)="save()">Save</nexa-button>
 * <nexa-button variant="outline" size="sm" [loading]="saving">Submit</nexa-button>
 * ```
 *
 * Customization: `extraClass`, `--nexa-button-*` CSS variables, or ng-content projection.
 */
@Component({
  selector: 'nexa-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-disabled]': 'isDisabled()',
  },
})
export class NexaButtonComponent {
  readonly variant = input<NexaButtonVariant>('default');
  readonly size = input<NexaButtonSize>('default');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly fullWidth = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input<string>('');

  readonly pressed = output<MouseEvent>();

  protected readonly isDisabled = computed(() => this.disabled() || this.loading());

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-button-host', { 'nexa-button-host--full': this.fullWidth() })
  );

  protected readonly buttonClasses = computed(() =>
    nexaCn(
      'nexa-button',
      'nexa-focus-ring',
      `nexa-button--${this.variant()}`,
      `nexa-button--${this.size()}`,
      { 'nexa-button--full': this.fullWidth(), 'nexa-button--loading': this.loading() },
      this.extraClass()
    )
  );

  protected onClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.pressed.emit(event);
  }
}
