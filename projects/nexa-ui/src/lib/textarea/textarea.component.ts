import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nexaCn, nexaUniqueId } from '../utils/utils';

export type NexaTextareaResize = 'none' | 'vertical' | 'both';

/** NexaTextarea — multi-line field with forms support. `<nexa-textarea [(value)]="bio" [rows]="4" />` */
@Component({
  selector: 'nexa-textarea',
  standalone: true,
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NexaTextareaComponent), multi: true },
  ],
  host: { '[class]': 'hostClasses()' },
})
export class NexaTextareaComponent implements ControlValueAccessor {
  readonly value = model('');
  readonly placeholder = input('');
  readonly rows = input(3);
  readonly resize = input<NexaTextareaResize>('vertical');
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly id = input(nexaUniqueId('nexa-textarea'));
  readonly name = input<string | undefined>(undefined);
  readonly extraClass = input('');

  private readonly cvaDisabled = signal(false);
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly hostClasses = computed(() => nexaCn('nexa-textarea-host'));
  protected readonly areaClasses = computed(() =>
    nexaCn(
      'nexa-textarea',
      'nexa-focus-ring',
      `nexa-textarea--resize-${this.resize()}`,
      { 'nexa-textarea--invalid': this.invalid() },
      this.extraClass()
    )
  );

  protected onInput(event: Event): void {
    const next = (event.target as HTMLTextAreaElement).value;
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
