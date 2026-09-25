import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nexaCn, nexaUniqueId } from '../utils/utils';

export interface NexaRadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

/**
 * NexaRadioGroup — single-choice group. Native radios share a name so arrow-key
 * navigation works automatically.
 *
 * ```html
 * <nexa-radio-group [options]="plans" [(value)]="plan" />
 * ```
 */
@Component({
  selector: 'nexa-radio-group',
  standalone: true,
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NexaRadioGroupComponent), multi: true },
  ],
  host: { '[class]': 'hostClasses()' },
})
export class NexaRadioGroupComponent implements ControlValueAccessor {
  readonly options = input<NexaRadioOption[]>([]);
  readonly value = model<string | undefined>(undefined);
  readonly name = input(nexaUniqueId('nexa-radio'));
  readonly orientation = input<'horizontal' | 'vertical'>('vertical');
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input('');

  private readonly cvaDisabled = signal(false);
  private onChange: (value: string | undefined) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-radio-host', `nexa-radio-host--${this.orientation()}`, this.extraClass())
  );

  protected select(value: string): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  protected isChecked(option: NexaRadioOption): boolean {
    return this.value() === option.value;
  }

  writeValue(value: string | null | undefined): void {
    this.value.set(value ?? undefined);
  }
  registerOnChange(fn: (value: string | undefined) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.cvaDisabled.set(disabled);
  }
}
