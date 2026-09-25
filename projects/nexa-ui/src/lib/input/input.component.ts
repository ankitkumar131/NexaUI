import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nexaCn, nexaUniqueId } from '../utils/utils';

export type NexaInputSize = 'sm' | 'default' | 'lg';

/**
 * NexaInput — text field with Reactive/Template-driven form support.
 *
 * ```html
 * <nexa-input [(value)]="name" placeholder="Your name" />
 * <nexa-input formControlName="email" type="email" [invalid]="email.invalid" />
 * ```
 */
@Component({
  selector: 'nexa-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NexaInputComponent), multi: true },
  ],
  host: { '[class]': 'hostClasses()' },
})
export class NexaInputComponent implements ControlValueAccessor {
  readonly type = input('text');
  readonly placeholder = input('');
  readonly value = model('');
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly size = input<NexaInputSize>('default');
  /** Borderless mode for embedding inside `nexa-input-group`. */
  readonly borderless = input(false);
  readonly id = input(nexaUniqueId('nexa-input'));
  readonly name = input<string | undefined>(undefined);
  readonly autocomplete = input<string | undefined>(undefined);
  readonly extraClass = input('');

  private readonly cvaDisabled = signal(false);
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly hostClasses = computed(() => nexaCn('nexa-input-host'));
  protected readonly inputClasses = computed(() =>
    nexaCn(
      'nexa-input',
      'nexa-focus-ring',
      `nexa-input--${this.size()}`,
      { 'nexa-input--invalid': this.invalid(), 'nexa-input--borderless': this.borderless() },
      this.extraClass()
    )
  );

  protected onInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value.set(next);
    this.onChange(next);
  }

  protected onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string | null | undefined): void {
    this.value.set(value ?? '');
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
