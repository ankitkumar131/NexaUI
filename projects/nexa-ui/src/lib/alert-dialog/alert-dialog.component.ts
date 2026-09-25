import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { nexaCn, nexaUniqueId } from '../utils/utils';
import { nexaLockBodyScroll } from '../utils/overlay';
import { NexaButtonComponent } from '../button/button.component';

/**
 * NexaAlertDialog — strict confirmation modal (`role="alertdialog"`) for
 * destructive/irreversible actions.
 *
 * ```html
 * <nexa-alert-dialog [(open)]="confirmOpen" title="Delete project?"
 *   description="This cannot be undone." (confirmed)="delete()" />
 * ```
 */
@Component({
  selector: 'nexa-alert-dialog',
  standalone: true,
  imports: [NexaButtonComponent],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaAlertDialogComponent {
  readonly open = model(false);
  readonly title = input('Are you sure?');
  readonly description = input('');
  readonly confirmText = input('Confirm');
  readonly cancelText = input('Cancel');
  readonly tone = input<'destructive' | 'default'>('destructive');
  readonly loading = input(false);
  readonly dismissible = input(false);
  readonly hideDefaultFooter = input(false);
  readonly id = input(nexaUniqueId('nexa-alert-dialog'));
  readonly extraClass = input('');

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();

  constructor() {
    nexaLockBodyScroll(this.open);
  }

  protected readonly hostClasses = computed(() => nexaCn('nexa-alert-dialog-host'));
  protected readonly titleId = computed(() => `${this.id()}-title`);
  protected readonly descId = computed(() => `${this.id()}-desc`);
  protected readonly panelClasses = computed(() =>
    nexaCn('nexa-alert-dialog__panel', this.extraClass())
  );

  protected onCancel(): void {
    if (this.loading()) return;
    this.open.set(false);
    this.cancelled.emit();
  }

  protected onConfirm(): void {
    if (this.loading()) return;
    // Caller closes on success (supports async flows with [loading]).
    this.confirmed.emit();
  }

  protected onEscape(): void {
    if (this.dismissible()) this.onCancel();
  }
}
