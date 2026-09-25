import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { nexaCn } from '../utils/utils';
import { NexaButtonComponent } from '../button/button.component';

/**
 * NexaPagination — page navigation with ellipsis windows.
 *
 * ```html
 * <nexa-pagination [(page)]="page" [totalPages]="20" />
 * ```
 */
@Component({
  selector: 'nexa-pagination',
  standalone: true,
  imports: [NexaButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaPaginationComponent {
  readonly page = model(1);
  readonly totalPages = input(1);
  readonly siblingCount = input(1);
  readonly showPrevNext = input(true);
  readonly showFirstLast = input(false);
  readonly ariaLabel = input('Pagination');
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() => nexaCn('nexa-pagination-host', this.extraClass()));

  protected readonly safeTotal = computed(() => Math.max(1, Math.floor(this.totalPages())));
  protected readonly current = computed(() => this.clamp(this.page()));

  protected readonly pageList = computed<Array<number | 'ellipsis'>>(() => {
    const total = this.safeTotal();
    const current = this.current();
    const sib = Math.max(0, this.siblingCount());
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = new Set<number>([1, total, current]);
    for (let i = 1; i <= sib; i++) {
      pages.add(current - i);
      pages.add(current + i);
    }
    const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
    const out: Array<number | 'ellipsis'> = [];
    let prev = 0;
    for (const p of sorted) {
      if (p - prev > 1) out.push('ellipsis');
      out.push(p);
      prev = p;
    }
    return out;
  });

  protected go(page: number): void {
    this.page.set(this.clamp(page));
  }

  private clamp(page: number): number {
    const total = this.safeTotal();
    if (!Number.isFinite(page)) return 1;
    return Math.min(total, Math.max(1, Math.floor(page)));
  }
}
