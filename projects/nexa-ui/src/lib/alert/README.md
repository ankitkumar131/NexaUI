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
<nexa-alert size="sm" variant="info">Compact notice.</nexa-alert>
<nexa-alert size="lg" variant="success" title="Deployed">Roomy page-level banner.</nexa-alert>
@if (showTip()) {
  <nexa-alert variant="info" [duration]="5000" [dismissible]="true" (dismissed)="showTip.set(false)">
    Auto-dismisses after 5s — hovering pauses the countdown.
  </nexa-alert>
}
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default'\|'destructive'\|'success'\|'warning'\|'info'` | `'default'` | Tone |
| `size` | `'sm'\|'default'\|'lg'` | `'default'` | Density preset |
| `title` | `string` | `''` | Bold heading line |
| `icon` | `string` | auto | Glyph override (`''` hides it) |
| `dismissible` | `boolean` | `false` | Show ✕ (you remove it on `dismissed`) |
| `duration` | `number` | `0` | Auto-dismiss after ms (`0` = sticky). Countdown bar + pause on hover/focus |
| `extraClass` | `string` | `''` | Extra host classes |

| Output | Description |
|---|---|
| `dismissed` | Close clicked or `duration` elapsed — emitted **after** the exit animation, so `@if` removal never cuts it off |

## Accessibility

`role="alert"` for destructive (assertive), `role="status"` otherwise. Icons are `aria-hidden` — meaning always lives in text.

## Auto-dismiss

Set `duration` (e.g. `5000`) to auto-dismiss. A countdown bar shows remaining time; hovering **or focusing** the alert (keyboard users tabbing to ✕) pauses both the bar and the timer. Dismissal plays a 240ms exit animation first, then emits `dismissed` — remove it with `@if`.

## Customizing

Sizes via `size`; motion via `--nexa-alert-enter-duration` (default `280ms`) and `--nexa-alert-leave-duration` (default `240ms`). The emit delay reads `--nexa-alert-leave-duration` at runtime, so custom durations stay in sync.
