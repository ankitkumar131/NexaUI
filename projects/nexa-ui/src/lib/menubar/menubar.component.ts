import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, output, signal } from '@angular/core';
import { nexaCn } from '../utils/utils';
import { NexaMenuItem } from '../dropdown-menu/dropdown-menu.component';

export interface NexaMenubarMenu {
  label: string;
  items: NexaMenuItem[];
}

export interface NexaMenubarSelection {
  menu: string;
  item: NexaMenuItem;
}

/**
 * NexaMenubar — desktop-style menu bar (File · Edit · View) with keyboard support.
 *
 * ```html
 * <nexa-menubar [menus]="menus" (selected)="onCommand($event)" />
 * ```
 */
@Component({
  selector: 'nexa-menubar',
  standalone: true,
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class NexaMenubarComponent {
  readonly menus = input<NexaMenubarMenu[]>([]);
  readonly ariaLabel = input('Application menu');
  readonly extraClass = input('');

  readonly selected = output<NexaMenubarSelection>();

  private readonly hostRef = inject(ElementRef);
  protected readonly openIndex = signal(-1);
  protected readonly activeItem = signal(-1);

  protected readonly hostClasses = computed(() => nexaCn('nexa-menubar-host', this.extraClass()));

  protected isOpen(index: number): boolean {
    return this.openIndex() === index;
  }

  protected openMenu(index: number): void {
    this.openIndex.set(index);
    this.activeItem.set(this.menus()[index]?.items.findIndex((i) => !i.disabled) ?? -1);
  }

  protected close(): void {
    this.openIndex.set(-1);
    this.activeItem.set(-1);
  }

  protected onTriggerClick(index: number): void {
    if (this.isOpen(index)) this.close();
    else this.openMenu(index);
  }

  protected onTriggerEnter(index: number): void {
    if (this.openIndex() >= 0 && !this.isOpen(index)) this.openMenu(index);
  }

  protected onTriggerKeydown(index: number, event: KeyboardEvent): void {
    const count = this.menus().length;
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault();
        this.openMenu(index);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.openMenu((index + 1) % count);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.openMenu((index - 1 + count) % count);
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  protected onMenuKeydown(menuIndex: number, event: KeyboardEvent): void {
    const items = this.menus()[menuIndex]?.items ?? [];
    const count = this.menus().length;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.stepItem(items, 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.stepItem(items, -1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.openMenu((menuIndex + 1) % count);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.openMenu((menuIndex - 1 + count) % count);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        {
          const item = items[this.activeItem()];
          if (item) this.choose(menuIndex, item);
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

  protected setActive(index: number, menuIndex: number): void {
    const item = this.menus()[menuIndex]?.items[index];
    if (item && !item.disabled) this.activeItem.set(index);
  }

  protected choose(menuIndex: number, item: NexaMenuItem): void {
    if (item.disabled) return;
    const menu = this.menus()[menuIndex];
    this.close();
    if (menu) this.selected.emit({ menu: menu.label, item });
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.hostRef.nativeElement.contains(event.target as Node)) this.close();
  }

  private stepItem(items: NexaMenuItem[], delta: 1 | -1): void {
    if (!items.length) return;
    let index = this.activeItem();
    for (let i = 0; i < items.length; i++) {
      index = (index + delta + items.length) % items.length;
      if (!items[index]?.disabled) {
        this.activeItem.set(index);
        return;
      }
    }
  }
}
