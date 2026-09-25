import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { nexaCn } from '../utils/utils';

export type NexaAlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';
export type NexaAlertSize = 'sm' | 'default' | 'lg';

/**
 * NexaAlert — inline status message with variant iconography, sizes and
 * optional auto-dismissal with a countdown bar (pauses on hover/focus).
 *
 * ```html
 * <nexa-alert variant="success" title="Saved">Your changes are live.</nexa-alert>
 * <nexa-alert variant="info" size="sm" [duration]="5000" (dismissed)="hide()">Auto-hides.</nexa-alert>
 * <nexa-alert variant="destructive" [dismissible]="true">Something failed.</nexa-alert>
 * ```
 */
@Component({
  selector: 'nexa-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaAlertComponent {
  readonly variant = input<NexaAlertVariant>('default');
  readonly size = input<NexaAlertSize>('default');
  readonly title = input('');
  readonly icon = input<string | undefined>(undefined);
  readonly dismissible = input(false);
  /**
   * Auto-dismiss after this many milliseconds. `0` (default) = stays until
   * manually dismissed. The countdown pauses while hovered or focused.
   */
  readonly duration = input(0);
  readonly extraClass = input('');

  readonly dismissed = output<void>();

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly leaving = signal(false);
  protected readonly paused = signal(false);

  private timer: ReturnType<typeof setTimeout> | undefined;
  private deadline = 0;
  private remaining = 0;

  constructor() {
    // (Re)arm the auto-dismiss timer whenever `duration` changes.
    effect((onCleanup) => {
      const ms = this.duration();
      this.clearTimer();
      this.paused.set(false);
      if (!this.isBrowser || ms <= 0 || this.leaving()) return;
      this.remaining = ms;
      this.armTimer();
      onCleanup(() => this.clearTimer());
    });
  }

  protected readonly hostClasses = computed(() =>
    nexaCn(
      'nexa-alert-host',
      `nexa-alert-host--${this.variant()}`,
      `nexa-alert-host--${this.size()}`,
      this.extraClass()
    )
  );
  protected readonly role = computed(() => (this.variant() === 'destructive' ? 'alert' : 'status'));
  protected readonly glyph = computed(() => {
    const custom = this.icon();
    if (custom !== undefined) return custom;
    switch (this.variant()) {
      case 'destructive':
        return '⛔';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📌';
    }
  });

  protected dismiss(): void {
    this.beginLeave();
  }

  /** Pause the countdown (hover / focus). */
  protected pause(): void {
    if (this.duration() <= 0 || this.leaving() || this.timer === undefined) return;
    this.remaining = Math.max(0, this.deadline - Date.now());
    this.clearTimer();
    this.paused.set(true);
  }

  /** Resume the countdown after a pause. */
  protected resume(): void {
    if (this.duration() <= 0 || this.leaving() || !this.paused()) return;
    this.paused.set(false);
    this.armTimer();
  }

  private armTimer(): void {
    this.clearTimer();
    this.deadline = Date.now() + this.remaining;
    this.timer = setTimeout(() => this.beginLeave(), this.remaining);
  }

  private clearTimer(): void {
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  /** Play the exit animation, then notify the parent to remove the alert. */
  private beginLeave(): void {
    if (this.leaving()) return;
    this.clearTimer();
    this.leaving.set(true);
    setTimeout(() => this.dismissed.emit(), this.leaveMs());
  }

  /** Read the exit-animation length so the emit lands exactly when it ends. */
  private leaveMs(): number {
    if (!this.isBrowser) return 0;
    const raw = getComputedStyle(this.host.nativeElement)
      .getPropertyValue('--nexa-alert-leave-duration')
      .trim();
    const value = Number.parseFloat(raw);
    if (!Number.isFinite(value)) return 240;
    return raw.endsWith('ms') || !raw.endsWith('s') ? value : value * 1000;
  }
}
