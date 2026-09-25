import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { nexaCn, nexaUniqueId } from '../utils/utils';
import { nexaLockBodyScroll } from '../utils/overlay';

export type NexaSheetSide = 'bottom' | 'top' | 'left' | 'right';

/**
 * NexaSheet — mobile-first bottom sheet (grabber included) that can also dock
 * to any edge. For desktop-first panels see `nexa-drawer`.
 *
 * ```html
 * <nexa-sheet [(open)]="shareOpen" title="Share">
 *   …share actions…
 * </nexa-sheet>
 * ```
 */
@Component({
  selector: 'nexa-sheet',
  standalone: true,
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaSheetComponent {
  readonly open = model(false);
  readonly title = input('');
  readonly description = input('');
  readonly side = input<NexaSheetSide>('bottom');
  readonly dismissible = input(true);
  readonly showClose = input(true);
  readonly showGrabber = input(true);
  readonly id = input(nexaUniqueId('nexa-sheet'));
  readonly extraClass = input('');

  readonly closed = output<void>();

  constructor() {
    nexaLockBodyScroll(this.open);
  }

  protected readonly hostClasses = computed(() => nexaCn('nexa-sheet-host'));
  protected readonly titleId = computed(() => `${this.id()}-title`);
  protected readonly descId = computed(() => `${this.id()}-desc`);
  protected readonly panelClasses = computed(() =>
    nexaCn('nexa-sheet__panel', `nexa-sheet__panel--${this.side()}`, this.extraClass())
  );

  protected requestClose(): void {
    if (!this.dismissible()) return;
    this.open.set(false);
    this.closed.emit();
  }
}
