# nexa-ui

Nexa UI — a shadcn-inspired, standalone component library for Angular v22.
64 components, directives and services. Signal-based, OnPush, SSR-safe, RTL-aware.

## Install

```bash
npm install nexa-ui
```

Import the design tokens once, globally (e.g. in `src/styles.scss`):

```scss
@use 'nexa-ui/tokens'; // exposes --nexa-* CSS variables + dark theme
```

## Use

Everything is standalone — import components directly:

```ts
import { NexaButtonComponent, NexaDialogComponent, NexaToasterComponent } from 'nexa-ui';

@Component({
  imports: [NexaButtonComponent, NexaDialogComponent, NexaToasterComponent],
  template: `
    <nexa-button variant="primary" (click)="dialog.open()">Open</nexa-button>
    <nexa-dialog #dialog title="Hello">…</nexa-dialog>
    <nexa-toaster />
  `,
})
export class Demo {}
```

## Services

```ts
// Toasts
private readonly toast = inject(NexaToastService);
this.toast.success('Saved', 'Your changes are live.');

// Theming (light/dark, persisted)
private readonly theme = inject(NexaThemeService);
this.theme.toggle();

// Direction (RTL/LTR, persisted, SSR-safe)
private readonly dir = inject(NexaDirectionService);
this.dir.setDir('rtl');
```

## Customizing

- **Inputs**: `variant`, `tone`, `size`, `extraClass`, … (see each component's README)
- **CSS variables**: override `--nexa-*` tokens globally or per subtree
- **Composition**: projection slots + `extraClass` passthrough

## Docs

- Full catalog: `registry.json` at the repo root (or `node tools/nexa.mjs list`)
- Per-component guides: `src/lib/<name>/README.md`
- Interactive showcase: `npx ng serve nexa-showcase`
