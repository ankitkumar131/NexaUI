import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaAspectRatio — keeps projected media at a fixed ratio (e.g. 16/9 video, 1/1 avatar).
 *
 * ```html
 * <nexa-aspect-ratio ratio="16 / 9"><img src="cover.jpg" alt="Cover" /></nexa-aspect-ratio>
 * ```
 */
@Component({
  selector: 'nexa-aspect-ratio',
  standalone: true,
  templateUrl: './aspect-ratio.component.html',
  styleUrl: './aspect-ratio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[style.aspect-ratio]': 'ratioValue()',
  },
})
export class NexaAspectRatioComponent {
  /** Accepts `"16 / 9"` strings or numbers (`16/9`). */
  readonly ratio = input<string | number>('16 / 9');
  /** Stretch the (single) projected child to fill the box. */
  readonly fillContent = input(true);
  readonly extraClass = input('');

  protected readonly ratioValue = computed(() => String(this.ratio()));

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-aspect-host', { 'nexa-aspect-host--fill': this.fillContent() }, this.extraClass())
  );
}
