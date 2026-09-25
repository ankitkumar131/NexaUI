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
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nexaCn, nexaUniqueId } from '../utils/utils';

export interface NexaComboboxOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

/**
 * NexaCombobox — searchable select with filtering, keyboard control and forms support.
 *
 * ```html
 * <nexa-combobox [options]="frameworks" [(value)]="fw" placeholder="Pick a framework…" />
 * ```
 */
@Component({
  selector: 'nexa-combobox',
  standalone: true,
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NexaComboboxComponent), multi: true },
  ],
  host: {
    '[class]': 'hostClasses()',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class NexaComboboxComponent implements ControlValueAccessor {
  readonly options = input<NexaComboboxOption[]>([]);
  readonly value = model<string | undefined>(undefined);
  readonly placeholder = input('Search…');
  readonly emptyText = input('No results found.');
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly id = input(nexaUniqueId('nexa-combobox'));
  readonly extraClass = input('');

  readonly open = model(false);

  private readonly hostRef = inject(ElementRef);
  private readonly cvaDisabled = signal(false);
  private onChange: (value: string | undefined) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly query = signal('');
  protected readonly activeIndex = signal(0);

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  protected readonly hostClasses = computed(() => nexaCn('nexa-combobox-host', this.extraClass()));

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const opts = this.options();
    if (!q) return opts;
    return opts.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  });

  protected readonly selectedLabel = computed(
    () => this.options().find((o) => o.value === this.value())?.label ?? ''
  );

  protected onFocus(): void {
    if (this.isDisabled()) return;
    this.query.set('');
    this.activeIndex.set(0);
    this.open.set(true);
  }

  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.activeIndex.set(0);
    if (!this.open()) this.open.set(true);
  }

  protected onBlur(): void {
    this.onTouched();
    // Commit display back to the selected label shortly after blur
    // (allows option click to land first).
    setTimeout(() => {
      if (!this.open()) this.query.set('');
    }, 120);
  }

  protected close(): void {
    this.open.set(false);
    this.query.set('');
    this.onTouched();
  }

  protected choose(option: NexaComboboxOption): void {
    if (option.disabled || this.isDisabled()) return;
    this.value.set(option.value);
    this.onChange(option.value);
    this.close();
  }

  protected clear(event: MouseEvent): void {
    event.stopPropagation();
    this.value.set(undefined);
    this.onChange(undefined);
    this.query.set('');
  }

  protected onKeydown(event: KeyboardEvent): void {
    const enabled = this.filtered()
      .map((o, i) => ({ o, i }))
      .filter((e) => !e.o.disabled);
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.open()) {
          this.open.set(true);
          return;
        }
        this.stepEnabled(enabled, 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.stepEnabled(enabled, -1);
        break;
      case 'Enter': {
        event.preventDefault();
        const entry = enabled.find((e) => e.i === this.activeIndex()) ?? enabled[0];
        if (entry && this.open()) this.choose(entry.o);
        else this.open.set(true);
        break;
      }
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.hostRef.nativeElement.contains(event.target as Node)) {
      if (this.open()) this.close();
    }
  }

  private stepEnabled(enabled: Array<{ i: number }>, delta: 1 | -1): void {
    if (!enabled.length) return;
    const positions = enabled.map((e) => e.i);
    const current = positions.indexOf(this.activeIndex());
    const next = positions[(current + delta + positions.length) % positions.length];
    if (next !== undefined) this.activeIndex.set(next);
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
