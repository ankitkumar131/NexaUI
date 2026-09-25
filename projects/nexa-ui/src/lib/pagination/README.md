# NexaPagination

Page navigation with smart ellipsis windows, built on `nexa-button` for consistent styling.

## Import

```ts
import { NexaPaginationComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-pagination [(page)]="page" [totalPages]="20" />
<nexa-pagination [(page)]="page" [totalPages]="50" [siblingCount]="2" [showFirstLast]="true" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `page` | `model<number>` | `1` | Two-way current page (auto-clamped) |
| `totalPages` | `number` | `1` | Total pages |
| `siblingCount` | `number` | `1` | Neighbors shown around current |
| `showPrevNext` / `showFirstLast` | `boolean` | `true/false` | Edge controls |
| `ariaLabel` | `string` | `'Pagination'` | Nav label |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

`nav[aria-label]` + `aria-current="page"` on the active number; prev/next/first/last expose text labels to AT while showing compact glyphs.
