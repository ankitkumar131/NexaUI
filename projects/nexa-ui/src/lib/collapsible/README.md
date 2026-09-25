# NexaCollapsible

Generic show/hide wrapper — "read more", advanced settings, spoiler blocks. Simpler than accordion (no group coordination).

## Import

```ts
import { NexaCollapsibleComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-collapsible [(open)]="showMore">
  <nexa-button slot="trigger" variant="link">{{ showMore() ? 'Show less' : 'Read more' }}</nexa-button>
  <p>The full story…</p>
</nexa-collapsible>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `model<boolean>` | `false` | Two-way open state |
| `disabled` | `boolean` | `false` | Disable toggle |
| `id` | `string` | auto | Id prefix |
| `extraClass` | `string` | `''` | Extra host classes |

Slots: `[slot=trigger]` + default content.

## Accessibility

Trigger exposes `aria-expanded`/`aria-controls`; closed content is `inert`. Keyboard: Enter/Space toggle.
