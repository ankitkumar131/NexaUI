# NexaDropdownMenu

Action menu attached to a trigger — overflow actions, "⋯" menus and command bars.

## Import

```ts
import { NexaDropdownMenuComponent } from 'nexa-ui';
```

## Usage

```ts
items = [
  { label: 'Edit', value: 'edit', hint: '⌘E' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Delete', value: 'delete', destructive: true, separatorBefore: true },
];
```

```html
<nexa-dropdown-menu [items]="items" (selected)="onAction($event)" ariaLabel="Row actions">
  <nexa-button slot="trigger" variant="outline" size="icon" ariaLabel="Open actions">⋯</nexa-button>
</nexa-dropdown-menu>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `items` | `NexaMenuItem[]` | `[]` | `{ label, value?, hint?, disabled?, destructive?, separatorBefore? }` |
| `open` | `model<boolean>` | `false` | Two-way open state |
| `align` | `'start' \| 'end'` | `'start'` | Menu alignment |
| `width` | `string` | `'13rem'` | Menu width |
| `ariaLabel` | `string` | — | Menu label |
| `disabled` | `boolean` | `false` | Disable trigger |
| `extraClass` | `string` | `''` | Extra host classes |

| Output | Payload | Description |
|---|---|---|
| `selected` | `NexaMenuItem` | Emitted on choice |

## Keyboard

`↓/Enter/Space` open · `↓/↑` move · `Enter` choose · `Esc`/`Tab` close.

## Accessibility

`menu`/`menuitem` roles with `aria-disabled`; destructive items keep text labels (never color-only).
