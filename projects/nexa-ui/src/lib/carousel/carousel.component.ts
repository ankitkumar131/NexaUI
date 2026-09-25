import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, input, model, signal } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaCarousel + NexaCarouselSlide — accessible slideshow with dots,
 * arrows, keyboard support and optional autoplay (pauses on hover/focus).
 *
 * ```html
 * <nexa-carousel [(index)]="i" [autoplay]="5000">
 *   <nexa-carousel-slide><img … /></nexa-carousel-slide>
 *   <nexa-carousel-slide><img … /></nexa-carousel-slide>
 * </nexa-carousel>
 * ```
 */
@Component({
  selector: 'nexa-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaCarouselComponent {
  readonly index = model(0);
  /** Milliseconds between auto-advances (`0` = off). */
  readonly autoplay = input(0);
  readonly loop = input(true);
  readonly showArrows = input(true);
  readonly showDots = input(true);
  readonly ariaLabel = input('Image carousel');
  readonly ariaRoledescription = input('carousel');
  readonly extraClass = input('');

  protected readonly slides = contentChildren(NexaCarouselSlideComponent);
  protected readonly paused = signal(false);

  constructor() {
    effect((onCleanup) => {
      const ms = this.autoplay();
      const count = this.slides().length;
      if (!ms || ms <= 0 || count < 2 || this.paused()) return;
      const id = setInterval(() => this.next(), ms);
      onCleanup(() => clearInterval(id));
    });
  }

  protected readonly hostClasses = computed(() => nexaCn('nexa-carousel-host', this.extraClass()));
  protected readonly count = computed(() => this.slides().length);
  protected readonly safeIndex = computed(() => {
    const count = this.count();
    if (count === 0) return 0;
    const i = this.index();
    return ((i % count) + count) % count;
  });
  protected readonly dots = computed(() => Array.from({ length: this.count() }, (_, i) => i));

  protected go(i: number): void {
    const count = this.count();
    if (!count) return;
    this.index.set(this.loop() ? ((i % count) + count) % count : Math.min(count - 1, Math.max(0, i)));
  }

  protected prev(): void {
    this.go(this.safeIndex() - 1);
  }

  protected next(): void {
    this.go(this.safeIndex() + 1);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.go(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.go(this.count() - 1);
    }
  }

  protected setPaused(paused: boolean): void {
    this.paused.set(paused);
  }
}

@Component({
  selector: 'nexa-carousel-slide',
  standalone: true,
  template: '<ng-content />',
  styles: [
    `:host { display: block; flex: 0 0 100%; min-width: 0; }
     :host > ::ng-deep img { width: 100%; height: 100%; object-fit: cover; display: block; }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaCarouselSlideComponent {}
