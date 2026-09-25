import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaToggle — two-state press button (bold, italic, mute…) with `aria-pressed`.
 *
 * ```html
 * <nexa-toggle [(pressed)]="bold" ariaLabel="Bold"><strong>B</strong></nexa-toggle>
 * ```
 */
@Component({
  selector: 'nexa-toggle',
  standalone: true,
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaToggleComponent {
  readonly pressed = model(false);
  readonly variant = input<'default' | 'outline'>('default');
  readonly size = input<'sm' | 'default' | 'lg'>('default');
  readonly disabled = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() => nexaCn('nexa-toggle-host'));
  protected readonly btnClasses = computed(() =>
    nexaCn(
      'nexa-toggle',
      'nexa-focus-ring',
      `nexa-toggle--${this.variant()}`,
      `nexa-toggle--${this.size()}`,
      { 'nexa-toggle--pressed': this.pressed() },
      this.extraClass()
    )
  );

  protected toggle(): void {
    if (this.disabled()) return;
    this.pressed.update((v) => !v);
  }
}
