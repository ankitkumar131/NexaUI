import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { nexaCn } from '../utils/utils';
import {
  NexaTableBodyComponent,
  NexaTableCellComponent,
  NexaTableComponent,
  NexaTableHeadComponent,
  NexaTableHeaderComponent,
  NexaTableRowComponent,
} from '../table/table.component';
import { NexaInputComponent } from '../input/input.component';
import { NexaCheckboxComponent } from '../checkbox/checkbox.component';
import { NexaPaginationComponent } from '../pagination/pagination.component';

export interface NexaDataColumn {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
}

export type NexaRow = Record<string, unknown>;

/**
 * NexaDataTable — sorting, search, pagination and row selection composed
 * from `nexa-table`, `nexa-input`, `nexa-checkbox` and `nexa-pagination`.
 *
 * ```html
 * <nexa-data-table [columns]="cols" [data]="rows" [selectable]="true" [(selectedKeys)]="sel" />
 * ```
 */
@Component({
  selector: 'nexa-data-table',
  standalone: true,
  imports: [
    NexaTableComponent,
    NexaTableHeaderComponent,
    NexaTableBodyComponent,
    NexaTableRowComponent,
    NexaTableHeadComponent,
    NexaTableCellComponent,
    NexaInputComponent,
    NexaCheckboxComponent,
    NexaPaginationComponent,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaDataTableComponent {
  readonly columns = input<NexaDataColumn[]>([]);
  readonly data = input<NexaRow[]>([]);
  /** Field used as the row identity for selection. */
  readonly rowKey = input('id');
  readonly selectable = input(false);
  readonly selectedKeys = model<Array<string | number>>([]);
  /** `0` disables pagination (shows all). */
  readonly pageSize = input(5);
  readonly showSearch = input(true);
  readonly searchPlaceholder = input('Search…');
  readonly emptyText = input('No results found.');
  readonly caption = input('');
  readonly extraClass = input('');

  protected readonly query = signal('');
  protected readonly sortKey = signal<string | null>(null);
  protected readonly sortDir = signal<'asc' | 'desc'>('asc');
  protected readonly page = signal(1);

  protected readonly hostClasses = computed(() => nexaCn('nexa-data-table-host', this.extraClass()));

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const rows = this.data();
    if (!q) return rows;
    const cols = this.columns();
    return rows.filter((row) =>
      cols.some((c) => String(row[c.key] ?? '').toLowerCase().includes(q))
    );
  });

  protected readonly sorted = computed(() => {
    const rows = [...this.filtered()];
    const key = this.sortKey();
    if (!key) return rows;
    const dir = this.sortDir() === 'asc' ? 1 : -1;
    return rows.sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av ?? '').localeCompare(String(bv ?? '')) * dir;
    });
  });

  protected readonly totalPages = computed(() => {
    const size = this.pageSize();
    if (size <= 0) return 1;
    return Math.max(1, Math.ceil(this.sorted().length / size));
  });

  protected readonly paged = computed(() => {
    const size = this.pageSize();
    const rows = this.sorted();
    if (size <= 0) return rows;
    const page = Math.min(this.page(), this.totalPages());
    return rows.slice((page - 1) * size, page * size);
  });

  protected readonly allChecked = computed(() => {
    const keys = this.paged().map((r) => this.keyOf(r));
    return keys.length > 0 && keys.every((k) => this.selectedKeys().includes(k));
  });

  protected readonly someChecked = computed(
    () => !this.allChecked() && this.paged().some((r) => this.selectedKeys().includes(this.keyOf(r)))
  );

  protected cell(row: NexaRow, key: string): string {
    return String(row[key] ?? '');
  }

  protected keyOf(row: NexaRow): string | number {
    const v = row[this.rowKey()];
    return typeof v === 'number' ? v : String(v ?? '');
  }

  protected onQuery(value: string): void {
    this.query.set(value);
    this.page.set(1);
  }

  protected toggleSort(col: NexaDataColumn): void {
    if (!col.sortable) return;
    if (this.sortKey() !== col.key) {
      this.sortKey.set(col.key);
      this.sortDir.set('asc');
    } else {
      this.sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    }
  }

  protected sortGlyph(col: NexaDataColumn): string {
    if (!col.sortable || this.sortKey() !== col.key) return '↕';
    return this.sortDir() === 'asc' ? '↑' : '↓';
  }

  protected toggleRow(row: NexaRow, checked: boolean): void {
    const key = this.keyOf(row);
    this.selectedKeys.update((keys) =>
      checked ? [...new Set([...keys, key])] : keys.filter((k) => k !== key)
    );
  }

  protected isSelected(row: NexaRow): boolean {
    return this.selectedKeys().includes(this.keyOf(row));
  }

  protected toggleAll(checked: boolean): void {
    const pageKeys = this.paged().map((r) => this.keyOf(r));
    this.selectedKeys.update((keys) =>
      checked
        ? [...new Set([...keys, ...pageKeys])]
        : keys.filter((k) => !pageKeys.includes(k))
    );
  }
}
