# NexaMessageScroller

Chat viewport: sticks to the newest message, and shows a jump-to-bottom button with unread count when the user scrolls up.

## Import

```ts
import { NexaMessageScrollerComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-message-scroller maxHeight="24rem">
  @for (m of messages(); track m.id) {
    <nexa-message [from]="m.from" [name]="m.name">{{ m.text }}</nexa-message>
  }
</nexa-message-scroller>
```

Works with any projected content, but pairs with `nexa-message` (counted via `contentChildren` for stick/unread logic).

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `maxHeight` | `string` | `'22rem'` | Viewport cap |
| `stickToBottom` | `boolean` | `true` | Auto-follow new messages when at bottom |
| `showJump` | `boolean` | `true` | Jump button when scrolled up |
| `ariaLabel` | `string` | `'Messages'` | Log label |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

`role="log"` + `aria-live="polite"` announces new messages without stealing focus. The viewport is focusable for keyboard scrolling.
