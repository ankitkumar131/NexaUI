# NexaNavigationMenu

Responsive top navigation with dropdown groups — hamburger menu on mobile, CSS-only dropdowns on desktop.

## Import

```ts
import { NexaNavigationMenuComponent } from 'nexa-ui';
```

## Usage

```ts
nav = [
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs', children: [
    { label: 'Installation', href: '/docs/install', description: 'Get started in minutes' },
    { label: 'Theming', href: '/docs/theme' },
  ]},
  { label: 'Pricing', href: '/pricing' },
];
```

```html
<nexa-navigation-menu [items]="nav" activeHref="/docs" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `items` | `NexaNavItem[]` | `[]` | `{ label, href, children?: { label, href, description? }[] }` |
| `activeHref` | `string` | — | Highlights the current page (`aria-current`) |
| `ariaLabel` | `string` | `'Main navigation'` | Nav label |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility & responsive

- Semantic `nav` + lists; dropdowns open on hover AND keyboard focus (`:focus-within`).
- Under 768px the list collapses behind an `aria-expanded` toggle; submenus render inline.
