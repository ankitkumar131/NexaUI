import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { nexaCn } from '../utils/utils';
import { nexaLockBodyScroll } from '../utils/overlay';

export interface NexaCommandItem {
  label: string;
  value?: string;
  hint?: string;
  group?: string;
  disabled?: boolean;
}

interface NexaCommandGroup {
  name: string;
  entries: Array<{ item: NexaCommandItem; flatIndex: number }>;
}

/**
 * NexaCommand — ⌘K command palette with search, groups and keyboard control.
 *
 * ```html
 * <nexa-command [(open)]="cmdOpen" [items]="commands" (selected)="run($event)" />
 * ```
 */
@Component({
  selector: 'nexa-command',
  standalone: true,
  templateUrl: './command.component.html',
  styleUrl: './command.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaCommandComponent {
  readonly open = model(false);
  readonly items = input<NexaCommandItem[]>([]);
  readonly placeholder = input('Type a command or search…');
  readonly emptyText = input('No results found.');
  readonly ariaLabel = input('Command menu');
  readonly extraClass = input('');

  readonly selected = output<NexaCommandItem>();

  protected readonly query = signal('');

  constructor() {
    nexaLockBodyScroll(this.open);
  }

  protected readonly hostClasses = computed(() => nexaCn('nexa-command-host', this.extraClass()));

  protected readonly flat = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.items().filter((i) => !q || i.label.toLowerCase().includes(q));
  });

  protected readonly groups = computed<NexaCommandGroup[]>(() => {
    const flat = this.flat();
    const order: string[] = [];
    const map = new Map<string, NexaCommandGroup>();
    flat.forEach((item, flatIndex) => {
      const name = item.group ?? '';
      if (!map.has(name)) {
        const group: NexaCommandGroup = { name, entries: [] };
        map.set(name, group);
        order.push(name);
      }
      map.get(name)?.entries.push({ item, flatIndex });
    });
    // Ungrouped first, then alphabetical groups.
    return order
      .sort((a, b) => (a === '' ? -1 : b === '' ? 1 : a.localeCompare(b)))
      .map((name) => map.get(name) as NexaCommandGroup);
  });

  protected readonly activeIndex = signal(0);

  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.activeIndex.set(0);
  }

  protected close(): void {
    this.open.set(false);
    this.query.set('');
    this.activeIndex.set(0);
  }

  protected choose(item: NexaCommandItem): void {
    if (item.disabled) return;
    this.close();
    this.selected.emit(item);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const enabled = this.flat()
      .map((item, flatIndex) => ({ item, flatIndex }))
      .filter((e) => !e.item.disabled);
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.stepEnabled(enabled, 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.stepEnabled(enabled, -1);
        break;
      case 'Enter': {
        event.preventDefault();
        const entry = enabled.find((e) => e.flatIndex === this.activeIndex()) ?? enabled[0];
        if (entry) this.choose(entry.item);
        break;
      }
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  private stepEnabled(enabled: Array<{ flatIndex: number }>, delta: 1 | -1): void {
    if (!enabled.length) return;
    const positions = enabled.map((e) => e.flatIndex);
    const current = positions.indexOf(this.activeIndex());
    const next = positions[(current + delta + positions.length) % positions.length] ?? positions[0];
    if (next !== undefined) this.activeIndex.set(next);
  }
}
