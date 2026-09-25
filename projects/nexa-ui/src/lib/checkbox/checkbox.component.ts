import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nexaCn, nexaUniqueId } from '../utils/utils';

/**
 * NexaCheckbox — boolean option with label projection and indeterminate state.
 *
 * ```html
 * <nexa-checkbox [(checked)]="agree">I agree to the terms</nexa-checkbox>
 * <nexa-checkbox [indeterminate]="someSelected">Select all</nexa-checkbox>
 * ```
 */
@Component({
  selector: 'nexa-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NexaCheckboxComponent), multi: true },
  ],
  host: { '[class]': 'hostClasses()' },
})
export class NexaCheckboxComponent implements ControlValueAccessor {
  readonly checked = model(false);
  readonly indeterminate = input(false);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly id = input(nexaUniqueId('nexa-checkbox'));
  readonly name = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input('');

  private readonly cvaDisabled = signal(false);
  private onChange: (value: boolean) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-checkbox-host', { 'nexa-checkbox-host--disabled': this.isDisabled() }, this.extraClass())
  );
  protected readonly boxClasses = computed(() =>
    nexaCn('nexa-checkbox__box', {
      'nexa-checkbox__box--checked': this.checked(),
      'nexa-checkbox__box--indeterminate': this.indeterminate() && !this.checked(),
      'nexa-checkbox__box--invalid': this.invalid(),
    })
  );

  protected onInput(event: Event): void {
    const next = (event.target as HTMLInputElement).checked;
    this.checked.set(next);
    this.onChange(next);
  }

  protected onBlur(): void {
    this.onTouched();
  }

  writeValue(value: boolean | null | undefined): void {
    this.checked.set(!!value);
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.cvaDisabled.set(disabled);
  }
}
