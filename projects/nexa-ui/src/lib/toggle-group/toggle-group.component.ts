import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { nexaCn } from '../utils/utils';

export interface NexaToggleOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * NexaToggleGroup — single or multi-select press group (alignment, view mode…).
 *
 * ```html
 * <nexa-toggle-group [options]="align" [(values)]="alignment" type="single" />
 * ```
 */
@Component({
  selector: 'nexa-toggle-group',
  standalone: true,
  templateUrl: './toggle-group.component.html',
  styleUrl: './toggle-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaToggleGroupComponent {
  readonly options = input<NexaToggleOption[]>([]);
  /** Selected values (single mode keeps at most one). */
  readonly values = model<string[]>([]);
  readonly type = input<'single' | 'multiple'>('single');
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly size = input<'sm' | 'default' | 'lg'>('default');
  readonly disabled = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn(
      'nexa-toggle-group-host',
      `nexa-toggle-group-host--${this.orientation()}`,
      `nexa-toggle-group-host--${this.size()}`,
      this.extraClass()
    )
  );

  protected isPressed(option: NexaToggleOption): boolean {
    return this.values().includes(option.value);
  }

  protected toggle(option: NexaToggleOption): void {
    if (option.disabled || this.disabled()) return;
    if (this.type() === 'single') {
      this.values.set(this.isPressed(option) ? [] : [option.value]);
    } else {
      this.values.update((v) =>
        v.includes(option.value) ? v.filter((x) => x !== option.value) : [...v, option.value]
      );
    }
  }
}
