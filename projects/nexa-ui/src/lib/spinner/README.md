# NexaSpinner

Accessible loading ring for buttons, pages and async regions.

## Import

```ts
import { NexaSpinnerComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-spinner />
<nexa-spinner size="lg" label="Loading dashboard" [showLabel]="true" />

<!-- async region pattern -->
<div [attr.aria-busy]="loading()">
  @if (loading()) { <nexa-spinner label="Loading users" /> }
  @else { <user-list /> }
</div>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `size` | `'xs'\|'sm'\|'default'\|'lg'\|'xl'` | `'default'` | Ring size |
| `label` | `string` | `'Loading'` | SR announcement / visible label |
| `showLabel` | `boolean` | `false` | Show the label visibly |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

`role="status"` announces politely. Set `aria-busy` on the loading region and keep one spinner per region (multiple spinners = noisy SR output).
