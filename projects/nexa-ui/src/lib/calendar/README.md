# NexaCalendar

Locale-aware month picker with full keyboard navigation. Used standalone or inside `nexa-date-picker`.

## Import

```ts
import { NexaCalendarComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-calendar [(value)]="date" />
<nexa-calendar [(value)]="date" locale="en-GB" [weekStartsOn]="1" [min]="minDate" [max]="maxDate" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `model<Date \| null>` | `null` | Two-way selected date |
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
