import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, model, output, signal } from '@angular/core';
import { nexaCn } from '../utils/utils';
import { nexaOverlayMotion } from '../utils/overlay';

export interface NexaMenuItem {
  label: string;
  value?: string;
  hint?: string;
  disabled?: boolean;
  destructive?: boolean;
  separatorBefore?: boolean;
}

/**
 * NexaDropdownMenu — action menu with keyboard navigation.
 *
 * ```html
 * <nexa-dropdown-menu [items]="items" (selected)="onAction($event)">
 *   <nexa-button slot="trigger" variant="outline">Actions ▾</nexa-button>
 * </nexa-dropdown-menu>
 * ```
 */
@Component({
  selector: 'nexa-dropdown-menu',
  standalone: true,
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class NexaDropdownMenuComponent {
  readonly items = input<NexaMenuItem[]>([]);
  readonly open = model(false);
  private readonly motion = nexaOverlayMotion(this.open, 150);
  protected readonly rendered = this.motion.rendered;
  protected readonly closing = this.motion.closing;
  readonly align = input<'start' | 'end'>('start');
  readonly width = input('13rem');
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly disabled = input(false);
  readonly extraClass = input('');

  readonly selected = output<NexaMenuItem>();

  private readonly hostRef = inject(ElementRef);
  protected readonly activeIndex = signal(-1);

  protected readonly hostClasses = computed(() => nexaCn('nexa-menu-host', this.extraClass()));
  protected readonly menuClasses = computed(() =>
    nexaCn('nexa-menu__list', `nexa-menu__list--align-${this.align()}`)
  );

  protected toggle(): void {
    if (this.disabled()) return;
    if (this.open()) {
      this.close();
      return;
    }
    this.activeIndex.set(this.firstEnabled());
    this.open.set(true);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected choose(item: NexaMenuItem): void {
    if (item.disabled) return;
    this.close();
    this.selected.emit(item);
  }

  protected setActive(index: number): void {
    if (!this.items()[index]?.disabled) this.activeIndex.set(index);
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.open()) this.toggle();
    } else if (event.key === 'Escape' && this.open()) {
      this.close();
    }
  }

  protected onMenuKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        {
          const item = this.items()[this.activeIndex()];
          if (item) this.choose(item);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.hostRef.nativeElement.contains(event.target as Node)) {
      if (this.open()) this.close();
    }
  }

  private firstEnabled(): number {
    return this.items().findIndex((i) => !i.disabled);
  }

  private moveActive(delta: 1 | -1): void {
    const items = this.items();
    if (!items.length) return;
    let index = this.activeIndex();
    for (let i = 0; i < items.length; i++) {
      index = (index + delta + items.length) % items.length;
      if (!items[index]?.disabled) {
        this.activeIndex.set(index);
        return;
      }
    }
  }
}
