# NexaSkeleton

Shimmering content placeholder. Compose several to mirror the loading layout (avatar + text lines, card grids).

## Import

```ts
import { NexaSkeletonComponent } from 'nexa-ui';
```

## Usage

```html
<div aria-busy="true" aria-label="Loading profile">
  <div style="display:flex; gap:.75rem; align-items:center">
    <nexa-skeleton shape="circle" width="2.75rem" height="2.75rem" />
    <div style="flex:1; display:grid; gap:.4rem">
      <nexa-skeleton width="40%" height=".9rem" />
      <nexa-skeleton width="85%" height=".9rem" />
    </div>
  </div>
</div>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `width` / `height` | `string` | `'100%' / '1rem'` | Box size (any CSS length) |
| `shape` | `'rounded' \| 'circle' \| 'square'` | `'rounded'` | Corner style |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

Skeletons are `aria-hidden` — put `aria-busy="true"` + a label on the loading region instead. Shimmer pauses under `prefers-reduced-motion` (global token rule).
