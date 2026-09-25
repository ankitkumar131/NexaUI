import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaTable family — ATTRIBUTE components on native table elements, so markup
 * stays valid and screen readers keep real table semantics.
 *
 * ```html
 * <table nexa-table [striped]="true">
 *   <caption>Team members</caption>
 *   <thead nexa-table-header>
 *     <tr nexa-table-row><th nexa-table-head>Name</th><th nexa-table-head>Role</th></tr>
 *   </thead>
 *   <tbody nexa-table-body>
 *     <tr nexa-table-row><td nexa-table-cell>Ada</td><td nexa-table-cell>Engineer</td></tr>
 *   </tbody>
 * </table>
 * ```
 */
@Component({
  selector: 'table[nexa-table]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaTableComponent {
  readonly striped = input(false);
  readonly hoverable = input(true);
  readonly stickyHeader = input(false);
  readonly compact = input(false);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn(
      'nexa-table',
      {
        'nexa-table--striped': this.striped(),
        'nexa-table--hoverable': this.hoverable(),
        'nexa-table--sticky': this.stickyHeader(),
        'nexa-table--compact': this.compact(),
      },
      this.extraClass()
    )
  );
}

@Component({
  selector: 'thead[nexa-table-header]',
  standalone: true,
  template: '<ng-content />',
  styles: [`:host { background: var(--nexa-muted); }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaTableHeaderComponent {}

@Component({
  selector: 'tbody[nexa-table-body]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaTableBodyComponent {}

@Component({
  selector: 'tfoot[nexa-table-footer]',
  standalone: true,
  template: '<ng-content />',
  styles: [`:host { background: var(--nexa-muted); font-weight: 600; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaTableFooterComponent {}

@Component({
  selector: 'tr[nexa-table-row]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaTableRowComponent {}

@Component({
  selector: 'th[nexa-table-head]',
  standalone: true,
  template: '<ng-content />',
  styles: [
    `:host { padding: 0.7rem 0.9rem; text-align: start; font-size: 0.76rem; font-weight: 650; text-transform: uppercase; letter-spacing: 0.05em; color: var(--nexa-muted-foreground); border-bottom: 1px solid var(--nexa-border); white-space: nowrap; }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.scope]': 'scope()' },
})
export class NexaTableHeadComponent {
  readonly scope = input('col');
}

@Component({
  selector: 'td[nexa-table-cell]',
  standalone: true,
  template: '<ng-content />',
  styles: [
    `:host { padding: 0.75rem 0.9rem; font-size: 0.88rem; border-bottom: 1px solid var(--nexa-border); vertical-align: middle; }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaTableCellComponent {}
