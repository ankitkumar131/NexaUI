# NexaAlert

Inline status message — form notices, page banners, result summaries. For transient floating notices use the toast system.

## Import

```ts
import { NexaAlertComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-alert variant="info" title="Heads up">Deploy starts in 10 minutes.</nexa-alert>
<nexa-alert variant="success">Profile saved.</nexa-alert>
<nexa-alert variant="warning" [dismissible]="true" (dismissed)="hide()">Storage is 90% full.</nexa-alert>
<nexa-alert variant="destructive" icon="🔥">Custom icon override.</nexa-alert>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default'\|'destructive'\|'success'\|'warning'\|'info'` | `'default'` | Tone |
| `title` | `string` | `''` | Bold heading line |
| `icon` | `string` | auto | Glyph override (`''` hides it) |
| `dismissible` | `boolean` | `false` | Show ✕ (you remove it on `dismissed`) |
| `extraClass` | `string` | `''` | Extra host classes |

| Output | Description |
|---|---|
| `dismissed` | ✕ clicked (parent controls visibility, e.g. `@if`) |

## Accessibility

`role="alert"` for destructive (assertive), `role="status"` otherwise. Icons are `aria-hidden` — meaning always lives in text.
