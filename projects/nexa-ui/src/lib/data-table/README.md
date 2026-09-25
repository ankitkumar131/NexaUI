# NexaDataTable

Feature-rich table: column sorting, global search, pagination and row selection — composed from `nexa-table`, `nexa-input`, `nexa-checkbox` and `nexa-pagination`.

## Import

```ts
import { NexaDataTableComponent } from 'nexa-ui';
```

## Usage

```ts
cols = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'age', header: 'Age', sortable: true, width: '5rem' },
];
rows = [
  { id: 1, name: 'Ada Lovelace', role: 'Engineer', age: 36 },
  { id: 2, name: 'Grace Hopper', role: 'Admiral', age: 85 },
];
selected = signal<Array<string | number>>([]);
```

```html
<nexa-data-table
  [columns]="cols"
  [data]="rows"
  [selectable]="true"
  [(selectedKeys)]="selected"
  [pageSize]="5"
  caption="Team members"
/>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `columns` | `NexaDataColumn[]` | `[]` | `{ key, header, sortable?, width? }` |
| `data` | `Record<string, unknown>[]` | `[]` | Row objects |
| `rowKey` | `string` | `'id'` | Identity field for selection |
| `selectable` | `boolean` | `false` | Checkbox column |
| `selectedKeys` | `model<Array<string\|number>>` | `[]` | Two-way selection |
| `pageSize` | `number` | `5` | Rows per page (`0` = all) |
| `showSearch` / `searchPlaceholder` | `boolean/string` | `true/'Search…'` | Global filter |
| `emptyText` / `caption` | `string` | — | Empty message / table caption |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

Sort buttons announce direction to screen readers; counts live in `role="status"`; selection uses labelled checkboxes. Cells render plain text — keep them short on mobile (horizontal scroll wrapper included).
