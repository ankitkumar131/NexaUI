# NexaSeparator

Thematic divider between content groups, with correct `separator` / `none` semantics.

## Import

```ts
import { NexaSeparatorComponent } from 'nexa-ui';
```

## Usage

```html
<p>Section A</p>
<nexa-separator />
<p>Section B</p>

<div style="display:flex; align-items:center">
  <span>Left</span>
  <nexa-separator orientation="vertical" />
  <span>Right</span>
</div>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider direction |
| `decorative` | `boolean` | `true` | `true` → `role="none"` (hidden from AT) |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

- Keep `decorative` for visual-only dividers. Set `[decorative]="false"` when the divider separates meaningful groups (e.g. toolbar sections) so it exposes `role="separator"`.

## Customization

Thickness/color via CSS: `<nexa-separator style="height:2px; background: var(--nexa-primary)" />`.
