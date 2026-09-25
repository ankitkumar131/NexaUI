# NexaCommand

⌘K command palette: fuzzy-ish search, grouped results and full keyboard control in a modal panel.

## Import

```ts
import { NexaCommandComponent } from 'nexa-ui';
```

## Usage

```ts
commands = [
  { label: 'Go to Dashboard', hint: '⌘D', group: 'Navigate' },
  { label: 'Create project', hint: '⌘N', group: 'Actions' },
  { label: 'Toggle theme', group: 'Actions' },
];
cmdOpen = signal(false);
```

```html
<nexa-button (pressed)="cmdOpen.set(true)">Open commands <nexa-kbd>⌘K</nexa-kbd></nexa-button>
<nexa-command [(open)]="cmdOpen" [items]="commands" (selected)="run($event)" />

@HostListener('document:keydown', ['$event']) // optional global ⌘K:
```

Global shortcut: add your own `keydown` listener for `meta+k`/`ctrl+k` → `cmdOpen.set(true)` (5 lines, your app owns the binding).

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `model<boolean>` | `false` | Two-way open state |
| `items` | `NexaCommandItem[]` | `[]` | `{ label, value?, hint?, group?, disabled? }` |
| `placeholder` / `emptyText` | `string` | — | Search prompt / no-results text |
| `ariaLabel` | `string` | `'Command menu'` | Dialog label |
| `extraClass` | `string` | `''` | Extra host classes |

| Output | Payload | Description |
|---|---|---|
| `selected` | `NexaCommandItem` | Emitted on choice (auto-closes) |

## Keyboard & a11y

`↓/↑` move · `Enter` run · `Esc` close. `combobox` + `listbox` roles, autofocused input, scroll-locked backdrop, capped at `38rem` for mobile.
