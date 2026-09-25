import { Directive } from '@angular/core';

/**
 * NexaTabPanelDirective — styles any element as a tab panel.
 * Pair with `nexa-tabs` and match visibility via `@if (tab() === 'value')`.
 *
 * ```html
 * <nexa-tabs [tabs]="tabs" [(value)]="tab" />
 * @if (tab() === 'account') {
 *   <section nexaTabPanel role="tabpanel" aria-labelledby="…">…</section>
 * }
 * ```
 */
@Directive({
  selector: '[nexaTabPanel]',
  standalone: true,
  host: {
    class: 'nexa-tab-panel',
  },
})
export class NexaTabPanelDirective {}
