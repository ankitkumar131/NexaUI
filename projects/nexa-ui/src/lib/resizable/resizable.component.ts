import { ChangeDetectionStrategy, Component, ElementRef, computed, input, model, signal, viewChild } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaResizable — two-pane splitter with pointer drag + keyboard resizing.
 *
 * ```html
 * <nexa-resizable [size]="40" style="height: 16rem">
 *   <div slot="first">Left</div>
 *   <div slot="second">Right</div>
 * </nexa-resizable>
 * ```
 */
@Component({
  selector: 'nexa-resizable',
  standalone: true,
  templateUrl: './resizable.component.html',
  styleUrl: './resizable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaResizableComponent {
  /** First-pane size in % (two-way). */
  readonly size = model(50);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly min = input(10);
  readonly max = input(90);
  readonly ariaLabel = input('Resize panels');
  readonly extraClass = input('');

  private readonly containerRef = viewChild<ElementRef<HTMLDivElement>>('container');
  protected readonly dragging = signal(false);

  protected readonly hostClasses = computed(() =>
    nexaCn(
      'nexa-resizable-host',
      `nexa-resizable-host--${this.direction()}`,
      { 'nexa-resizable-host--dragging': this.dragging() },
      this.extraClass()
    )
  );
  protected readonly clamped = computed(() =>
    Math.min(this.max(), Math.max(this.min(), Math.round(this.size())))
  );

  protected start(event: PointerEvent): void {
    event.preventDefault();
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    this.dragging.set(true);
  }

  protected move(event: PointerEvent): void {
    if (!this.dragging()) return;
    const el = this.containerRef()?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const horizontal = this.direction() === 'horizontal';
    const total = horizontal ? rect.width : rect.height;
    if (total <= 0) return;
    const pos = horizontal ? event.clientX - rect.left : event.clientY - rect.top;
    this.size.set(Math.round((pos / total) * 100));
  }

  protected end(): void {
    this.dragging.set(false);
  }

  protected onHandleKeydown(event: KeyboardEvent): void {
    const step = event.shiftKey ? 10 : 2;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.size.set(this.clamped() - step);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.size.set(this.clamped() + step);
        break;
      case 'Home':
        event.preventDefault();
        this.size.set(this.min());
        break;
      case 'End':
        event.preventDefault();
        this.size.set(this.max());
        break;
    }
  }
}
