# NexaInputGroup

Prefix/suffix adornments (currency, units, icons, buttons) joined seamlessly around an input.

## Import

```ts
import { NexaInputGroupComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-input-group>
  <span slot="prefix">$</span>
  <nexa-input [borderless]="true" placeholder="0.00" ariaLabel="Amount" />
  <span slot="suffix">USD</span>
</nexa-input-group>

<nexa-input-group size="sm">
  <span slot="prefix">https://</span>
  <nexa-input [borderless]="true" placeholder="example.com" />
</nexa-input-group>
```

Slots: `[slot=prefix]` and `[slot=suffix]`; the default slot holds the control.

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm'\|'default'\|'lg'` | `'default'` | Height preset |
| `invalid` / `disabled` | `boolean` | `false` | States |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

The group is visual only — the inner control keeps its own label. Always give the inner input an `ariaLabel` or `id` + `nexa-label`.
