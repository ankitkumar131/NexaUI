import { ChangeDetectionStrategy, Component, ElementRef, computed, input, model, signal, viewChildren } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaCalendarMode = 'single' | 'range';

export interface NexaCalendarDay {
  date: Date;
  iso: string;
  outside: boolean;
  today: boolean;
  selected: boolean;
  disabled: boolean;
  rangeStart: boolean;
  rangeEnd: boolean;
  inRange: boolean;
}

export interface NexaCalendarMonthOption {
  value: number;
  label: string;
}

/**
 * NexaCalendar — locale-aware month picker with keyboard navigation,
 * single or range selection, and month/year jump selects.
 *
 * ```html
 * <nexa-calendar [(value)]="date" locale="en-GB" [weekStartsOn]="1" />
 * <nexa-calendar mode="range" [(value)]="from" [(rangeEnd)]="to" />
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
  /** Selected day — or the range start when `mode="range"`. */
  readonly value = model<Date | null>(null);
  /** Range end when `mode="range"` (`null` while the user is still picking). */
  readonly rangeEnd = model<Date | null>(null);
  readonly mode = input<NexaCalendarMode>('single');
  readonly locale = input('en-US');
  /** 0 = Sunday … 6 = Saturday. */
  readonly weekStartsOn = input(0);
  readonly min = input<Date | string | undefined>(undefined);
  readonly max = input<Date | string | undefined>(undefined);
  readonly disabled = input(false);
  readonly ariaLabel = input('Choose a date');
  readonly extraClass = input('');

  private readonly dayRefs = viewChildren<ElementRef<HTMLButtonElement>>('day');
  private slideTimer: ReturnType<typeof setTimeout> | undefined;

  protected readonly view = signal<{ y: number; m: number }>({
    y: new Date().getFullYear(),
    m: new Date().getMonth(),
  });

  /** Month-slide animation direction ('' = idle). */
  protected readonly slide = signal<'prev' | 'next' | ''>('');

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

  protected readonly months = computed<NexaCalendarMonthOption[]>(() => {
    const fmt = new Intl.DateTimeFormat(this.locale(), { month: 'long' });
    return Array.from({ length: 12 }, (_, m) => ({ value: m, label: fmt.format(new Date(2024, m, 1)) }));
  });

  protected readonly years = computed<number[]>(() => {
    const v = this.view();
    const min = this.toStartOfDay(this.min());
    const max = this.toStartOfDay(this.max());
    const from = Math.min(min ? min.getFullYear() : v.y - 60, v.y);
    const to = Math.max(max ? max.getFullYear() : v.y + 60, v.y);
    const out: number[] = [];
    for (let y = from; y <= to; y++) out.push(y);
    return out;
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
    const range = this.mode() === 'range';
    const from = this.toDayStart(this.value());
    const to = range ? this.toDayStart(this.rangeEnd()) : null;
    const today = new Date();
    const min = this.toStartOfDay(this.min());
    const max = this.toStartOfDay(this.max());
    const cells: NexaCalendarDay[] = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(y, m, 1 - offset + i);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const t = dayStart.getTime();
      const isStart = from !== null && t === from;
      const isEnd = to !== null && t === to;
      const disabledDay =
        this.disabled() || (min !== null && dayStart < min) || (max !== null && dayStart > max);
      cells.push({
        date,
        iso: this.iso(date),
        outside: date.getMonth() !== m,
        today: this.sameDay(date, today),
        selected: isStart || isEnd,
        disabled: disabledDay,
        rangeStart: range && isStart,
        rangeEnd: range && isEnd,
        inRange:
          range &&
          from !== null &&
          to !== null &&
          from !== to &&
          t > Math.min(from, to) &&
          t < Math.max(from, to),
      });
    }
    return Array.from({ length: 6 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
  });

  protected fullLabel(day: NexaCalendarDay): string {
    const base = new Intl.DateTimeFormat(this.locale(), { dateStyle: 'full' }).format(day.date);
    if (this.mode() !== 'range') return base;
    if (day.rangeStart && day.rangeEnd) return `${base} (selected range, single day)`;
    if (day.rangeStart) return `${base} (range start)`;
    if (day.rangeEnd) return `${base} (range end)`;
    if (day.inRange) return `${base} (in selected range)`;
    return base;
  }

  protected select(day: NexaCalendarDay): void {
    if (day.disabled) return;
    const clicked = new Date(day.date);
    if (this.mode() === 'range') {
      const start = this.value();
      const end = this.rangeEnd();
      if (!start || (start && end)) {
        // Fresh pick (or restart after a complete range).
        this.value.set(clicked);
        this.rangeEnd.set(null);
      } else if (clicked.getTime() === new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()) {
        this.rangeEnd.set(new Date(clicked));
      } else if (clicked < start) {
        this.rangeEnd.set(new Date(start));
        this.value.set(clicked);
      } else {
        this.rangeEnd.set(clicked);
      }
    } else {
      this.value.set(clicked);
    }
    const v = this.view();
    if (clicked.getFullYear() !== v.y || clicked.getMonth() !== v.m) {
      this.view.set({ y: clicked.getFullYear(), m: clicked.getMonth() });
    }
  }

  protected prev(): void {
    const v = this.view();
    this.view.set(v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 });
    this.kick('prev');
  }

  protected next(): void {
    const v = this.view();
    this.view.set(v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 });
    this.kick('next');
  }

  protected setMonth(m: number): void {
    const v = this.view();
    if (Number.isNaN(m) || m === v.m) return;
    this.view.set({ y: v.y, m });
    this.kick(m > v.m ? 'next' : 'prev');
  }

  protected setYear(y: number): void {
    const v = this.view();
    if (Number.isNaN(y) || y === v.y) return;
    this.view.set({ y, m: v.m });
    this.kick(y > v.y ? 'next' : 'prev');
  }

  protected goToday(): void {
    const now = new Date();
    const v = this.view();
    this.view.set({ y: now.getFullYear(), m: now.getMonth() });
    this.kick(now.getFullYear() * 12 + now.getMonth() >= v.y * 12 + v.m ? 'next' : 'prev');
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

  private kick(dir: 'prev' | 'next'): void {
    this.slide.set(dir);
    if (this.slideTimer !== undefined) clearTimeout(this.slideTimer);
    this.slideTimer = setTimeout(() => this.slide.set(''), 260);
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

  private toDayStart(v: Date | null): number | null {
    if (!v || Number.isNaN(v.getTime())) return null;
    return new Date(v.getFullYear(), v.getMonth(), v.getDate()).getTime();
  }

  private toStartOfDay(v: Date | string | undefined): Date | null {
    if (v === undefined) return null;
    const d = v instanceof Date ? new Date(v) : new Date(v);
    if (Number.isNaN(d.getTime())) return null;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
}
