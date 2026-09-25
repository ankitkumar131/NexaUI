import { ChangeDetectionStrategy, Component, computed, effect, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nexaCn, nexaUniqueId } from '../utils/utils';
import { NexaCalendarComponent } from '../calendar/calendar.component';
import { NexaInputComponent } from '../input/input.component';
import { NexaPopoverComponent } from '../popover/popover.component';
import { NexaButtonComponent } from '../button/button.component';

/**
 * NexaDatePicker — text input + calendar popover with forms support.
 *
 * ```html
 * <nexa-date-picker [(value)]="birthday" locale="en-GB" />
 * <nexa-date-picker formControlName="start" [min]="today" />
 * ```
 */
@Component({
  selector: 'nexa-date-picker',
  standalone: true,
  imports: [NexaCalendarComponent, NexaInputComponent, NexaPopoverComponent, NexaButtonComponent],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NexaDatePickerComponent), multi: true },
  ],
  host: { '[class]': 'hostClasses()' },
})
export class NexaDatePickerComponent implements ControlValueAccessor {
  readonly value = model<Date | null>(null);
  readonly locale = input('en-US');
  readonly weekStartsOn = input(0);
  readonly min = input<Date | string | undefined>(undefined);
  readonly max = input<Date | string | undefined>(undefined);
  readonly placeholder = input('Pick a date');
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly id = input(nexaUniqueId('nexa-date-picker'));
  readonly ariaLabel = input('Date');
  readonly extraClass = input('');

  protected readonly display = signal('');
  protected readonly calOpen = signal(false);

  private readonly cvaDisabled = signal(false);
  private onChange: (value: Date | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  constructor() {
    effect(() => {
      this.display.set(this.formatDate(this.value()));
    });
  }

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly hostClasses = computed(() => nexaCn('nexa-date-picker-host', this.extraClass()));

  protected onText(text: string): void {
    this.display.set(text);
  }

  protected commit(): void {
    const text = this.display().trim();
    if (!text) {
      this.setValue(null);
      return;
    }
    const parsed = new Date(text);
    if (Number.isNaN(parsed.getTime()) || !this.inRange(parsed)) {
      // Revert invalid entries to the last valid value.
      this.display.set(this.formatDate(this.value()));
      return;
    }
    this.setValue(parsed);
  }

  protected onBlur(): void {
    this.commit();
    this.onTouched();
  }

  protected onCalSelect(date: Date | null): void {
    if (date) {
      this.setValue(date);
      this.calOpen.set(false);
    }
  }

  protected clear(): void {
    this.setValue(null);
  }

  private setValue(date: Date | null): void {
    this.value.set(date ? new Date(date) : null);
    this.onChange(date ? new Date(date) : null);
  }

  private formatDate(date: Date | null): string {
    if (!date) return '';
    try {
      return new Intl.DateTimeFormat(this.locale(), { dateStyle: 'medium' }).format(date);
    } catch {
      return date.toDateString();
    }
  }

  private inRange(date: Date): boolean {
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const min = this.bound(this.min());
    const max = this.bound(this.max());
    if (min !== null && day < min) return false;
    if (max !== null && day > max) return false;
    return true;
  }

  private bound(v: Date | string | undefined): number | null {
    if (v === undefined) return null;
    const d = v instanceof Date ? v : new Date(v);
    if (Number.isNaN(d.getTime())) return null;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  }

  writeValue(value: Date | string | null | undefined): void {
    if (value === null || value === undefined) {
      this.value.set(null);
      return;
    }
    const d = value instanceof Date ? value : new Date(value);
    this.value.set(Number.isNaN(d.getTime()) ? null : d);
  }
  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.cvaDisabled.set(disabled);
  }
}
