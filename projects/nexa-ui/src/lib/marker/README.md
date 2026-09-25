# NexaMarker

Map pin, pulsing status dot or inline tag — one component for "point at this" UI.

## Import

```ts
import { NexaMarkerComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-marker variant="pin" tone="destructive" ariaLabel="Office: Berlin" />
<nexa-marker variant="dot" tone="success" [pulse]="true" ariaLabel="Service live" />
<nexa-marker variant="tag" tone="info">New</nexa-marker>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'pin' \| 'dot' \| 'tag'` | `'pin'` | Shape (`tag` projects text) |
| `tone` | `'default'\|'primary'\|'success'\|'warning'\|'destructive'\|'info'` | `'primary'` | Color |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Scale |
| `pulse` | `boolean` | `false` | Ping/bounce animation |
| `ariaLabel` | `string` | — | Accessible name (`role="img"`) |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

`role="img"` + `ariaLabel` for meaningful markers (locations, live status). Pure decoration: omit the label. Pulse pauses under `prefers-reduced-motion`.
