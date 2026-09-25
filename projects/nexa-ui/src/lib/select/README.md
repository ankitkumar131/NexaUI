# NexaSelect

Custom dropdown with listbox semantics, keyboard navigation and forms support. For a lightweight native alternative see `nexa-native-select`.

## Import

```ts
import { NexaSelectComponent } from 'nexa-ui';
```

## Usage

```ts
fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'mango', label: 'Mango', disabled: true },
];
fruit = signal<string | undefined>('apple');
```

```html
<nexa-select [options]="fruits" [(value)]="fruit" placeholder="Pick a fruit" />
<nexa-select [options]="fruits" formControlName="fruit" ariaLabel="Fruit" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `options` | `NexaSelectOption[]` | `[]` | `{ value, label, disabled? }` |
| `value` | `model<string \| undefined>` | — | Two-way selected value |
| `placeholder` | `string` | `'Select an option'` | Empty-state text |
| `disabled` / `invalid` | `boolean` | `false` | States |
| `ariaLabel` | `string` | — | Accessible label |
| `id` | `string` | auto | Id prefix for options |
| `extraClass` | `string` | `''` | Extra host classes |

## Keyboard

- `↓/↑` open + move, `Enter` select, `Esc` close, `Tab` close. Hover syncs the active option.

## Accessibility

`button[aria-haspopup=listbox][aria-expanded]` + `listbox`/`option` roles with `aria-selected`. Click-outside closes.

## Theming

Trigger uses input tokens; the floating list uses popover tokens + `--nexa-z-dropdown`.
