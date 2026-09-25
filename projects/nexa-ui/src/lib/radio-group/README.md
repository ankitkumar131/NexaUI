# NexaRadioGroup

Single-choice option group. Native radios share one `name`, so arrow-key navigation and form semantics work out of the box.

## Import

```ts
import { NexaRadioGroupComponent } from 'nexa-ui';
```

## Usage

```ts
plans = [
  { value: 'free', label: 'Free', description: 'For side projects' },
  { value: 'pro', label: 'Pro', description: 'For growing teams' },
];
plan = signal('free');
```

```html
<nexa-radio-group [options]="plans" [(value)]="plan" ariaLabel="Choose a plan" />
<nexa-radio-group [options]="plans" formControlName="plan" orientation="horizontal" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `options` | `NexaRadioOption[]` | `[]` | `{ value, label, description?, disabled? }` |
| `value` | `model<string \| undefined>` | — | Two-way selected value |
| `name` | `string` | auto | Radio group name |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout |
| `disabled` / `invalid` | `boolean` | `false` | States |
| `ariaLabel` | `string` | — | Accessible group label |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

`role="radiogroup"` + native arrow-key support. Always provide `ariaLabel` (or wrap in `nexa-field` with a label).
