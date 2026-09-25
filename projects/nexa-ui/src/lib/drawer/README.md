# NexaDrawer

Sliding edge panel for filters, navigation and detail views — a modal `aside` from any side.

## Import

```ts
import { NexaDrawerComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-button (pressed)="filters.set(true)">Filters</nexa-button>

<nexa-drawer [(open)]="filters" title="Filters" description="Refine the results." side="right" size="24rem">
  <nexa-checkbox>On sale only</nexa-checkbox>
  <div slot="footer">
    <nexa-button variant="outline" (pressed)="filters.set(false)">Reset</nexa-button>
    <nexa-button (pressed)="apply()">Apply</nexa-button>
  </div>
</nexa-drawer>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `model<boolean>` | `false` | Two-way open state |
| `title` / `description` | `string` | `''` | Header text |
| `side` | `'left'\|'right'\|'top'\|'bottom'` | `'right'` | Edge |
| `size` | `string` | `'22rem'` | Width (left/right) or height (top/bottom) |
| `dismissible` / `showClose` | `boolean` | `true` | Backdrop+Escape / ✕ |
| `id` / `extraClass` | `string` | auto/`''` | Id prefix / panel classes |

| Output | Description |
|---|---|
| `closed` | Emitted when dismissed |

## Accessibility

`role="dialog" aria-modal`, initial focus, Escape, scroll lock. Prefer `nexa-sheet` for mobile-first bottom sheets.
