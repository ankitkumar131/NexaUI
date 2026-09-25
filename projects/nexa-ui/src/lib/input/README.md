# NexaInput

Text field with full Angular Forms support (Reactive + Template-driven) and two-way `[(value)]` binding.

## Import

```ts
import { NexaInputComponent } from 'nexa-ui';
```

## Usage

```html
<!-- standalone two-way -->
<nexa-input [(value)]="name" placeholder="Your name" />

<!-- reactive forms -->
<nexa-input formControlName="email" type="email" [invalid]="emailCtrl.invalid && emailCtrl.touched" />

<!-- sizes / states -->
<nexa-input size="sm" placeholder="Small" />
<nexa-input [disabled]="true" value="Disabled" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `'text'` | Native input type |
| `value` | `model<string>` | `''` | Two-way value (`[(value)]`) |
| `placeholder` | `string` | `''` | Placeholder text |
| `disabled` / `readonly` / `required` | `boolean` | `false` | Native states |
| `invalid` | `boolean` | `false` | Error styling + `aria-invalid` |
| `size` | `'sm'\|'default'\|'lg'` | `'default'` | Height preset |
| `borderless` | `boolean` | `false` | For `nexa-input-group` embedding |
| `id` / `name` / `autocomplete` | `string` | auto-id | Native attributes |
| `extraClass` | `string` | `''` | Extra classes |

## Accessibility

- Native `<input>` semantics. Pair with `<nexa-label for="…">` using the same `id`.
- `invalid` sets `aria-invalid`; announce errors with `nexa-field` or `role="alert"`.

## Customization

```html
<nexa-input extraClass="my-input" style="--nexa-input: #c4b5fd" />
```
Height, radius and colors all derive from `--nexa-*` tokens.
