# NexaAlertDialog

Strict confirmation modal for destructive/irreversible actions. Uses `role="alertdialog"` and — unlike `nexa-dialog` — does **not** dismiss on backdrop/Escape by default, forcing an explicit choice.

## Import

```ts
import { NexaAlertDialogComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-alert-dialog
  [(open)]="confirmOpen"
  title="Delete project?"
  description="This permanently deletes the project and cannot be undone."
  confirmText="Delete"
  [loading]="deleting()"
  (confirmed)="delete()"
  (cancelled)="toast('Cancelled')"
/>
```

Async flow: keep the dialog open while `loading`, close it in your success handler.

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `model<boolean>` | `false` | Two-way open state |
| `title` / `description` | `string` | — | Header text |
| `confirmText` / `cancelText` | `string` | `'Confirm'/'Cancel'` | Button labels |
| `tone` | `'destructive' \| 'default'` | `'destructive'` | Confirm button tone |
| `loading` | `boolean` | `false` | Busy confirm button |
| `dismissible` | `boolean` | `false` | Allow Escape dismissal |
| `hideDefaultFooter` | `boolean` | `false` | Replace footer via `[slot=footer]` |
| `id` / `extraClass` | `string` | auto/`''` | Id prefix / panel classes |

| Output | Description |
|---|---|
| `confirmed` | User clicked confirm (dialog stays open — you close it) |
| `cancelled` | User cancelled (dialog auto-closes) |

## Accessibility

`alertdialog` is announced assertively. Keep the title a clear question and the confirm label specific ("Delete project", not "OK").
