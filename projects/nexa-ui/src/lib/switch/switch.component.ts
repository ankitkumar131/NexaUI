import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nexaCn, nexaUniqueId } from '../utils/utils';

/**
 * NexaSwitch — on/off toggle with `role="switch"` semantics.
 *
 * ```html
 * <nexa-switch [(checked)]="notifications">Enable notifications</nexa-switch>
 * ```
 */
@Component({
  selector: 'nexa-switch',
  standalone: true,
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NexaSwitchComponent), multi: true },
  ],
  host: { '[class]': 'hostClasses()' },
})
export class NexaSwitchComponent implements ControlValueAccessor {
  readonly checked = model(false);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly size = input<'sm' | 'default'>('default');
  readonly id = input(nexaUniqueId('nexa-switch'));
  readonly name = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input('');

  private readonly cvaDisabled = signal(false);
  private onChange: (value: boolean) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-switch-host', { 'nexa-switch-host--disabled': this.isDisabled() }, this.extraClass())
  );
  protected readonly trackClasses = computed(() =>
    nexaCn('nexa-switch__track', `nexa-switch__track--${this.size()}`, {
      'nexa-switch__track--on': this.checked(),
      'nexa-switch__track--invalid': this.invalid(),
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
