# NexaQuestionnaire

Multi-step wizard chrome — progress bar, step pills and back/next navigation. Step content stays in your template via `@if`, so validation and state remain yours.

## Import

```ts
import { NexaQuestionnaireComponent } from 'nexa-ui';
```

## Usage

```ts
steps = [
  { id: 'name', title: 'Your name' },
  { id: 'plan', title: 'Plan' },
  { id: 'done', title: 'Review' },
];
step = signal(0);
name = signal('');
```

```html
<nexa-questionnaire
  [steps]="steps"
  [(current)]="step"
  [nextDisabled]="step() === 0 && !name().trim()"
  (completed)="submit()"
>
  @if (step() === 0) {
    <nexa-field label="Name" controlId="q-name">
      <nexa-input id="q-name" [(value)]="name" />
    </nexa-field>
  }
  @if (step() === 1) { … }
  @if (step() === 2) { <p>Review: {{ name() }}</p> }
</nexa-questionnaire>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `steps` | `NexaQuestionStep[]` | `[]` | `{ id, title, description? }` |
| `current` | `model<number>` | `0` | Two-way step index |
| `backText` / `nextText` / `finishText` | `string` | — | Button labels |
| `showProgress` | `boolean` | `true` | Progress bar |
| `allowSkip` | `boolean` | `false` | Clickable step pills |
| `nextDisabled` | `boolean` | `false` | Gate Next/Finish on validation |
| `ariaLabel` | `string` | `'Questionnaire'` | Group label |
| `extraClass` | `string` | `''` | Extra host classes |

| Output | Description |
|---|---|
| `completed` | Finish clicked on the last step |

## Accessibility

Current step exposes `aria-current="step"`; the counter lives in `role="status"`. Gate with `nextDisabled` (not hidden buttons) so the flow stays predictable.
