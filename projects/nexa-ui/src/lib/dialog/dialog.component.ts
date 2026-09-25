import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { nexaCn, nexaUniqueId } from '../utils/utils';
import { nexaLockBodyScroll, nexaOverlayMotion } from '../utils/overlay';

export type NexaDialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * NexaDialog — accessible modal. Title/description via inputs, body via
 * projection, actions via `[slot=footer]`.
 *
 * ```html
 * <nexa-button (pressed)="open.set(true)">Edit</nexa-button>
 * <nexa-dialog [(open)]="open" title="Edit profile">
 *   <p>Dialog body…</p>
 *   <div slot="footer"><nexa-button (pressed)="open.set(false)">Done</nexa-button></div>
 * </nexa-dialog>
 * ```
 */
@Component({
  selector: 'nexa-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaDialogComponent {
  readonly open = model(false);
  private readonly motion = nexaOverlayMotion(this.open, 180);
  protected readonly rendered = this.motion.rendered;
  protected readonly closing = this.motion.closing;
  readonly title = input('');
  readonly description = input('');
  readonly size = input<NexaDialogSize>('md');
  readonly dismissible = input(true);
  readonly showClose = input(true);
  readonly id = input(nexaUniqueId('nexa-dialog'));
  readonly extraClass = input('');

  readonly opened = output<void>();
  readonly closed = output<void>();

  constructor() {
    nexaLockBodyScroll(this.open);
  }

  protected readonly hostClasses = computed(() => nexaCn('nexa-dialog-host'));
  protected readonly titleId = computed(() => `${this.id()}-title`);
  protected readonly descId = computed(() => `${this.id()}-desc`);
  protected readonly panelClasses = computed(() =>
    nexaCn('nexa-dialog__panel', `nexa-dialog__panel--${this.size()}`, this.extraClass())
  );

  protected requestClose(): void {
    if (!this.dismissible()) return;
    this.open.set(false);
    this.closed.emit();
  }

  protected onBackdropClick(): void {
    this.requestClose();
  }
}
