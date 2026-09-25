# NexaCalendar

Locale-aware month picker with full keyboard navigation, single/range selection and month/year jump selects. Used standalone or inside `nexa-date-picker`.

## Import

```ts
import { NexaCalendarComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-calendar [(value)]="date" />
<nexa-calendar [(value)]="date" locale="en-GB" [weekStartsOn]="1" [min]="minDate" [max]="maxDate" />
<nexa-calendar mode="range" [(value)]="from" [(rangeEnd)]="to" ariaLabel="Trip dates" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `model<Date \| null>` | `null` | Two-way selected date (range start in `range` mode) |
| `mode` | `'single' \| 'range'` | `'single'` | Selection mode |
| `rangeEnd` | `model<Date \| null>` | `null` | Range end (`null` while still picking) |
| `locale` | `string` | `'en-US'` | Month/weekday names + full labels via `Intl` |
| `weekStartsOn` | `number` | `0` | First column (0=Sun … 6=Sat) |
| `min` / `max` | `Date \| string` | — | Selectable range |
| `disabled` | `boolean` | `false` | Disabled state |
| `ariaLabel` | `string` | `'Choose a date'` | Group label |
| `extraClass` | `string` | `''` | Extra host classes |

## Keyboard

Arrows move a day/week · Home/End month edges · PgUp/PgDn month (Shift = year) · Enter/Space select (native button). Roving `tabindex` keeps one tab stop; days expose full-date `aria-label`s.

## Localization

Never hard-codes month/weekday names — everything flows through `Intl` with your `locale`. First-day-of-week is explicit (`weekStartsOn`) so behavior is predictable across browsers.

## Range selection

In `range` mode the first click sets the start (`value`), the second sets the end (`rangeEnd`) — clicking an earlier day swaps them automatically, and clicking a third day restarts the range. Endpoints render as pills with a connecting band; screen-reader labels announce "range start / end / in selected range".

## Month & year selects

The header carries localized month/year `<select>`s (year list spans ±60 years, clamped to `min`/`max` when set), so users can jump decades without arrow-clicking. Month changes play a short directional slide (disabled under `prefers-reduced-motion`).
