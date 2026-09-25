import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/** NexaSeparator — thematic divider (horizontal/vertical) with correct separator semantics. */
@Component({
  selector: 'nexa-separator',
  standalone: true,
  templateUrl: './separator.component.html',
  styleUrl: './separator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': 'decorative() ? "none" : "separator"',
    '[attr.aria-orientation]': 'decorative() ? null : orientation()',
  },
})
export class NexaSeparatorComponent {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  /** Purely visual dividers should be hidden from assistive tech. */
  readonly decorative = input(true);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-separator-host', `nexa-separator-host--${this.orientation()}`, this.extraClass())
  );
}
