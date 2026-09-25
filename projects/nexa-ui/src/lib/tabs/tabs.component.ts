import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { nexaCn, nexaUniqueId } from '../utils/utils';

export interface NexaTab {
  value: string;
  label: string;
  disabled?: boolean;
}

export type NexaTabsVariant = 'line' | 'pills' | 'boxed';
export type NexaTabsOrientation = 'horizontal' | 'vertical';

/**
 * NexaTabs — tab triggers with roving tabindex + arrow keys.
 * Panels are plain projected content matched with `@if` + `nexaTabPanel`.
 *
 * ```html
 * <nexa-tabs [tabs]="[{value:'a',label:'Account'},{value:'b',label:'Password'}]" [(value)]="tab" />
 * @if (tab() === 'a') { <div nexaTabPanel>Account panel…</div> }
 * ```
 */
@Component({
  selector: 'nexa-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaTabsComponent {
  readonly tabs = input<NexaTab[]>([]);
  readonly value = model('');
  readonly variant = input<NexaTabsVariant>('line');
  readonly orientation = input<NexaTabsOrientation>('horizontal');
  readonly ariaLabel = input('Tabs');
  readonly id = input(nexaUniqueId('nexa-tabs'));
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn(
      'nexa-tabs-host',
      `nexa-tabs-host--${this.variant()}`,
      `nexa-tabs-host--${this.orientation()}`,
      this.extraClass()
    )
  );

  protected triggerId(value: string): string {
    return `${this.id()}-trigger-${value}`;
  }

  protected panelId(value: string): string {
    return `${this.id()}-panel-${value}`;
  }

  protected isSelected(tab: NexaTab): boolean {
    const current = this.value() || this.firstEnabled();
    return tab.value === current;
  }

  protected tabIndex(tab: NexaTab): number {
    return this.isSelected(tab) ? 0 : -1;
  }

  protected select(tab: NexaTab): void {
    if (tab.disabled) return;
    this.value.set(tab.value);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const horizontal = this.orientation() === 'horizontal';
    const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
    const enabled = this.tabs().filter((t) => !t.disabled);
    if (!enabled.length) return;
    const current = this.value() || enabled[0]?.value;
    const index = enabled.findIndex((t) => t.value === current);
    let target: NexaTab | undefined;
    if (event.key === nextKey) target = enabled[(index + 1) % enabled.length];
    else if (event.key === prevKey) target = enabled[(index - 1 + enabled.length) % enabled.length];
    else if (event.key === 'Home') target = enabled[0];
    else if (event.key === 'End') target = enabled[enabled.length - 1];
    if (target) {
      event.preventDefault();
      this.value.set(target.value);
      document.getElementById(this.triggerId(target.value))?.focus();
    }
  }

  private firstEnabled(): string {
    return this.tabs().find((t) => !t.disabled)?.value ?? '';
  }
}
