# NexaResizable

Two-pane splitter with pointer dragging and keyboard resizing.

## Import

```ts
import { NexaResizableComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-resizable [(size)]="split" style="height: 18rem">
  <div slot="first">Editor</div>
  <div slot="second">Preview</div>
</nexa-resizable>

<nexa-resizable direction="vertical" [size]="30" style="height: 22rem">…</nexa-resizable>
```

Give the host a height (inline style or class) — panes fill it.

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `size` | `model<number>` | `50` | First-pane % (two-way, clamped to min/max) |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Split axis |
| `min` / `max` | `number` | `10/90` | Size bounds (%) |
| `ariaLabel` | `string` | `'Resize panels'` | Handle label |
| `extraClass` | `string` | `''` | Extra host classes |

## Keyboard & a11y

Handle is `role="separator"` with `aria-valuenow`: arrows ±2% (Shift ±10%), Home/End jump. Pointer capture makes drags smooth on touch.
