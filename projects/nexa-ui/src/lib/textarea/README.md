# NexaTextarea

Multi-line text field with Angular Forms support and `[(value)]` binding.

## Import

```ts
import { NexaTextareaComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-textarea [(value)]="bio" [rows]="4" placeholder="Tell us about yourself" />
<nexa-textarea formControlName="notes" resize="none" [invalid]="notesCtrl.invalid" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `model<string>` | `''` | Two-way value |
| `placeholder` | `string` | `''` | Placeholder |
| `rows` | `number` | `3` | Visible rows |
| `resize` | `'none'\|'vertical'\|'both'` | `'vertical'` | Resize handle |
| `disabled` / `readonly` / `required` | `boolean` | `false` | Native states |
| `invalid` | `boolean` | `false` | Error styling + `aria-invalid` |
| `id` / `name` | `string` | auto-id | Native attributes |
| `extraClass` | `string` | `''` | Extra classes |

## Accessibility

Native `<textarea>` semantics; pair with `<nexa-label for>` and surface errors via `nexa-field`.
