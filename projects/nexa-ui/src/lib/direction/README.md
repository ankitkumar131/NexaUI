# Direction (service + directive)

Global and scoped LTR/RTL control. Every Nexa component uses logical CSS properties (`inline-start`, `margin-inline-…`), so the whole library mirrors automatically.

## Import

```ts
import { NexaDirectionService, NexaDirDirective } from 'nexa-ui';
```

## Global direction

```ts
private readonly dir = inject(NexaDirectionService);
this.dir.setDir('rtl');
this.dir.toggle();
dir(); // 'ltr' | 'rtl' signal
```

Sets `dir` on `<html>` (SSR-safe) and persists to `localStorage`.

## Scoped override

```html
<div nexaDir="rtl">
  <p>محتوى عربي داخل صفحة إنجليزية.</p>
  <nexa-button>زر</nexa-button>
</div>
```

## API

**NexaDirectionService**: `dir()` signal · `setDir('ltr'|'rtl')` · `toggle()`.

**nexaDir directive**: `[nexaDir]="'ltr' | 'rtl'"` sets the host's `dir` attribute.

## Testing RTL

Toggle the direction and verify: navigation order, drawer/sheet edges, carousel arrows, chart legends and form alignment all mirror. Logical properties do the work — never hard-code `left`/`right` in custom CSS alongside Nexa.
