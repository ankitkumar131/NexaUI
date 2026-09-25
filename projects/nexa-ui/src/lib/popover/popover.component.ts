import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, model } from '@angular/core';
import { signal } from '@angular/core';
import { nexaCn } from '../utils/utils';
import { nexaOverlayMotion } from '../utils/overlay';

export type NexaPopoverSide = 'top' | 'bottom' | 'left' | 'right';
export type NexaPopoverAlign = 'start' | 'center' | 'end';

/**
 * NexaPopover — click-triggered floating panel for rich content.
 *
 * ```html
 * <nexa-popover>
 *   <nexa-button slot="trigger" variant="outline">Open</nexa-button>
 *   <p>Popover content…</p>
 * </nexa-popover>
 * ```
 */
@Component({
  selector: 'nexa-popover',
  standalone: true,
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class NexaPopoverComponent {
  /** Two-way open state (also toggled by clicking the trigger). */
  readonly open = model(false);
  private readonly motion = nexaOverlayMotion(this.open, 150);
  protected readonly rendered = this.motion.rendered;
  protected readonly closing = this.motion.closing;
  readonly side = input<NexaPopoverSide>('bottom');
  readonly align = input<NexaPopoverAlign>('start');
  readonly width = input('17rem');
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly disabled = input(false);
  readonly extraClass = input('');

  private readonly hostRef = inject(ElementRef);
  protected readonly panelId = signal(`nexa-popover-${Math.random().toString(36).slice(2, 8)}`);

  protected readonly hostClasses = computed(() => nexaCn('nexa-popover-host', this.extraClass()));
  protected readonly panelClasses = computed(() =>
    nexaCn('nexa-popover__panel', `nexa-popover__panel--${this.side()}`, `nexa-popover__panel--align-${this.align()}`)
  );

  protected toggle(): void {
    if (this.disabled()) return;
    this.open.update((v) => !v);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open()) {
      event.preventDefault();
      this.close();
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.hostRef.nativeElement.contains(event.target as Node)) {
      if (this.open()) this.close();
    }
  }
}
