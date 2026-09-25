import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { nexaCn, nexaUniqueId } from '../utils/utils';

/** NexaAccordionItem — one collapsible section. Works standalone or inside `nexa-accordion`. */
@Component({
  selector: 'nexa-accordion-item',
  standalone: true,
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaAccordionItemComponent {
  readonly value = input.required<string>();
  readonly title = input('');
  readonly open = model(false);
  readonly disabled = input(false);
  readonly id = input(nexaUniqueId('nexa-accordion-item'));
  readonly extraClass = input('');

  readonly opened = output<void>();
  readonly closed = output<void>();

  protected readonly hostClasses = computed(() =>
    nexaCn(
      'nexa-accordion-item-host',
      { 'nexa-accordion-item-host--open': this.open(), 'nexa-accordion-item-host--disabled': this.disabled() },
      this.extraClass()
    )
  );
  protected readonly triggerId = computed(() => `${this.id()}-trigger`);
  protected readonly panelId = computed(() => `${this.id()}-panel`);

  protected toggle(): void {
    if (this.disabled()) return;
    if (this.open()) {
      this.open.set(false);
      this.closed.emit();
    } else {
      this.open.set(true);
      this.opened.emit();
    }
  }

  /** Used by `nexa-accordion` for single-mode coordination (also public API). */
  close(): void {
    if (this.open()) {
      this.open.set(false);
      this.closed.emit();
    }
  }
}
