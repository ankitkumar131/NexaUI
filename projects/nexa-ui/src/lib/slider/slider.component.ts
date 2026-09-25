import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nexaCn, nexaUniqueId } from '../utils/utils';

/**
 * NexaSlider — range control over a native `<input type="range">`.
 *
 * ```html
 * <nexa-slider [(value)]="volume" [min]="0" [max]="100" [showValue]="true" />
 * ```
 */
@Component({
  selector: 'nexa-slider',
  standalone: true,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NexaSliderComponent), multi: true },
  ],
  host: { '[class]': 'hostClasses()' },
})
export class NexaSliderComponent implements ControlValueAccessor {
  readonly value = model(50);
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly disabled = input(false);
  readonly showValue = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly id = input(nexaUniqueId('nexa-slider'));
  readonly name = input<string | undefined>(undefined);
  readonly extraClass = input('');

  private readonly cvaDisabled = signal(false);
  private onChange: (value: number) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly hostClasses = computed(() => nexaCn('nexa-slider-host', this.extraClass()));
  protected readonly fillPct = computed(() => {
    const min = this.min();
    const max = this.max();
    if (max <= min) return 0;
    return Math.min(100, Math.max(0, ((this.value() - min) / (max - min)) * 100));
  });

  protected onInput(event: Event): void {
    const next = Number((event.target as HTMLInputElement).value);
    this.value.set(next);
    this.onChange(next);
  }

  protected onBlur(): void {
    this.onTouched();
  }

  writeValue(value: number | string | null | undefined): void {
    const num = Number(value);
    this.value.set(Number.isFinite(num) ? num : this.min());
  }
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.cvaDisabled.set(disabled);
  }
}
