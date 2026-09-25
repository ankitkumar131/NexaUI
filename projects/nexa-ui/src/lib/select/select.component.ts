import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nexaCn, nexaUniqueId } from '../utils/utils';

export interface NexaSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * NexaSelect — custom dropdown with keyboard navigation and forms support.
 *
 * ```html
 * <nexa-select [options]="fruits" [(value)]="fruit" placeholder="Pick a fruit" />
 * ```
 */
@Component({
  selector: 'nexa-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NexaSelectComponent), multi: true },
  ],
  host: {
    '[class]': 'hostClasses()',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class NexaSelectComponent implements ControlValueAccessor {
  readonly options = input<NexaSelectOption[]>([]);
  readonly value = model<string | undefined>(undefined);
  readonly placeholder = input('Select an option');
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly id = input(nexaUniqueId('nexa-select'));
  readonly extraClass = input('');

  private readonly hostRef = inject(ElementRef);
  private readonly triggerRef = viewChild<ElementRef<HTMLButtonElement>>('trigger');
  private readonly cvaDisabled = signal(false);
  private onChange: (value: string | undefined) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly open = signal(false);
  protected readonly activeIndex = signal(-1);

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly hostClasses = computed(() => nexaCn('nexa-select-host', this.extraClass()));
  protected readonly selectedLabel = computed(
    () => this.options().find((o) => o.value === this.value())?.label
  );
  protected readonly triggerClasses = computed(() =>
    nexaCn('nexa-select__trigger', 'nexa-focus-ring', {
      'nexa-select__trigger--placeholder': this.selectedLabel() === undefined,
      'nexa-select__trigger--invalid': this.invalid(),
      'nexa-select__trigger--open': this.open(),
    })
  );

  protected optionId(index: number): string {
    return `${this.id()}-opt-${index}`;
  }

  protected toggle(): void {
    if (this.isDisabled()) return;
    if (this.open()) {
      this.close();
      return;
    }
    const selected = this.options().findIndex((o) => o.value === this.value() && !o.disabled);
    this.activeIndex.set(selected >= 0 ? selected : this.firstEnabled());
    this.open.set(true);
  }

  protected close(focusTrigger = false): void {
    this.open.set(false);
    this.onTouched();
    if (focusTrigger) this.triggerRef()?.nativeElement.focus();
  }

  protected choose(option: NexaSelectOption): void {
    if (option.disabled || this.isDisabled()) return;
    this.value.set(option.value);
    this.onChange(option.value);
    this.close(true);
  }

  protected setActive(index: number): void {
    if (!this.options()[index]?.disabled) this.activeIndex.set(index);
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!this.open()) this.toggle();
        else this.moveActive(event.key === 'ArrowDown' ? 1 : -1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
        break;
      case 'Escape':
        if (this.open()) this.close();
        break;
    }
  }

  protected onListKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'Enter':
        event.preventDefault();
        {
          const option = this.options()[this.activeIndex()];
          if (option) this.choose(option);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.close(true);
        break;
      case 'Tab':
        this.close();
        break;
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.hostRef.nativeElement.contains(event.target as Node)) {
      if (this.open()) this.close();
    }
  }

  private firstEnabled(): number {
    return this.options().findIndex((o) => !o.disabled);
  }

  private moveActive(delta: 1 | -1): void {
    const opts = this.options();
    if (!opts.length) return;
    let index = this.activeIndex();
    for (let i = 0; i < opts.length; i++) {
      index = (index + delta + opts.length) % opts.length;
      if (!opts[index]?.disabled) {
        this.activeIndex.set(index);
        return;
      }
    }
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
