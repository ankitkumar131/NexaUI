# NexaAvatar

User or organization picture with automatic initials fallback and broken-image recovery.

## Import

```ts
import { NexaAvatarComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-avatar src="/avatars/ada.png" name="Ada Lovelace" />
<nexa-avatar name="Grace Hopper" size="lg" shape="rounded" />
<nexa-avatar [diameter]="64">AL</nexa-avatar>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL; omitted/broken → fallback |
| `alt` | `string` | `''` | Image alt (defaults to `name`) |
| `name` | `string` | `''` | Used for initials + screen-reader text |
| `size` | `'xs'\|'sm'\|'md'\|'lg'\|'xl'` | `'md'` | Size preset |
| `shape` | `'circle'\|'rounded'\|'square'` | `'circle'` | Corner style |
| `diameter` | `number` | — | Exact pixel size override |
| `extraClass` | `string` | `''` | Extra host classes |

Projected content replaces the auto initials: `<nexa-avatar>AL</nexa-avatar>`.

## Accessibility

- Decorative fallback is `aria-hidden`; the `name` is exposed to screen readers via visually-hidden text. Always pass `name` or `alt`.

## Theming

`--nexa-avatar-bg`, `--nexa-avatar-fg` (+ global border/muted tokens).

## Customization

```html
<nexa-avatar name="Ada Lovelace" style="--nexa-avatar-bg: #4f46e5; --nexa-avatar-fg: white" />
```
