# NexaTable family

Lightweight semantic tables via ATTRIBUTE components — valid HTML and real screen-reader table semantics (custom elements would break both).

## Import

```ts
import {
  NexaTableComponent, NexaTableHeaderComponent, NexaTableBodyComponent,
  NexaTableFooterComponent, NexaTableRowComponent,
  NexaTableHeadComponent, NexaTableCellComponent,
} from 'nexa-ui';
```

## Usage

```html
<div class="nexa-table-scroll">
  <table nexa-table [striped]="true">
    <caption>Team members — Q3</caption>
    <thead nexa-table-header>
      <tr nexa-table-row>
        <th nexa-table-head>Name</th>
        <th nexa-table-head>Role</th>
      </tr>
    </thead>
    <tbody nexa-table-body>
      <tr nexa-table-row>
        <td nexa-table-cell>Ada Lovelace</td>
        <td nexa-table-cell>Engineer</td>
      </tr>
    </tbody>
    <tfoot nexa-table-footer>
      <tr nexa-table-row><td nexa-table-cell>Total</td><td nexa-table-cell>1</td></tr>
    </tfoot>
  </table>
</div>
```

## API (`table nexa-table`)

| Input | Type | Default | Description |
|---|---|---|---|
| `striped` / `hoverable` | `boolean` | `false/true` | Zebra rows / hover highlight |
| `stickyHeader` | `boolean` | `false` | Sticky `thead` inside scroll containers |
| `compact` | `boolean` | `false` | Tighter padding |
| `extraClass` | `string` | `''` | Extra table classes |

`th nexa-table-head` accepts `scope` (default `'col'`).

## Responsive

Wrap in `.nexa-table-scroll` (provided) for horizontal overflow on narrow screens. For sorting/filtering/pagination/selection see `nexa-data-table`, which composes this family.
