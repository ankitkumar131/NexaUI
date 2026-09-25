import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

export interface NexaBreadcrumbItem {
  label: string;
  href?: string;
}

interface NexaVisibleCrumb extends NexaBreadcrumbItem {
  ellipsis?: boolean;
}

/**
 * NexaBreadcrumb — orientation trail with optional middle collapsing.
 *
 * ```html
 * <nexa-breadcrumb [items]="[{label:'Home',href:'/'},{label:'Docs'}]" [maxItems]="4" />
 * ```
 */
@Component({
  selector: 'nexa-breadcrumb',
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaBreadcrumbComponent {
  readonly items = input<NexaBreadcrumbItem[]>([]);
  readonly separator = input('/');
  /** Collapse middle items when longer than this (0 = never). */
  readonly maxItems = input(0);
  readonly ariaLabel = input('Breadcrumb');
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() => nexaCn('nexa-breadcrumb-host', this.extraClass()));

  protected readonly visible = computed<NexaVisibleCrumb[]>(() => {
    const items = this.items();
    const max = this.maxItems();
    if (max <= 0 || items.length <= max) return items;
    const first = items[0];
    if (!first) return items;
    const tailCount = Math.max(1, max - 2);
    return [first, { label: '…', ellipsis: true }, ...items.slice(items.length - tailCount)];
  });

  protected isLast(index: number): boolean {
    return index === this.visible().length - 1;
  }
}
