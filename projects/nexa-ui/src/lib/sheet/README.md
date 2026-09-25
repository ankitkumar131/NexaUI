# NexaSheet

Mobile-first bottom sheet with grabber — also docks to any edge. Use for share panels, filters and compact flows.

## Import

```ts
import { NexaSheetComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-button (pressed)="share.set(true)">Share</nexa-button>

<nexa-sheet [(open)]="share" title="Share this page" description="Send it anywhere.">
  <div style="display:flex; gap:.5rem">
    <nexa-button size="sm">Copy link</nexa-button>
    <nexa-button size="sm" variant="outline">Email</nexa-button>
  </div>
</nexa-sheet>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `model<boolean>` | `false` | Two-way open state |
| `title` / `description` | `string` | `''` | Header text |
| `side` | `'bottom'\|'top'\|'left'\|'right'` | `'bottom'` | Dock edge |
| `dismissible` / `showClose` / `showGrabber` | `boolean` | `true` | Behaviors |
| `id` / `extraClass` | `string` | auto/`''` | Id prefix / panel classes |

| Output | Description |
|---|---|
| `closed` | Emitted when dismissed |

## Responsive

Bottom/top sheets cap at `44rem` wide and `88vh` tall — full-width comfortable thumbs on phones, centered cards on desktop.

## Sheet vs Drawer vs Dialog

- `nexa-sheet`: mobile-first, bottom-anchored, transient.
- `nexa-drawer`: desktop-first edge panel, wide content.
- `nexa-dialog`: centered, blocking, form-friendly.
