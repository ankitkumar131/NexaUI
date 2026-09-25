# NexaCard family

Composable content container: `nexa-card` + `header / title / description / action / content / footer`.

## Import

```ts
import {
  NexaCardComponent, NexaCardHeaderComponent, NexaCardTitleComponent,
  NexaCardDescriptionComponent, NexaCardActionComponent,
  NexaCardContentComponent, NexaCardFooterComponent,
} from 'nexa-ui';
```

## Usage

```html
<nexa-card>
  <nexa-card-header>
    <nexa-card-title>Project Alpha</nexa-card-title>
    <nexa-card-description>Q3 roadmap and milestones.</nexa-card-description>
    <nexa-card-action><nexa-badge variant="success">On track</nexa-badge></nexa-card-action>
  </nexa-card-header>
  <nexa-card-content>
    <p>Velocity is up 18% this sprint…</p>
  </nexa-card-content>
  <nexa-card-footer>
    <nexa-button size="sm">Open board</nexa-button>
    <nexa-button size="sm" variant="ghost">Dismiss</nexa-button>
  </nexa-card-footer>
</nexa-card>
```

Any part is optional — compose only what you need. Multiple `nexa-card-content` blocks stack naturally.

## API

`nexa-card` accepts `extraClass`. Sub-parts are styling wrappers (no inputs) so composition stays obvious.

## Accessibility

Parts render plain `div`s (no forced heading levels) — project your own `h2`/`h3` inside `nexa-card-title` when the card starts a document section.

## Theming

`--nexa-card`, `--nexa-card-foreground`, `--nexa-border`, `--nexa-radius-xl`, `--nexa-shadow-xs`, `--nexa-card-padding`.
