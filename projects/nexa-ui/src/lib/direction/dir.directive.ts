import { Directive, input } from '@angular/core';
import { NexaDir } from './direction.service';

/**
 * NexaDirDirective — scoped direction override for any element.
 *
 * ```html
 * <div nexaDir="rtl">…Arabic content inside an LTR page…</div>
 * <div [nexaDir]="dir()">…reactive…</div>
 * ```
 */
@Directive({
  selector: '[nexaDir]',
  standalone: true,
  host: {
    '[attr.dir]': 'dir()',
  },
})
export class NexaDirDirective {
  readonly dir = input<NexaDir>('ltr', { alias: 'nexaDir' });
}
