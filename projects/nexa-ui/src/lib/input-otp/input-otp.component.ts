import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  input,
  model,
  signal,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nexaCn } from '../utils/utils';

/**
 * NexaInputOtp — segmented one-time-code input with auto-advance, backspace
 * navigation and paste-to-fill.
 *
 * ```html
 * <nexa-input-otp [(value)]="code" [length]="6" ariaLabel="Verification code" />
 * ```
 */
@Component({
  selector: 'nexa-input-otp',
  standalone: true,
  templateUrl: './input-otp.component.html',
  styleUrl: './input-otp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NexaInputOtpComponent), multi: true },
  ],
  host: { '[class]': 'hostClasses()' },
})
export class NexaInputOtpComponent implements ControlValueAccessor {
  readonly value = model('');
  readonly length = input(6);
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly ariaLabel = input('One-time code');
  readonly extraClass = input('');

  private readonly boxes = viewChildren<ElementRef<HTMLInputElement>>('box');
  private readonly cvaDisabled = signal(false);
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly hostClasses = computed(() => nexaCn('nexa-otp-host', this.extraClass()));
  protected readonly indexes = computed(() => Array.from({ length: this.length() }, (_, i) => i));
  protected readonly digits = computed(() => {
    const value = this.value();
    return this.indexes().map((i) => value[i] ?? '');
  });

  protected boxClasses(): string {
    return nexaCn('nexa-otp__box', 'nexa-focus-ring', { 'nexa-otp__box--invalid': this.invalid() });
  }

  protected onInput(index: number, event: Event): void {
    const el = event.target as HTMLInputElement;
    const char = (el.value ?? '').replace(/\s/g, '').slice(-1);
    const chars = this.value().split('');
    chars[index] = char;
    const next = chars.join('').slice(0, this.length());
    this.value.set(next);
    this.onChange(next);
    el.value = char;
    if (char && index < this.length() - 1) this.focusBox(index + 1);
  }

  protected onKeydown(index: number, event: KeyboardEvent): void {
    const current = this.digits()[index];
    if (event.key === 'Backspace' && !current && index > 0) {
      event.preventDefault();
      const chars = this.value().split('');
      chars[index - 1] = '';
      const next = chars.join('').slice(0, this.length());
      this.value.set(next);
      this.onChange(next);
      this.focusBox(index - 1);
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusBox(index - 1);
    } else if (event.key === 'ArrowRight' && index < this.length() - 1) {
      event.preventDefault();
      this.focusBox(index + 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.focusBox(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.focusBox(this.length() - 1);
    }
  }

  protected onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = (event.clipboardData?.getData('text') ?? '').replace(/\s/g, '').slice(0, this.length());
    if (!text) return;
    this.value.set(text);
    this.onChange(text);
    this.focusBox(Math.min(text.length, this.length() - 1));
  }

  protected onFocus(event: Event): void {
    (event.target as HTMLInputElement).select();
  }

  protected onBlur(): void {
    this.onTouched();
  }

  private focusBox(index: number): void {
    this.boxes()[index]?.nativeElement.focus();
  }

  writeValue(value: string | null | undefined): void {
    this.value.set((value ?? '').slice(0, this.length()));
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.cvaDisabled.set(disabled);
  }
}
