import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/** NexaKbd — keyboard shortcut hint. `<nexa-kbd>Ctrl</nexa-kbd> + <nexa-kbd>K</nexa-kbd>` */
@Component({
  selector: 'nexa-kbd',
  standalone: true,
  templateUrl: './kbd.component.html',
  styleUrl: './kbd.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaKbdComponent {
  readonly size = input<'sm' | 'default'>('default');
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() => nexaCn('nexa-kbd-host'));
  protected readonly kbdClasses = computed(() =>
    nexaCn('nexa-kbd', `nexa-kbd--${this.size()}`, this.extraClass())
  );
}
