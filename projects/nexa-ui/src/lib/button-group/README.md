# NexaButtonGroup

Joins `nexa-button` children into one segmented control (zoom in/out, alignment, pagination jumps).

## Import

```ts
import { NexaButtonGroupComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-button-group ariaLabel="Zoom">
  <nexa-button variant="outline" size="sm" ariaLabel="Zoom out">−</nexa-button>
  <nexa-button variant="outline" size="sm" ariaLabel="Reset zoom">100%</nexa-button>
  <nexa-button variant="outline" size="sm" ariaLabel="Zoom in">＋</nexa-button>
</nexa-button-group>

<nexa-button-group orientation="vertical" ariaLabel="Actions">…</nexa-button-group>
```

Use one `variant`/`size` across children for a clean seam (outline/secondary read best).

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |
| `ariaLabel` | `string` | — | Group label |
| `extraClass` | `string` | `''` | Extra host classes |

Only `nexa-button` children are projected (`select="nexa-button"`). `role="group"` keeps AT context.
