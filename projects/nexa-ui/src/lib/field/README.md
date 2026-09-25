# NexaField

Vertical form-field composition: label + control + description/error message with consistent spacing.

## Import

```ts
import { NexaFieldComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-field label="Email" controlId="signup-email" description="We never share your email." [required]="true">
  <nexa-input id="signup-email" type="email" [(value)]="email" />
</nexa-field>

<nexa-field label="Bio" controlId="bio" [error]="bioError()">
  <nexa-textarea id="bio" [(value)]="bio" [invalid]="!!bioError()" />
</nexa-field>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `''` | Label text (omit for custom label projection) |
| `controlId` | `string` | auto | Must match the inner control's `id` |
| `description` | `string` | — | Helper text (hidden when `error` shows) |
| `error` | `string` | — | Error text with `role="alert"` |
| `required` | `boolean` | `false` | Required marker on the label |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

- Native `<label for>` association when ids match.
- Errors use `role="alert"` so they are announced immediately.
