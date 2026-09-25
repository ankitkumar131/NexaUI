# NexaKbd

Keyboard-shortcut hint rendered with a native `<kbd>` element.

## Import

```ts
import { NexaKbdComponent } from 'nexa-ui';
```

## Usage

```html
<p>Press <nexa-kbd>Ctrl</nexa-kbd> + <nexa-kbd>K</nexa-kbd> to search</p>
<nexa-kbd size="sm">Esc</nexa-kbd>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'default'` | `'default'` | Size preset |
| `extraClass` | `string` | `''` | Extra classes |

## Accessibility

- Semantic `<kbd>` is announced correctly by screen readers. In menus, pair with `aria-keyshortcuts` on the menu item when the shortcut is actionable.
