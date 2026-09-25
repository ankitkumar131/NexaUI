import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type NexaAvatarShape = 'circle' | 'rounded' | 'square';

/**
 * NexaAvatar — user/org picture with automatic initials fallback.
 *
 * ```html
 * <nexa-avatar src="/u/1.png" name="Ada Lovelace" />
 * <nexa-avatar name="Grace Hopper" size="lg" />
 * ```
 */
@Component({
  selector: 'nexa-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-size]': 'size()',
    '[style.width]': 'dimension()',
    '[style.height]': 'dimension()',
  },
})
export class NexaAvatarComponent {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input('');
  readonly name = input('');
  readonly size = input<NexaAvatarSize>('md');
  readonly shape = input<NexaAvatarShape>('circle');
  /** Pixel diameter override (takes precedence over `size`). */
  readonly diameter = input<number | undefined>(undefined);
  readonly extraClass = input('');

  protected readonly imgFailed = signal(false);

  protected readonly showImage = computed(() => !!this.src() && !this.imgFailed());
  protected readonly dimension = computed(() => {
    const d = this.diameter();
    return d ? `${d}px` : null;
  });

  protected readonly initials = computed(() => {
    const name = this.name().trim();
    if (!name) return '?';
    const parts = name.split(/\s+/);
    return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '')).toUpperCase() || '?';
  });

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-avatar-host', `nexa-avatar-host--${this.size()}`, `nexa-avatar-host--${this.shape()}`, this.extraClass())
  );

  protected onImgError(): void {
    this.imgFailed.set(true);
  }
}
