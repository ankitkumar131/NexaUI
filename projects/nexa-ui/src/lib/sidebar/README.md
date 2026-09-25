# NexaSidebar

Responsive app sidebar — persistent panel on desktop (≥1024px), slide-in drawer with backdrop on mobile.

## Import

```ts
import { NexaSidebarComponent } from 'nexa-ui';
```

## Usage

```html
<!-- mobile toggle (hide on desktop with CSS) -->
<nexa-button class="only-mobile" (pressed)="nav.set(true)">☰ Menu</nexa-button>

<div class="app-shell">
  <nexa-sidebar [(open)]="nav" title="Acme Inc">
    <a href="/">🏠 Dashboard</a>
    <a href="/projects">📁 Projects</a>
    <a href="/settings">⚙ Settings</a>
  </nexa-sidebar>
  <main>…page content…</main>
</div>
```

```css
.app-shell { display: grid; grid-template-columns: auto 1fr; gap: 1rem; }
@media (max-width: 1023px) { .app-shell { grid-template-columns: 1fr; } }
@media (min-width: 1024px) { .only-mobile { display: none; } }
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `model<boolean>` | `false` | Mobile drawer visibility (desktop ignores it) |
| `title` | `string` | `''` | Header title |
| `side` | `'left' \| 'right'` | `'left'` | Drawer edge |
| `width` | `string` | `'17rem'` | Panel width |
| `ariaLabel` | `string` | `'Sidebar navigation'` | Aside label |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

`aside` + inner `nav`; Escape/backdrop close on mobile. Projected links get hover styling automatically.

## Theming

`--nexa-sidebar-background`, `--nexa-sidebar-foreground`, `--nexa-sidebar-border`.
