# NexaMessage

Chat message row — user (right, primary) vs assistant (left, muted) vs system (centered status).

## Import

```ts
import { NexaMessageComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-message from="assistant" name="Nexa AI" time="10:24">
  <nexa-avatar slot="avatar" name="Nexa AI" size="sm" />
  Hello! How can I help you today?
</nexa-message>

<nexa-message from="user" time="10:25">Show me last week's report.</nexa-message>
<nexa-message from="system">Ada joined the chat.</nexa-message>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `from` | `'user' \| 'assistant' \| 'system'` | `'assistant'` | Alignment + tone |
| `name` / `time` | `string` | `''` | Meta line |
| `extraClass` | `string` | `''` | Extra host classes |

Slot `[slot=avatar]` for avatars; default slot is the bubble content.

## Chat family

Combine with `nexa-bubble` (inline quote style), `nexa-message-scroller` (auto-scroll list), `nexa-attachment` and `nexa-marker` for full chat UIs.
