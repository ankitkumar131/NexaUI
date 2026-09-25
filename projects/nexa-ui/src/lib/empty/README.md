# NexaEmpty

Friendly zero-state for empty lists, inboxes and search results — icon, title, description + action slot.

## Import

```ts
import { NexaEmptyComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-empty icon="🔍" title="No results" description="Try a different search term.">
  <nexa-button slot="action" size="sm" variant="outline" (pressed)="clear()">Clear search</nexa-button>
</nexa-empty>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `icon` | `string` | `'📭'` | Glyph/emoji (aria-hidden) |
| `title` | `string` | `'Nothing here yet'` | Heading |
| `description` | `string` | `''` | Helper text |
| `extraClass` | `string` | `''` | Extra host classes |

Slots: `[slot=action]` for buttons, default for extra content.

## Accessibility

`role="status"` announces the state politely. Always include a next step (action or guidance) — dead-end empties frustrate users.
