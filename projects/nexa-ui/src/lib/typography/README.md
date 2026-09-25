# NexaTypography

Semantic text with a fluid, responsive type scale. Renders the correct HTML tag per variant (`h1`–`h4`, `p`, `blockquote`, `code`, `ul`).

## Import

```ts
import { NexaTypographyComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-typography variant="h1">Dashboard</nexa-typography>
<nexa-typography variant="lead">Ship beautiful Angular apps faster.</nexa-typography>
<nexa-typography variant="muted">Last updated 2 hours ago</nexa-typography>
<nexa-typography variant="list"><li>First</li><li>Second</li></nexa-typography>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'h1'\|'h2'\|'h3'\|'h4'\|'p'\|'lead'\|'large'\|'small'\|'muted'\|'blockquote'\|'inline-code'\|'list'` | `'p'` | Type style + rendered tag |
| `align` | `'start'\|'center'\|'end'\|'justify'` | `'start'` | Text alignment (logical) |
| `truncate` | `boolean` | `false` | Single-line ellipsis |
| `extraClass` | `string` | `''` | Extra classes on the text element |

## Accessibility

- Real heading tags preserve document outline — don't skip levels (`h1` → `h3`).
- `muted` still meets contrast on both themes; never use it for critical errors.

## Responsive

- Headings use `clamp()` so they scale from 320px phones to 4K displays with no extra code.

## Theming

Uses `--nexa-font-sans`, `--nexa-font-mono`, `--nexa-foreground`, `--nexa-muted-foreground`, `--nexa-border`.

## Customization

```html
<nexa-typography variant="h2" extraClass="uppercase" align="center">Centered</nexa-typography>
<nexa-typography variant="p" [truncate]="true">Long single-line label…</nexa-typography>
```
