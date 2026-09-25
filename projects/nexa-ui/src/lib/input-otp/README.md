# NexaInputOtp

Segmented verification-code input with auto-advance, smart backspace, arrow/Home/End navigation and paste-to-fill.

## Import

```ts
import { NexaInputOtpComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-input-otp [(value)]="code" [length]="6" ariaLabel="Verification code" />
<nexa-input-otp formControlName="otp" [length]="4" [invalid]="otpCtrl.invalid" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `model<string>` | `''` | Two-way joined code |
| `length` | `number` | `6` | Number of boxes |
| `disabled` / `invalid` | `boolean` | `false` | States |
| `ariaLabel` | `string` | `'One-time code'` | Group label |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

`role="group"` with per-box `Digit N of M` labels; first box opts into `autocomplete="one-time-code"` for SMS autofill. On mobile the numeric keypad appears via `inputmode`.

## Responsive

Boxes shrink automatically under 420px viewports.
