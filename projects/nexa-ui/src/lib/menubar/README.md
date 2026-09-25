# NexaMenubar

Desktop-style menu bar (File · Edit · View) with hover-switching and full keyboard support.

## Import

```ts
import { NexaMenubarComponent } from 'nexa-ui';
```

## Usage

```ts
menus = [
  { label: 'File', items: [
    { label: 'New', hint: '⌘N' },
    { label: 'Open…', hint: '⌘O' },
    { label: 'Delete', destructive: true, separatorBefore: true },
  ]},
  { label: 'Edit', items: [{ label: 'Undo', hint: '⌘Z' }, { label: 'Redo', hint: '⇧⌘Z' }] },
];
```

```html
<nexa-menubar [menus]="menus" (selected)="onCommand($event)" />
<!-- $event: { menu: 'File', item: NexaMenuItem } -->
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `menus` | `NexaMenubarMenu[]` | `[]` | `{ label, items: NexaMenuItem[] }` (shared with dropdown menu) |
| `ariaLabel` | `string` | `'Application menu'` | Bar label |
| `extraClass` | `string` | `''` | Extra host classes |

| Output | Payload | Description |
|---|---|---|
| `selected` | `{ menu, item }` | Emitted on choice |

## Keyboard

`Enter/↓` open · `←/→` switch menus · `↑/↓` move · `Enter` choose · `Esc` close. Hover switches menus while one is open (native app behavior).
