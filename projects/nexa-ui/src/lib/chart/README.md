# NexaChart

Dependency-free SVG charts — bar, line and donut — with automatic accessible summaries. Zero charting library: this is why importing a button never pulls chart code.

## Import

```ts
import { NexaChartComponent } from 'nexa-ui';
```

## Usage

```ts
sales = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 19 },
  { label: 'Wed', value: 8 },
];
```

```html
<nexa-chart type="bar" [data]="sales" [showValues]="true" />
<nexa-chart type="line" [data]="sales" height="10rem" />
<nexa-chart type="donut" [data]="sales" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `type` | `'bar' \| 'line' \| 'donut'` | `'bar'` | Chart geometry |
| `data` | `NexaChartPoint[]` | `[]` | `{ label, value }` |
| `height` | `string` | `'12rem'` | Bar/line height |
| `showLegend` / `showValues` | `boolean` | `true/false` | Legend / bar values |
| `ariaLabel` | `string` | auto | Custom summary (default names type, total, top point) |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

Each chart is `role="img"` with an auto-generated summary plus a screen-reader-only data list — never graphics-only. Colors cycle `--nexa-chart-1…5`; values are always available as text via the legend/list.

## Customization

Override `--nexa-chart-1…5` to recolor every chart at once.
