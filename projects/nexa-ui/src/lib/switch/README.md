# NexaSwitch

On/off toggle built on a native checkbox with `role="switch"`.

## Import

```ts
import { NexaSwitchComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-switch [(checked)]="notifications">Enable notifications</nexa-switch>
<nexa-switch formControlName="darkMode" size="sm" ariaLabel="Dark mode" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `checked` | `model<boolean>` | `false` | Two-way state |
| `disabled` / `required` | `boolean` | `false` | Native states |
| `invalid` | `boolean` | `false` | Error styling |
| `size` | `'sm' \| 'default'` | `'default'` | Size preset |
| `id` / `name` / `ariaLabel` | `string` | auto | Attributes |
| `extraClass` | `string` | `''` | Extra host classes |

Projected content becomes the visible label.

## Accessibility

`role="switch"` announces on/off correctly; keyboard via Space. Use for instant-effect settings (not for form submission choices — prefer checkbox there).

## Theming

`--nexa-switch-track-off`, `--nexa-switch-track-on` (+ global tokens).
