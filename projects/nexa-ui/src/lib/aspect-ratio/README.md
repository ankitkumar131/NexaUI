# NexaAspectRatio

Keeps images, videos and maps at a fixed ratio across every viewport using native CSS `aspect-ratio`.

## Import

```ts
import { NexaAspectRatioComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-aspect-ratio ratio="16 / 9">
  <img src="cover.jpg" alt="Cover photo" />
</nexa-aspect-ratio>

<nexa-aspect-ratio [ratio]="1"> <!-- square -->
  <img src="avatar.jpg" alt="Profile" />
</nexa-aspect-ratio>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `ratio` | `string \| number` | `'16 / 9'` | CSS ratio (`"4 / 3"`, `1`, …) |
| `fillContent` | `boolean` | `true` | Absolutely fill a single projected child (`object-fit: cover`) |
| `extraClass` | `string` | `''` | Extra host classes |

## Tips

- Project a **single** child for best results; set `[fillContent]="false"` and style children yourself for multi-child overlays (e.g. captions over images).
- Fully responsive — the box always spans its container width.
