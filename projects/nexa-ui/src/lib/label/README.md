# NexaLabel

Accessible form label. Always associate it with a control via `for` + matching control `id`.

## Import

```ts
import { NexaLabelComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-label for="email" [required]="true">Email</nexa-label>
<nexa-input id="email" type="email" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `for` | `string` | — | Id of the labelled control |
| `required` | `boolean` | `false` | Shows `*` + announces "(required)" |
| `disabled` | `boolean` | `false` | Dimmed, non-interactive styling |
| `extraClass` | `string` | `''` | Extra classes |

## Accessibility

- Uses a native `<label>` so clicking focuses the control.
- Required state adds visually-hidden "(required)" text for screen readers — don't rely on `*` color alone.
