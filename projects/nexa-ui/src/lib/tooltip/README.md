# NexaTooltip

Zero-JavaScript hover/focus hint. Pure CSS reveal on `:hover` and `:focus-within`, so keyboard users get it free.

## Import

```ts
import { NexaTooltipComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-tooltip text="Save changes (Ctrl+S)">
  <nexa-button size="icon" ariaLabel="Save">💾</nexa-button>
</nexa-tooltip>

<nexa-tooltip text="Verified account" side="right">
  <nexa-badge variant="success">✓</nexa-badge>
</nexa-tooltip>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | `''` | Tooltip content (plain text) |
| `side` | `'top'\|'bottom'\|'left'\|'right'` | `'top'` | Placement |
| `disabled` | `boolean` | `false` | Hide the bubble |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

- `role="tooltip"`. The trigger should be focusable (button/link) so keyboard users can reveal it.
- Never put essential information ONLY in a tooltip — touch users can't hover. Critical help belongs in visible text or a popover.
