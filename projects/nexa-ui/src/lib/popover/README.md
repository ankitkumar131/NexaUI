# NexaPopover

Click-triggered floating panel for rich interactive content (forms, pickers, help).

## Import

```ts
import { NexaPopoverComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-popover side="bottom" align="start" ariaLabel="Notifications">
  <nexa-button slot="trigger" variant="outline">🔔 Notifications</nexa-button>
  <strong>You have 3 updates</strong>
  <p>…rich content, even form controls…</p>
</nexa-popover>
```

Controlled: `[(open)]="open"`.

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `model<boolean>` | `false` | Two-way open state |
| `side` | `'top'\|'bottom'\|'left'\|'right'` | `'bottom'` | Panel side |
| `align` | `'start'\|'center'\|'end'` | `'start'` | Alignment to trigger |
| `width` | `string` | `'17rem'` | Panel width |
| `ariaLabel` | `string` | — | Panel label |
| `disabled` | `boolean` | `false` | Disable trigger |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility & behavior

- Trigger exposes `aria-expanded`; Escape and outside-click close.
- Panel is `role="dialog"` and capped at `90vw` for mobile.
- Prefer `nexa-tooltip` for plain-text hints and `nexa-dialog` for blocking flows.
