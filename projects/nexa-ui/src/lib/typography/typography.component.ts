import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

export type NexaTypographyVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'lead' | 'large' | 'small' | 'muted' | 'blockquote' | 'inline-code' | 'list';
export type NexaTextAlign = 'start' | 'center' | 'end' | 'justify';

/**
 * NexaTypography — semantic text with a consistent type scale.
 *
 * ```html
 * <nexa-typography variant="h1">Dashboard</nexa-typography>
 * <nexa-typography variant="muted">Helper text</nexa-typography>
 * ```
 */
@Component({
  selector: 'nexa-typography',
  standalone: true,
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-variant]': 'variant()',
  },
})
export class NexaTypographyComponent {
  readonly variant = input<NexaTypographyVariant>('p');
  readonly align = input<NexaTextAlign>('start');
  readonly truncate = input(false);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-typography-host', `nexa-typography-host--${this.variant()}`)
  );

  protected readonly textClasses = computed(() =>
    nexaCn(
      'nexa-text',
      `nexa-text--${this.variant()}`,
      `nexa-text--align-${this.align()}`,
      { 'nexa-text--truncate': this.truncate() },
      this.extraClass()
    )
  );
}
