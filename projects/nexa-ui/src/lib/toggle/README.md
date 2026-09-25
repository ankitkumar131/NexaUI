# NexaToggle

Two-state press button for toolbar actions (bold, italic, mute, pin) with `aria-pressed` semantics.

## Import

```ts
import { NexaToggleComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-toggle [(pressed)]="bold" ariaLabel="Bold"><strong>B</strong></nexa-toggle>
<nexa-toggle [(pressed)]="italic" ariaLabel="Italic" variant="outline"><em>I</em></nexa-toggle>
<nexa-toggle [pressed]="true" [disabled]="true" ariaLabel="Locked">🔒</nexa-toggle>
```

For grouped exclusive/multi selection see `nexa-toggle-group`.

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `pressed` | `model<boolean>` | `false` | Two-way pressed state |
| `variant` | `'default' \| 'outline'` | `'default'` | Style |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size |
| `disabled` | `boolean` | `false` | Disabled |
| `ariaLabel` | `string` | — | Label (required for icon-only) |
| `extraClass` | `string` | `''` | Extra classes |

## Toggle vs Switch vs Checkbox

- `nexa-toggle`: instant toolbar action state (formatting, mute).
- `nexa-switch`: on/off setting with immediate effect.
- `nexa-checkbox`: option inside a form to be submitted.
