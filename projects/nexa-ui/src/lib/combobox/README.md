# NexaCombobox

Searchable select: type to filter, arrows + Enter to choose, ✕ to clear. Full forms support.

## Import

```ts
import { NexaComboboxComponent } from 'nexa-ui';
```

## Usage

```ts
frameworks = [
  { value: 'angular', label: 'Angular', hint: 'v22' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue', disabled: true },
];
fw = signal<string | undefined>('angular');
```

```html
<nexa-combobox [options]="frameworks" [(value)]="fw" placeholder="Pick a framework…" />
<nexa-combobox [options]="frameworks" formControlName="fw" ariaLabel="Framework" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `options` | `NexaComboboxOption[]` | `[]` | `{ value, label, hint?, disabled? }` |
| `value` | `model<string \| undefined>` | — | Two-way selection |
| `open` | `model<boolean>` | `false` | Two-way open state |
| `placeholder` / `emptyText` | `string` | — | Prompt / no-results text |
| `disabled` / `invalid` | `boolean` | `false` | States |
| `ariaLabel` / `id` | `string` | auto | Attributes |
| `extraClass` | `string` | `''` | Extra host classes |

## Keyboard & a11y

`combobox` + `listbox` roles; `↓/↑` move · `Enter` choose · `Esc` close. Filtering matches label and value. Prefer `nexa-select` when the list is short (< 8 items) and needs no search.
