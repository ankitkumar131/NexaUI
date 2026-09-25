import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nexaCn, nexaUniqueId } from '../utils/utils';

export interface NexaNativeSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * NexaNativeSelect — zero-JS styled `<select>`. Best for long lists, mobile and
 * maximum compatibility.
 *
 * ```html
 * <nexa-native-select [options]="countries" [(value)]="country" />
 * <nexa-native-select><option value="a">A</option></nexa-native-select>
 * ```
 */
@Component({
  selector: 'nexa-native-select',
  standalone: true,
  templateUrl: './native-select.component.html',
  styleUrl: './native-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NexaNativeSelectComponent), multi: true },
  ],
  host: { '[class]': 'hostClasses()' },
})
export class NexaNativeSelectComponent implements ControlValueAccessor {
  readonly options = input<NexaNativeSelectOption[]>([]);
  readonly value = model<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly id = input(nexaUniqueId('nexa-native-select'));
  readonly name = input<string | undefined>(undefined);
  readonly extraClass = input('');

  private readonly cvaDisabled = signal(false);
  private onChange: (value: string | undefined) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly hostClasses = computed(() => nexaCn('nexa-native-select-host', this.extraClass()));
  protected readonly selectClasses = computed(() =>
    nexaCn('nexa-native-select', 'nexa-focus-ring', {
      'nexa-native-select--invalid': this.invalid(),
      'nexa-native-select--placeholder': this.value() === undefined,
    })
  );

  protected onInput(event: Event): void {
    const next = (event.target as HTMLSelectElement).value || undefined;
    this.value.set(next);
    this.onChange(next);
  }

  protected onBlur(): void {
    this.onTouched();
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
