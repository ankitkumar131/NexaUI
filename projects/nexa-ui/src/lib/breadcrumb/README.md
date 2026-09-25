# NexaBreadcrumb

Orientation trail (`nav > ol`) with truncation and optional middle collapsing for deep hierarchies.

## Import

```ts
import { NexaBreadcrumbComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-breadcrumb [items]="[
  { label: 'Home', href: '/' },
  { label: 'Library', href: '/lib' },
  { label: 'Button' }
]" />

<nexa-breadcrumb [items]="deepTrail" [maxItems]="4" separator="›" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `items` | `NexaBreadcrumbItem[]` | `[]` | `{ label, href? }` (last = current page) |
| `separator` | `string` | `'/'` | Visual separator (aria-hidden) |
| `maxItems` | `number` | `0` | Collapse middle when longer (`0` = never) |
| `ariaLabel` | `string` | `'Breadcrumb'` | Nav label |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

Semantic `nav[aria-label]` + `aria-current="page"` on the last item. Separators are `aria-hidden`. For router apps, swap `<a href>` by composing your own links? No — items accept `href`; for `routerLink` wrap: breadcrumbs are simple enough to rebuild with the same CSS classes if you need router directives.
