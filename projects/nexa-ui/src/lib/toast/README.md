# NexaToast (service + NexaToaster)

Imperative floating notifications. Render **one** `<nexa-toaster />` in your app root, then fire toasts from anywhere via the service.

## Import

```ts
import { NexaToasterComponent, NexaToastService } from 'nexa-ui';
```

## Setup (app root)

```html
<router-outlet />
<nexa-toaster position="bottom-right" />
```

## Usage

```ts
private readonly toast = inject(NexaToastService);

save() {
  this.toast.success('Saved', 'Your changes are live.');
  this.toast.error('Failed', 'Could not reach the server.', { duration: 6000 });
  this.toast.info('Tip', 'Stays until dismissed.', { duration: 0 });
}
```

## API

**NexaToastService**

| Method | Description |
|---|---|
| `show({ title?, description?, variant?, duration? })` | Queue a toast, returns id |
| `success / error / warning / info(title, description?, options?)` | Shortcuts |
| `dismiss(id)` / `clear()` | Remove one / all |

`duration` defaults to 4000ms; `0` = sticky.

**nexa-toaster**

| Input | Type | Default | Description |
|---|---|---|---|
| `position` | `'top-*' \| 'bottom-*'` (6 options) | `'bottom-right'` | Screen corner |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

Stack is a labelled `region`; errors use assertive `role="alert"`, others `role="status"`. Every toast has a keyboard-reachable dismiss button. Don't auto-dismiss critical errors quickly — use a long `duration` or sticky.
