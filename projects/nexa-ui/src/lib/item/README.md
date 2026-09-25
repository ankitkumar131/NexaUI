# NexaItem

Generic list row for settings, files and members — leading/trailing slots, optional link mode.

## Import

```ts
import { NexaItemComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-item title="Notifications" description="Push, email and SMS">
  <span slot="leading">🔔</span>
  <nexa-switch slot="trailing" [(checked)]="push" ariaLabel="Push notifications" />
</nexa-item>

<nexa-item title="Billing" description="Plan, invoices, usage" href="/billing">
  <span slot="leading">💳</span>
  <nexa-badge slot="trailing" variant="success">Pro</nexa-badge>
</nexa-item>
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `title` / `description` | `string` | `''` | Main text |
| `href` | `string` | — | Link mode (renders `<a>` + chevron) |
| `disabled` | `boolean` | `false` | Dimmed (link mode drops `href`) |
| `extraClass` | `string` | `''` | Extra host classes |

Slots: `[slot=leading]`, `[slot=trailing]`, default (extra body under description).
