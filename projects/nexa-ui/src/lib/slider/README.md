# NexaSlider

Range control over a native `<input type="range">` with a progress fill and forms support.

## Import

```ts
import { NexaSliderComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-slider [(value)]="volume" [showValue]="true" ariaLabel="Volume" />
<nexa-slider formControlName="brightness" [min]="0" [max]="100" [step]="5" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `model<number>` | `50` | Two-way value |
| `min` / `max` / `step` | `number` | `0/100/1` | Range config |
| `disabled` | `boolean` | `false` | Disabled state |
| `showValue` | `boolean` | `false` | Numeric readout (`<output>`) |
| `ariaLabel` | `string` | — | Accessible label (required when unlabeled) |
| `id` / `name` | `string` | auto | Native attributes |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

Native slider semantics: arrows move by step, Home/End jump. Always provide a visible label or `ariaLabel`. Touch target meets mobile guidelines via a large thumb.
