import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaCard family — composable content container.
 *
 * ```html
 * <nexa-card>
 *   <nexa-card-header>
 *     <nexa-card-title>Project Alpha</nexa-card-title>
 *     <nexa-card-description>Q3 roadmap and milestones.</nexa-card-description>
 *     <nexa-card-action><nexa-button size="sm">Open</nexa-button></nexa-card-action>
 *   </nexa-card-header>
 *   <nexa-card-content>Body…</nexa-card-content>
 *   <nexa-card-footer>Footer…</nexa-card-footer>
 * </nexa-card>
 * ```
 */
@Component({
  selector: 'nexa-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaCardComponent {
  readonly extraClass = input('');
  protected readonly hostClasses = computed(() => nexaCn('nexa-card-host', this.extraClass()));
}

@Component({
  selector: 'nexa-card-header',
  standalone: true,
  template: '<ng-content />',
  styles: [
    `:host { display: grid; grid-template-columns: 1fr auto; gap: 0.15rem 1rem; align-items: start; padding: 1.4rem 1.4rem 0; }
     :host ::ng-deep nexa-card-action { grid-column: 2; grid-row: 1 / span 2; }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaCardHeaderComponent {}

@Component({
  selector: 'nexa-card-title',
  standalone: true,
  template: '<ng-content />',
  styles: [
    `:host { display: block; grid-column: 1; font-family: var(--nexa-font-sans); font-size: 1.05rem; font-weight: 650; letter-spacing: -0.01em; color: var(--nexa-card-foreground); }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaCardTitleComponent {}

@Component({
  selector: 'nexa-card-description',
  standalone: true,
  template: '<ng-content />',
  styles: [
    `:host { display: block; grid-column: 1; font-family: var(--nexa-font-sans); font-size: 0.85rem; line-height: 1.55; color: var(--nexa-muted-foreground); }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaCardDescriptionComponent {}

@Component({
  selector: 'nexa-card-action',
  standalone: true,
  template: '<ng-content />',
  styles: [`:host { display: block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaCardActionComponent {}

@Component({
  selector: 'nexa-card-content',
  standalone: true,
  template: '<ng-content />',
  styles: [
    `:host { display: block; padding: 1rem 1.4rem; font-family: var(--nexa-font-sans); font-size: 0.92rem; line-height: 1.6; color: var(--nexa-card-foreground); }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaCardContentComponent {}

@Component({
  selector: 'nexa-card-footer',
  standalone: true,
  template: '<ng-content />',
  styles: [
    `:host { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; padding: 0 1.4rem 1.4rem; font-family: var(--nexa-font-sans); }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaCardFooterComponent {}
