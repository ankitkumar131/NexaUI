# NexaButton

Primary action control with 6 variants and 4 sizes. Renders a native `<button>` for free form semantics, keyboard support and screen-reader behavior.

## Installation & import

```ts
import { NexaButtonComponent } from 'nexa-ui';

@Component({ imports: [NexaButtonComponent] })
export class MyComponent {}
```

## Basic usage

```html
<nexa-button (pressed)="save()">Save</nexa-button>
<nexa-button variant="outline" size="sm">Cancel</nexa-button>
<nexa-button variant="destructive" [loading]="deleting">Delete</nexa-button>
<nexa-button variant="link">Learn more</nexa-button>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | Visual style |
| `size` | `'sm' \| 'default' \| 'lg' \| 'icon'` | `'default'` | Size preset (`icon` = square) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Shows spinner, blocks clicks, sets `aria-busy` |
| `fullWidth` | `boolean` | `false` | Stretch to container width |
| `ariaLabel` | `string` | — | Accessible label (use for icon-only buttons) |
| `extraClass` | `string` | `''` | Extra CSS classes on the inner button |

| Output | Payload | Description |
|---|---|---|
| `pressed` | `MouseEvent` | Emitted on click when enabled |

Content projection: label/icons go inside `<nexa-button>…</nexa-button>`.

## Variants

- `default` — brand primary action (one per view ideally)
- `secondary` — lower-emphasis action
- `destructive` — dangerous/irreversible actions
- `outline` — bordered, transparent fill
- `ghost` — borderless until hover
- `link` — text link styled action

## Accessibility

- Native `<button>` semantics; works with keyboard (Enter/Space) automatically.
- `aria-busy` while `loading`, `aria-disabled` when disabled.
- Visible focus ring via shared `--nexa-focus-*` tokens.
- Icon-only buttons **must** set `ariaLabel`.

## Responsive

- `min-height` targets (2rem–2.75rem) meet touch guidelines; `fullWidth` is ideal on mobile forms.

## Theming

Consumes global tokens (`--nexa-primary`, `--nexa-radius-md`, …) plus per-component overrides:

```css
.my-scope {
  --nexa-button-bg: #0ea5e9;
  --nexa-button-fg: white;
  --nexa-button-hover-bg: #0284c7;
}
```

## Customization

```html
<!-- 1. extra classes -->
<nexa-button extraClass="uppercase tracking-wide">Save</nexa-button>

<!-- 2. CSS variables -->
<nexa-button style="--nexa-button-bg: rebeccapurple">Custom</nexa-button>

<!-- 3. projected content -->
<nexa-button><span aria-hidden="true">＋</span> New item</nexa-button>
```

## Advanced

Submit inside native forms with `type="submit"`. Combine with `nexa-button-group` for toolbars, or show progress via `[loading]` bound to a signal.
