# NexaScrollArea

Themed scroll container with slim scrollbars (Firefox `scrollbar-*` + WebKit pseudo-elements).

## Import

```ts
import { NexaScrollAreaComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-scroll-area maxHeight="12rem" ariaLabel="Changelog">
  <p>v2.4…</p><p>v2.3…</p><!-- long content -->
</nexa-scroll-area>

<nexa-scroll-area orientation="horizontal" ariaLabel="Thumbnails">
  <div style="display:flex; gap:.5rem">…wide row…</div>
</nexa-scroll-area>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `maxHeight` | `string` | `'16rem'` | Scroll viewport cap |
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Scroll axes |
| `ariaLabel` | `string` | — | Region label (focusable region) |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

The region is keyboard-focusable (`tabindex="0"`) so keyboard users can scroll with arrows — give it an `ariaLabel` when the content isn't self-evident.
