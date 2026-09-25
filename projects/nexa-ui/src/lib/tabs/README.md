# NexaTabs

Accessible tabs: options-driven triggers with roving tabindex + arrow keys, and explicit `@if` panels via the `nexaTabPanel` directive.

## Import

```ts
import { NexaTabsComponent, NexaTabPanelDirective } from 'nexa-ui';
```

## Usage

```ts
tabs = [
  { value: 'account', label: 'Account' },
  { value: 'password', label: 'Password' },
  { value: 'team', label: 'Team', disabled: true },
];
tab = signal('account');
```

```html
<nexa-tabs [tabs]="tabs" [(value)]="tab" variant="pills" />

@if (tab() === 'account') {
  <div nexaTabPanel role="tabpanel">Account settings…</div>
}
@if (tab() === 'password') {
  <div nexaTabPanel role="tabpanel">Password settings…</div>
}
```

Panels use plain `@if` so inactive content is destroyed (cheap, SSR-safe) — no hidden-tab state bugs.

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `tabs` | `NexaTab[]` | `[]` | `{ value, label, disabled? }` |
| `value` | `model<string>` | `''` | Two-way selected value (defaults to first enabled) |
| `variant` | `'line' \| 'pills' \| 'boxed'` | `'line'` | Visual style |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout + arrow axis |
| `ariaLabel` | `string` | `'Tabs'` | Tablist label |
| `id` | `string` | auto | Id prefix linking triggers↔panels |
| `extraClass` | `string` | `''` | Extra host classes |

## Keyboard

`←/→` (or `↑/↓` vertical) move + select, `Home/End` jump. Roving `tabindex` keeps one tab stop.

## Accessibility

`tablist`/`tab` roles with `aria-selected`/`aria-controls`. Add `role="tabpanel"` + `aria-labelledby` on panels (ids: `{id}-trigger-{value}`).
