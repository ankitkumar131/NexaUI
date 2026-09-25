# NexaNativeSelect

Styled native `<select>` — zero-JS dropdown with platform pickers on mobile, full keyboard support and forms integration.

## Import

```ts
import { NexaNativeSelectComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-native-select [options]="countries" [(value)]="country" placeholder="Choose country" />
<nexa-native-select formControlName="size">
  <option value="s">Small</option>
  <option value="m">Medium</option>
</nexa-native-select>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `options` | `NexaNativeSelectOption[]` | `[]` | Declarative options (or project `<option>`) |
| `value` | `model<string \| undefined>` | — | Two-way value |
| `placeholder` | `string` | — | Disabled prompt option |
| `disabled` / `required` / `invalid` | `boolean` | `false` | States |
| `ariaLabel` / `id` / `name` | `string` | auto | Attributes |
| `extraClass` | `string` | `''` | Extra host classes |

## When to use which

- `nexa-native-select`: long lists, mobile-first, max compatibility.
- `nexa-select`: custom styling, disabled options with rich states, consistent desktop UX.
