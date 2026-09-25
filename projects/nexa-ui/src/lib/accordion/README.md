# NexaAccordion + NexaAccordionItem

Stacked collapsible sections (FAQs, settings groups) with single/multiple coordination and a JS-free expand animation.

## Import

```ts
import { NexaAccordionComponent, NexaAccordionItemComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-accordion type="single">
  <nexa-accordion-item value="a" title="What is Nexa UI?">
    <p>An Angular-native UI ecosystem…</p>
  </nexa-accordion-item>
  <nexa-accordion-item value="b" title="Is it free?" [open]="true">
    <p>Yes — MIT licensed.</p>
  </nexa-accordion-item>
  <nexa-accordion-item value="c" title="Disabled" [disabled]="true">…</nexa-accordion-item>
</nexa-accordion>

<!-- multiple open at once -->
<nexa-accordion type="multiple">…</nexa-accordion>
```

## API

**nexa-accordion**

| Input | Type | Default | Description |
|---|---|---|---|
| `type` | `'single' \| 'multiple'` | `'single'` | One or many open |
| `collapsible` | `boolean` | `true` | Single mode: allow closing the last item |
| `extraClass` | `string` | `''` | Extra host classes |

**nexa-accordion-item**

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `string` (required) | — | Unique item id |
| `title` | `string` | `''` | Header text |
| `open` | `model<boolean>` | `false` | Two-way open state (usable standalone) |
| `disabled` | `boolean` | `false` | Disabled state |
| `id` / `extraClass` | `string` | auto/`''` | Id prefix / classes |

Outputs `opened`/`closed`; method `close()` for imperative control.

## Accessibility

Native buttons with `aria-expanded`/`aria-controls`, `role="region"` panels, `inert` closed content (unfocusable). Headings use `h3` — wrap in your own section structure for outline correctness.
