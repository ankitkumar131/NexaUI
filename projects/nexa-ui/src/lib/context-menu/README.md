# NexaContextMenu

Right-click menu for any wrapped area, positioned at the cursor with viewport clamping.

## Import

```ts
import { NexaContextMenuComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-context-menu [items]="fileActions" (selected)="onFileAction($event)" ariaLabel="File actions">
  <div class="file-row">📄 report.pdf</div>
</nexa-context-menu>
```

Items share the `NexaMenuItem` shape from `nexa-dropdown-menu` (`label, value?, hint?, disabled?, destructive?, separatorBefore?`).

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `items` | `NexaMenuItem[]` | `[]` | Menu items |
| `open` | `model<boolean>` | `false` | Two-way open state |
| `ariaLabel` | `string` | — | Menu label |
| `disabled` | `boolean` | `false` | Disable the menu |
| `extraClass` | `string` | `''` | Extra host classes |

| Output | Payload | Description |
|---|---|---|
| `selected` | `NexaMenuItem` | Emitted on choice |

## Behavior & accessibility

- Opens on `contextmenu` (right-click), closes on click-away, scroll or Escape. Keyboard: `↓/↑` move, `Enter` choose.
- Touch devices: long-press fires `contextmenu` on most mobile browsers. For critical touch actions ALSO expose a visible `nexa-dropdown-menu` trigger — never rely on right-click alone.
