import { ChangeDetectionStrategy, Component, ElementRef, computed, input, model, signal, viewChildren } from '@angular/core';
import { nexaCn } from '../utils/utils';

export interface NexaCalendarDay {
  date: Date;
  iso: string;
  outside: boolean;
  today: boolean;
  selected: boolean;
  disabled: boolean;
}

/**
 * NexaCalendar — locale-aware month picker with keyboard navigation.
 *
 * ```html
 * <nexa-calendar [(value)]="date" locale="en-GB" [weekStartsOn]="1" />
 * ```
 */
@Component({
  selector: 'nexa-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaCalendarComponent {
  readonly value = model<Date | null>(null);
  readonly locale = input('en-US');
  /** 0 = Sunday … 6 = Saturday. */
  readonly weekStartsOn = input(0);
  readonly min = input<Date | string | undefined>(undefined);
  readonly max = input<Date | string | undefined>(undefined);
  readonly disabled = input(false);
  readonly ariaLabel = input('Choose a date');
  readonly extraClass = input('');

  private readonly dayRefs = viewChildren<ElementRef<HTMLButtonElement>>('day');

  protected readonly view = signal<{ y: number; m: number }>({
    y: new Date().getFullYear(),
    m: new Date().getMonth(),
  });

  constructor() {
    const v = this.value();
    if (v) this.view.set({ y: v.getFullYear(), m: v.getMonth() });
  }

  protected readonly hostClasses = computed(() => nexaCn('nexa-calendar-host', this.extraClass()));

  protected readonly monthLabel = computed(() => {
    const v = this.view();
    return new Intl.DateTimeFormat(this.locale(), { month: 'long', year: 'numeric' }).format(
      new Date(v.y, v.m, 1)
    );
  });

  protected readonly weekdays = computed(() => {
    const start = this.weekStartsOn();
    const short = new Intl.DateTimeFormat(this.locale(), { weekday: 'short' });
    const long = new Intl.DateTimeFormat(this.locale(), { weekday: 'long' });
    // 2024-01-07 was a Sunday.
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(2024, 0, 7 + ((i + start) % 7));
      return { short: short.format(d), long: long.format(d) };
    });
  });

  protected readonly weeks = computed<NexaCalendarDay[][]>(() => {
    const { y, m } = this.view();
    const start = this.weekStartsOn();
    const first = new Date(y, m, 1);
    const offset = (first.getDay() - start + 7) % 7;
    const selected = this.value();
    const today = new Date();
    const min = this.toStartOfDay(this.min());
    const max = this.toStartOfDay(this.max());
    const cells: NexaCalendarDay[] = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(y, m, 1 - offset + i);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const disabledDay =
        this.disabled() || (min !== null && dayStart < min) || (max !== null && dayStart > max);
      cells.push({
        date,
        iso: this.iso(date),
        outside: date.getMonth() !== m,
        today: this.sameDay(date, today),
        selected: selected !== null && this.sameDay(date, selected),
        disabled: disabledDay,
      });
    }
    return Array.from({ length: 6 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
  });

  protected fullLabel(day: NexaCalendarDay): string {
    return new Intl.DateTimeFormat(this.locale(), { dateStyle: 'full' }).format(day.date);
  }

  protected select(day: NexaCalendarDay): void {
    if (day.disabled) return;
    this.value.set(new Date(day.date));
    const v = this.view();
    if (day.date.getFullYear() !== v.y || day.date.getMonth() !== v.m) {
      this.view.set({ y: day.date.getFullYear(), m: day.date.getMonth() });
    }
  }

  protected prev(): void {
    const v = this.view();
    this.view.set(v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 });
  }

  protected next(): void {
    const v = this.view();
    this.view.set(v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 });
  }

  protected goToday(): void {
    const now = new Date();
    this.view.set({ y: now.getFullYear(), m: now.getMonth() });
    this.focusIso(this.iso(now));
  }

  protected onDayKeydown(day: NexaCalendarDay, event: KeyboardEvent): void {
    const d = day.date;
    let target: Date | null = null;
    switch (event.key) {
      case 'ArrowLeft':
        target = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
        break;
      case 'ArrowRight':
        target = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
        break;
      case 'ArrowUp':
        target = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7);
        break;
      case 'ArrowDown':
        target = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7);
        break;
      case 'Home':
        target = new Date(d.getFullYear(), d.getMonth(), 1);
        break;
      case 'End':
        target = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        break;
      case 'PageUp':
        target = event.shiftKey
          ? new Date(d.getFullYear() - 1, d.getMonth(), d.getDate())
          : new Date(d.getFullYear(), d.getMonth() - 1, d.getDate());
        break;
      case 'PageDown':
        target = event.shiftKey
          ? new Date(d.getFullYear() + 1, d.getMonth(), d.getDate())
          : new Date(d.getFullYear(), d.getMonth() + 1, d.getDate());
        break;
    }
    if (target) {
      event.preventDefault();
      const v = this.view();
      if (target.getFullYear() !== v.y || target.getMonth() !== v.m) {
        this.view.set({ y: target.getFullYear(), m: target.getMonth() });
        // Wait a tick for the new month to render, then focus.
        setTimeout(() => this.focusIso(this.iso(target as Date)), 0);
      } else {
        this.focusIso(this.iso(target));
      }
    }
  }

  private focusIso(iso: string): void {
    const el = this.dayRefs().find((r) => r.nativeElement.dataset['iso'] === iso);
    el?.nativeElement.focus();
  }

  private iso(d: Date): string {
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  private sameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  private toStartOfDay(v: Date | string | undefined): Date | null {
    if (v === undefined) return null;
    const d = v instanceof Date ? new Date(v) : new Date(v);
    if (Number.isNaN(d.getTime())) return null;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
}
