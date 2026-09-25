import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaSkeleton — content placeholder with shimmer while data loads.
 * Compose rows of skeletons to mirror your layout (avatar + lines, cards…).
 *
 * ```html
 * <div style="display:flex; gap:.75rem; align-items:center">
 *   <nexa-skeleton shape="circle" width="2.75rem" height="2.75rem" />
 *   <div style="flex:1; display:grid; gap:.4rem">
 *     <nexa-skeleton width="40%" />
 *     <nexa-skeleton width="90%" />
 *   </div>
 * </div>
 * ```
 */
@Component({
  selector: 'nexa-skeleton',
  standalone: true,
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
  },
})
export class NexaSkeletonComponent {
  readonly width = input('100%');
  readonly height = input('1rem');
  readonly shape = input<'rounded' | 'circle' | 'square'>('rounded');
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-skeleton-host', `nexa-skeleton-host--${this.shape()}`, this.extraClass())
  );
}
