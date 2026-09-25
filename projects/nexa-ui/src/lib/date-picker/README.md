# NexaDatePicker

Text input + calendar popover with full forms support. Composes `nexa-input`, `nexa-popover` and `nexa-calendar` — the composition story in one component.

## Import

```ts
import { NexaDatePickerComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-date-picker [(value)]="birthday" locale="en-GB" />
<nexa-date-picker formControlName="start" [min]="today" [invalid]="startCtrl.invalid" />
```

Type a date (any `Date`-parseable text) + blur/Enter to commit, or pick from the calendar. Invalid entries revert to the last valid value.

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `model<Date \| null>` | `null` | Two-way date |
| `locale` | `string` | `'en-US'` | Display format + calendar locale |
| `weekStartsOn` | `number` | `0` | Calendar first column |
| `min` / `max` | `Date \| string` | — | Selectable range (both entry + calendar) |
| `placeholder` | `string` | `'Pick a date'` | Input prompt |
| `disabled` / `invalid` | `boolean` | `false` | States |
| `id` / `ariaLabel` | `string` | auto/`'Date'` | Input association |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

Plain-text input keeps dates operable for screen-reader and keyboard users without any calendar interaction; the calendar is progressive enhancement with its own keyboard map.
