import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { nexaCn, nexaUniqueId } from '../utils/utils';

/**
 * NexaCollapsible — generic show/hide wrapper (simpler than accordion).
 *
 * ```html
 * <nexa-collapsible>
 *   <nexa-button slot="trigger" variant="outline">Show details</nexa-button>
 *   <p>Hidden content…</p>
 * </nexa-collapsible>
 * ```
 */
@Component({
  selector: 'nexa-collapsible',
  standalone: true,
  templateUrl: './collapsible.component.html',
  styleUrl: './collapsible.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaCollapsibleComponent {
  readonly open = model(false);
  readonly disabled = input(false);
  readonly id = input(nexaUniqueId('nexa-collapsible'));
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-collapsible-host', { 'nexa-collapsible-host--open': this.open() }, this.extraClass())
  );
  protected readonly panelId = computed(() => `${this.id()}-panel`);

  protected toggle(): void {
    if (this.disabled()) return;
    this.open.update((v) => !v);
  }
}
