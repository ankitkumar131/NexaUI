# NexaCheckbox

Boolean option with a custom styled box over a native checkbox (keyboard + screen-reader support free).

## Import

```ts
import { NexaCheckboxComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-checkbox [(checked)]="agree">I agree to the terms</nexa-checkbox>
<nexa-checkbox formControlName="newsletter">Subscribe to newsletter</nexa-checkbox>
<nexa-checkbox [indeterminate]="someSelected()" (checkedChange)="toggleAll($event)">Select all</nexa-checkbox>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `checked` | `model<boolean>` | `false` | Two-way checked state |
| `indeterminate` | `boolean` | `false` | Mixed/dash visual |
| `disabled` / `required` | `boolean` | `false` | Native states |
| `invalid` | `boolean` | `false` | Error styling |
| `id` / `name` / `ariaLabel` | `string` | auto | Native/a11y attributes |
| `extraClass` | `string` | `''` | Extra host classes |

Label text is projected: `<nexa-checkbox>…label…</nexa-checkbox>`.

## Accessibility

Native checkbox keeps Space toggling, focus ring and AT announcements. For label-less boxes pass `ariaLabel`.
