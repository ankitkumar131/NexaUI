import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaSidebar — responsive app sidebar: persistent on desktop, drawer on mobile.
 *
 * ```html
 * <nexa-button (pressed)="nav.set(true)">Menu</nexa-button>
 * <nexa-sidebar [(open)]="nav" title="Acme">
 *   <a href="/">Dashboard</a>
 *   <a href="/settings">Settings</a>
 * </nexa-sidebar>
 * ```
 */
@Component({
  selector: 'nexa-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaSidebarComponent {
  /** Mobile drawer visibility (ignored on desktop — always visible). */
  readonly open = model(false);
  readonly title = input('');
  readonly side = input<'left' | 'right'>('left');
  readonly width = input('17rem');
  readonly ariaLabel = input('Sidebar navigation');
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn(
      'nexa-sidebar-host',
      `nexa-sidebar-host--${this.side()}`,
      { 'nexa-sidebar-host--open': this.open() },
      this.extraClass()
    )
  );

  protected close(): void {
    this.open.set(false);
  }
}
