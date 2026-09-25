# NexaProgress

Determinate progress bar (uploads, multi-step flows) plus an indeterminate mode for unknown durations.

## Import

```ts
import { NexaProgressComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-progress [value]="pct" ariaLabel="Upload progress" [showLabel]="true" />
<nexa-progress [value]="3" [max]="5" variant="success" ariaLabel="Steps complete" />
<nexa-progress [indeterminate]="true" ariaLabel="Loading results" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `value` / `max` | `number` | `0/100` | Progress (clamped to 0–100%) |
| `variant` | `'default'\|'success'\|'warning'\|'destructive'\|'info'` | `'default'` | Fill tone |
| `size` | `'sm'\|'default'\|'lg'` | `'default'` | Bar height |
| `indeterminate` | `boolean` | `false` | Shimmer mode (no value exposed) |
| `showLabel` | `boolean` | `false` | Visible % readout |
| `ariaLabel` | `string` | — | Accessible label (recommended) |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

Native `progressbar` semantics with `aria-valuenow`/`valuetext`. Indeterminate omits values (correct) — announce completion separately (toast/alert).

## Customizing

Determinate fills glide with a smooth 260ms ease-out. Indeterminate sweep speed is `--nexa-progress-indeterminate-duration` (default `2.4s`) — calm by design, override per instance or globally.
