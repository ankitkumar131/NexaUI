# NexaBubble

Compact inline callout for annotations, quotes and chat side-notes — smaller than `nexa-alert`, richer than `nexa-badge`.

## Import

```ts
import { NexaBubbleComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-bubble tone="info" tail="left">Deploy moves to 5pm.</nexa-bubble>
<nexa-bubble tone="success" size="sm">Saved ✓</nexa-bubble>
<nexa-bubble tone="primary" tail="right">On it!</nexa-bubble>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `tone` | `'default'\|'primary'\|'success'\|'warning'\|'destructive'\|'info'` | `'default'` | Color |
| `size` | `'sm' \| 'default'` | `'default'` | Density |
| `tail` | `'none' \| 'left' \| 'right'` | `'none'` | Speech tail |
| `extraClass` | `string` | `''` | Extra host classes |

Override `--nexa-bubble-bg` / `--nexa-bubble-fg` per instance for brand moments.
