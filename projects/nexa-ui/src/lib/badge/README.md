# NexaBadge

Compact label for statuses, counts and categories.

## Import

```ts
import { NexaBadgeComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-badge>New</nexa-badge>
<nexa-badge variant="success">Active</nexa-badge>
<nexa-badge variant="destructive" size="sm">Failed</nexa-badge>
<nexa-badge variant="outline" [pill]="false">v2.4.1</nexa-badge>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default'\|'secondary'\|'destructive'\|'outline'\|'success'\|'warning'\|'info'` | `'default'` | Color scheme |
| `size` | `'sm'\|'default'\|'lg'` | `'default'` | Size preset |
| `pill` | `boolean` | `true` | Fully rounded shape |
| `extraClass` | `string` | `''` | Extra classes |

## Accessibility

- Pure visual label; pair with real text for screen readers when color alone conveys meaning (e.g. include "Error:" text, not just a red dot).

## Responsive / Theming

- Wraps safely, never overflows. Override `--nexa-badge-bg`, `--nexa-badge-fg`, `--nexa-badge-border` per instance.

## Customization

```html
<nexa-badge style="--nexa-badge-bg: rebeccapurple; --nexa-badge-fg: white">Custom</nexa-badge>
```
