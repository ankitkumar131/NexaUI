# NexaHoverCard

Rich preview card revealed on hover or keyboard focus — CSS-only, no JavaScript state.

## Import

```ts
import { NexaHoverCardComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-hover-card ariaLabel="Profile preview">
  <a slot="trigger" href="/users/ada">&#64;ada</a>
  <div style="display:flex; gap:.75rem">
    <nexa-avatar name="Ada Lovelace" />
    <div><strong>Ada Lovelace</strong><p>Analytical engines…</p></div>
  </div>
</nexa-hover-card>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `side` | `'top'\|'bottom'\|'left'\|'right'` | `'bottom'` | Card placement |
| `width` | `string` | `'19rem'` | Card width |
| `openDelay` / `closeDelay` | `number` | `200/120` | Hover delays (ms) |
| `ariaLabel` | `string` | — | Card label |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility & mobile

- Trigger should be focusable (link/button) so keyboard users reveal the card via `:focus-within`.
- Hover doesn't exist on touch — never hide critical actions here; use `nexa-popover` (tap) for mobile-critical content.
