# NexaToggleGroup

Segmented single/multi-select group — text alignment, view density, chart ranges.

## Import

```ts
import { NexaToggleGroupComponent } from 'nexa-ui';
```

## Usage

```ts
align = [
  { value: 'left', label: '⬅' },
  { value: 'center', label: '⬆' },
  { value: 'right', label: '➡' },
];
alignment = signal<string[]>(['center']);
days = signal<string[]>(['mon', 'wed']);
```

```html
<nexa-toggle-group [options]="align" [(values)]="alignment" type="single" ariaLabel="Alignment" />
<nexa-toggle-group [options]="weekdays" [(values)]="days" type="multiple" ariaLabel="Repeat on" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `options` | `NexaToggleOption[]` | `[]` | `{ value, label, disabled? }` |
| `values` | `model<string[]>` | `[]` | Two-way selection (single = max 1) |
| `type` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size |
| `disabled` | `boolean` | `false` | Disable all |
| `ariaLabel` | `string` | — | Group label |
| `extraClass` | `string` | `''` | Extra host classes |

Buttons expose `aria-pressed`; single mode re-pressing clears the selection.
