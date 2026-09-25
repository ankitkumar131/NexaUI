import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { nexaCn } from '../utils/utils';

export interface NexaNavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NexaNavItem {
  label: string;
  href: string;
  children?: NexaNavChild[];
}

/**
 * NexaNavigationMenu — responsive top navigation with dropdown groups.
 * Desktop dropdowns are CSS-only; JS only toggles the mobile menu.
 *
 * ```html
 * <nexa-navigation-menu [items]="nav" activeHref="/docs" />
 * ```
 */
@Component({
  selector: 'nexa-navigation-menu',
  standalone: true,
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaNavigationMenuComponent {
  readonly items = input<NexaNavItem[]>([]);
  readonly activeHref = input<string | undefined>(undefined);
  readonly ariaLabel = input('Main navigation');
  readonly extraClass = input('');

  protected readonly mobileOpen = signal(false);

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-nav-host', { 'nexa-nav-host--open': this.mobileOpen() }, this.extraClass())
  );

  protected toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }

  protected isActive(href: string): boolean {
    return this.activeHref() === href;
  }
}
