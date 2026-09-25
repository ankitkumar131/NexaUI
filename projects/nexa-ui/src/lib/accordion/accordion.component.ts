import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, input } from '@angular/core';
import { nexaCn } from '../utils/utils';
import { NexaAccordionItemComponent } from './accordion-item.component';

export type NexaAccordionType = 'single' | 'multiple';

/**
 * NexaAccordion — coordinates `nexa-accordion-item` children (single/multiple).
 *
 * ```html
 * <nexa-accordion type="single">
 *   <nexa-accordion-item value="a" title="What is Nexa UI?">…</nexa-accordion-item>
 *   <nexa-accordion-item value="b" title="Is it free?">…</nexa-accordion-item>
 * </nexa-accordion>
 * ```
 */
@Component({
  selector: 'nexa-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaAccordionComponent {
  readonly type = input<NexaAccordionType>('single');
  /** Single mode: allow closing the last open item. */
  readonly collapsible = input(true);
  readonly extraClass = input('');

  protected readonly items = contentChildren(NexaAccordionItemComponent);

  constructor() {
    effect((onCleanup) => {
      const subs = this.items().flatMap((item) => [
        item.opened.subscribe(() => this.onItemOpened(item)),
        item.closed.subscribe(() => this.onItemClosed(item)),
      ]);
      onCleanup(() => subs.forEach((s) => s.unsubscribe()));
    });
  }

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-accordion-host', `nexa-accordion-host--${this.type()}`, this.extraClass())
  );

  private onItemOpened(opened: NexaAccordionItemComponent): void {
    if (this.type() === 'single') {
      for (const item of this.items()) {
        if (item !== opened) item.close();
      }
    }
  }

  private onItemClosed(closed: NexaAccordionItemComponent): void {
    if (this.type() === 'single' && !this.collapsible()) {
      const anyOpen = this.items().some((i) => i.open());
      if (!anyOpen) closed.open.set(true);
    }
  }
}
