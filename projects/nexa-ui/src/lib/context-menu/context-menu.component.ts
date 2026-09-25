import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { nexaCn } from '../utils/utils';
import { nexaOverlayMotion } from '../utils/overlay';
import { NexaMenuItem } from '../dropdown-menu/dropdown-menu.component';

/**
 * NexaContextMenu — right-click menu for any wrapped area, with a
 * touch/long-press friendly alternative via `showTrigger`.
 *
 * ```html
 * <nexa-context-menu [items]="items" (selected)="onAction($event)">
 *   <div class="file-row">Right-click me</div>
 * </nexa-context-menu>
 * ```
 */
@Component({
  selector: 'nexa-context-menu',
  standalone: true,
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '(document:click)': 'onDocumentClick()',
    '(document:scroll)': 'onDocumentScroll()',
  },
})
export class NexaContextMenuComponent {
  readonly items = input<NexaMenuItem[]>([]);
  readonly open = model(false);
  private readonly motion = nexaOverlayMotion(this.open, 150);
  protected readonly rendered = this.motion.rendered;
  protected readonly closing = this.motion.closing;
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly disabled = input(false);
  readonly extraClass = input('');

  readonly selected = output<NexaMenuItem>();

  protected readonly x = signal(0);
  protected readonly y = signal(0);
  protected readonly activeIndex = signal(-1);

  protected readonly hostClasses = computed(() => nexaCn('nexa-ctx-host', this.extraClass()));
  protected readonly menuStyle = computed(() => ({
    left: `${this.x()}px`,
    top: `${this.y()}px`,
  }));

  protected onContextMenu(event: MouseEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Clamp so the ~15rem menu stays on screen.
    this.x.set(Math.min(event.clientX, Math.max(8, width - 250)));
    this.y.set(Math.min(event.clientY, Math.max(8, height - this.items().length * 40 - 30)));
    this.activeIndex.set(this.items().findIndex((i) => !i.disabled));
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

  protected onMenuKeydown(event: KeyboardEvent): void {
    const items = this.items();
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
          const item = items[this.activeIndex()];
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

  protected onDocumentClick(): void {
    if (this.open()) this.close();
  }

  protected onDocumentScroll(): void {
    if (this.open()) this.close();
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
