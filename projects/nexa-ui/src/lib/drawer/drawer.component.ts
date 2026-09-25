import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { nexaCn, nexaUniqueId } from '../utils/utils';
import { nexaLockBodyScroll } from '../utils/overlay';

export type NexaDrawerSide = 'left' | 'right' | 'top' | 'bottom';

/**
 * NexaDrawer — sliding edge panel for navigation, filters and detail views.
 *
 * ```html
 * <nexa-drawer [(open)]="filtersOpen" title="Filters" side="right">
 *   …filter controls…
 *   <div slot="footer"><nexa-button>Apply</nexa-button></div>
 * </nexa-drawer>
 * ```
 */
@Component({
  selector: 'nexa-drawer',
  standalone: true,
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaDrawerComponent {
  readonly open = model(false);
  readonly title = input('');
  readonly description = input('');
  readonly side = input<NexaDrawerSide>('right');
  /** Panel width (left/right) or height (top/bottom). */
  readonly size = input('22rem');
  readonly dismissible = input(true);
  readonly showClose = input(true);
  readonly id = input(nexaUniqueId('nexa-drawer'));
  readonly extraClass = input('');

  readonly closed = output<void>();

  constructor() {
    nexaLockBodyScroll(this.open);
  }

  protected readonly hostClasses = computed(() => nexaCn('nexa-drawer-host'));
  protected readonly titleId = computed(() => `${this.id()}-title`);
  protected readonly descId = computed(() => `${this.id()}-desc`);
  protected readonly panelClasses = computed(() =>
    nexaCn('nexa-drawer__panel', `nexa-drawer__panel--${this.side()}`, this.extraClass())
  );
  protected readonly panelStyle = computed(() => {
    const side = this.side();
    const size = this.size();
    return side === 'left' || side === 'right' ? { width: size } : { height: size };
  });

  protected requestClose(): void {
    if (!this.dismissible()) return;
    this.open.set(false);
    this.closed.emit();
  }
}
