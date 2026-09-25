# NexaDialog

Accessible modal dialog with backdrop, Escape handling, scroll-locking and responsive sizing.

## Import

```ts
import { NexaDialogComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-button (pressed)="open.set(true)">Edit profile</nexa-button>

<nexa-dialog [(open)]="open" title="Edit profile" description="Changes save instantly.">
  <nexa-field label="Name" controlId="dlg-name">
    <nexa-input id="dlg-name" [(value)]="name" />
  </nexa-field>
  <div slot="footer">
    <nexa-button variant="outline" (pressed)="open.set(false)">Cancel</nexa-button>
    <nexa-button (pressed)="save()">Save</nexa-button>
  </div>
</nexa-dialog>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `model<boolean>` | `false` | Two-way open state |
| `title` / `description` | `string` | `''` | Header text (wired to `aria-labelledby/describedby`) |
| `size` | `'sm'\|'md'\|'lg'\|'xl'\|'full'` | `'md'` | Max width |
| `dismissible` | `boolean` | `true` | Backdrop/Escape/✕ close |
| `showClose` | `boolean` | `true` | ✕ button |
| `id` | `string` | auto | Id prefix for aria association |
| `extraClass` | `string` | `''` | Extra panel classes |

| Output | Description |
|---|---|
| `opened` / `closed` | Lifecycle events |

Slots: default = body, `[slot=footer]` = actions row.

## Accessibility

- `role="dialog" aria-modal`, initial focus on the panel, Escape to close, body scroll locked.
- For destructive confirmations prefer `nexa-alert-dialog` (stricter `alertdialog` semantics).

## Responsive

Panel caps at viewport minus padding; `full` nearly fills small screens.

## Customization

`extraClass` + panel tokens (`--nexa-card`, `--nexa-radius-xl`, `--nexa-shadow-xl`). Set `[dismissible]="false"` for forced flows.
