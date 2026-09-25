# Nexa UI

A **shadcn-inspired component library for Angular v22** — 64 standalone, signal-based,
easily customizable components, directives and services. Copy-paste friendly like shadcn,
or install as a package.

- ✅ 64 components · every one standalone, OnPush, zoneless-ready signals
- 🎨 Customizable via inputs, CSS variables (`--nexa-*`) and content projection
- 🌗 Light/dark theming out of the box (`NexaThemeService`)
- 🌍 RTL/LTR support (`NexaDirectionService` + `[nexaDir]`)
- ♿ Accessible by default: roles, focus management, keyboard navigation, `prefers-reduced-motion`
- 📖 Detailed README for every component + a full interactive showcase

## Quickstart

**Option A — copy components into your app (shadcn-style):**

```bash
node tools/nexa.mjs list                  # browse the catalog
node tools/nexa.mjs info dialog           # selectors, files, docs
node tools/nexa.mjs add dialog --dest src/app/ui
```

> Components import shared helpers — also copy `projects/nexa-ui/src/lib/utils`
> and `projects/nexa-ui/src/lib/tokens/tokens.scss` (import the tokens once, globally).

**Option B — build & use the library package:**

```bash
npx ng build nexa-ui
```

Then import what you need (standalone — no NgModules):

```ts
import { NexaButtonComponent, NexaDialogComponent } from 'nexa-ui';
```

```html
<nexa-button variant="primary" (click)="save()">Save</nexa-button>
```

## Showcase

The interactive demo app renders all 64 components with variants, behind a table of contents:

```bash
npx ng serve nexa-showcase   # http://localhost:4200
```

Works straight from a fresh clone — no need to build the library first
(`tsconfig.json` maps `nexa-ui` to the library source).

## Customizing

Every component follows the same three seams:

1. **Inputs** — `variant`, `tone`, `size`, `extraClass`, … per component (see its README).
2. **CSS variables** — override any `--nexa-*` token globally or per subtree:
   ```css
   :root { --nexa-primary: #7c3aed; --nexa-radius: 0.75rem; }
   ```
3. **Composition** — content projection slots (`header`, `leading`, `trailing`, …) and
   class passthrough via `extraClass`.

Theming (light/dark) is a one-liner:

```ts
private readonly theme = inject(NexaThemeService);
this.theme.toggle(); // .setTheme('dark' | 'light')
```

## Component catalog

<!-- CATALOG:GENERATED — do not edit by hand, run: node tools/gen-registry.mjs && <inject> -->

| Component | Selector(s) | Docs |
|---|---|---|
| **accordion** | `nexa-accordion-item`, `nexa-accordion` | [accordion](projects/nexa-ui/src/lib/accordion/README.md) |
| **alert** | `nexa-alert` | [alert](projects/nexa-ui/src/lib/alert/README.md) |
| **alert-dialog** | `nexa-alert-dialog` | [alert-dialog](projects/nexa-ui/src/lib/alert-dialog/README.md) |
| **aspect-ratio** | `nexa-aspect-ratio` | [aspect-ratio](projects/nexa-ui/src/lib/aspect-ratio/README.md) |
| **attachment** | `nexa-attachment` | [attachment](projects/nexa-ui/src/lib/attachment/README.md) |
| **avatar** | `nexa-avatar` | [avatar](projects/nexa-ui/src/lib/avatar/README.md) |
| **badge** | `nexa-badge` | [badge](projects/nexa-ui/src/lib/badge/README.md) |
| **breadcrumb** | `nexa-breadcrumb` | [breadcrumb](projects/nexa-ui/src/lib/breadcrumb/README.md) |
| **bubble** | `nexa-bubble` | [bubble](projects/nexa-ui/src/lib/bubble/README.md) |
| **button** | `nexa-button` | [button](projects/nexa-ui/src/lib/button/README.md) |
| **button-group** | `nexa-button-group` | [button-group](projects/nexa-ui/src/lib/button-group/README.md) |
| **calendar** | `nexa-calendar` | [calendar](projects/nexa-ui/src/lib/calendar/README.md) |
| **card** | `nexa-card`, `nexa-card-header`, `nexa-card-title`, `nexa-card-description`, `nexa-card-action`, `nexa-card-content`, `nexa-card-footer` | [card](projects/nexa-ui/src/lib/card/README.md) |
| **carousel** | `nexa-carousel`, `nexa-carousel-slide` | [carousel](projects/nexa-ui/src/lib/carousel/README.md) |
| **chart** | `nexa-chart` | [chart](projects/nexa-ui/src/lib/chart/README.md) |
| **checkbox** | `nexa-checkbox` | [checkbox](projects/nexa-ui/src/lib/checkbox/README.md) |
| **collapsible** | `nexa-collapsible` | [collapsible](projects/nexa-ui/src/lib/collapsible/README.md) |
| **combobox** | `nexa-combobox` | [combobox](projects/nexa-ui/src/lib/combobox/README.md) |
| **command** | `nexa-command` | [command](projects/nexa-ui/src/lib/command/README.md) |
| **context-menu** | `nexa-context-menu` | [context-menu](projects/nexa-ui/src/lib/context-menu/README.md) |
| **data-table** | `nexa-data-table` | [data-table](projects/nexa-ui/src/lib/data-table/README.md) |
| **date-picker** | `nexa-date-picker` | [date-picker](projects/nexa-ui/src/lib/date-picker/README.md) |
| **dialog** | `nexa-dialog` | [dialog](projects/nexa-ui/src/lib/dialog/README.md) |
| **direction** | `[nexaDir]` | [direction](projects/nexa-ui/src/lib/direction/README.md) |
| **drawer** | `nexa-drawer` | [drawer](projects/nexa-ui/src/lib/drawer/README.md) |
| **dropdown-menu** | `nexa-dropdown-menu` | [dropdown-menu](projects/nexa-ui/src/lib/dropdown-menu/README.md) |
| **empty** | `nexa-empty` | [empty](projects/nexa-ui/src/lib/empty/README.md) |
| **field** | `nexa-field` | [field](projects/nexa-ui/src/lib/field/README.md) |
| **hover-card** | `nexa-hover-card` | [hover-card](projects/nexa-ui/src/lib/hover-card/README.md) |
| **input** | `nexa-input` | [input](projects/nexa-ui/src/lib/input/README.md) |
| **input-group** | `nexa-input-group` | [input-group](projects/nexa-ui/src/lib/input-group/README.md) |
| **input-otp** | `nexa-input-otp` | [input-otp](projects/nexa-ui/src/lib/input-otp/README.md) |
| **item** | `nexa-item` | [item](projects/nexa-ui/src/lib/item/README.md) |
| **kbd** | `nexa-kbd` | [kbd](projects/nexa-ui/src/lib/kbd/README.md) |
| **label** | `nexa-label` | [label](projects/nexa-ui/src/lib/label/README.md) |
| **marker** | `nexa-marker` | [marker](projects/nexa-ui/src/lib/marker/README.md) |
| **menubar** | `nexa-menubar` | [menubar](projects/nexa-ui/src/lib/menubar/README.md) |
| **message** | `nexa-message` | [message](projects/nexa-ui/src/lib/message/README.md) |
| **message-scroller** | `nexa-message-scroller` | [message-scroller](projects/nexa-ui/src/lib/message-scroller/README.md) |
| **native-select** | `nexa-native-select` | [native-select](projects/nexa-ui/src/lib/native-select/README.md) |
| **navigation-menu** | `nexa-navigation-menu` | [navigation-menu](projects/nexa-ui/src/lib/navigation-menu/README.md) |
| **pagination** | `nexa-pagination` | [pagination](projects/nexa-ui/src/lib/pagination/README.md) |
| **popover** | `nexa-popover` | [popover](projects/nexa-ui/src/lib/popover/README.md) |
| **progress** | `nexa-progress` | [progress](projects/nexa-ui/src/lib/progress/README.md) |
| **questionnaire** | `nexa-questionnaire` | [questionnaire](projects/nexa-ui/src/lib/questionnaire/README.md) |
| **radio-group** | `nexa-radio-group` | [radio-group](projects/nexa-ui/src/lib/radio-group/README.md) |
| **resizable** | `nexa-resizable` | [resizable](projects/nexa-ui/src/lib/resizable/README.md) |
| **scroll-area** | `nexa-scroll-area` | [scroll-area](projects/nexa-ui/src/lib/scroll-area/README.md) |
| **select** | `nexa-select` | [select](projects/nexa-ui/src/lib/select/README.md) |
| **separator** | `nexa-separator` | [separator](projects/nexa-ui/src/lib/separator/README.md) |
| **sheet** | `nexa-sheet` | [sheet](projects/nexa-ui/src/lib/sheet/README.md) |
| **sidebar** | `nexa-sidebar` | [sidebar](projects/nexa-ui/src/lib/sidebar/README.md) |
| **skeleton** | `nexa-skeleton` | [skeleton](projects/nexa-ui/src/lib/skeleton/README.md) |
| **slider** | `nexa-slider` | [slider](projects/nexa-ui/src/lib/slider/README.md) |
| **spinner** | `nexa-spinner` | [spinner](projects/nexa-ui/src/lib/spinner/README.md) |
| **switch** | `nexa-switch` | [switch](projects/nexa-ui/src/lib/switch/README.md) |
| **table** | `table[nexa-table]`, `thead[nexa-table-header]`, `tbody[nexa-table-body]`, `tfoot[nexa-table-footer]`, `tr[nexa-table-row]`, `th[nexa-table-head]`, `td[nexa-table-cell]` | [table](projects/nexa-ui/src/lib/table/README.md) |
| **tabs** | `[nexaTabPanel]`, `nexa-tabs` | [tabs](projects/nexa-ui/src/lib/tabs/README.md) |
| **textarea** | `nexa-textarea` | [textarea](projects/nexa-ui/src/lib/textarea/README.md) |
| **toast** | `nexa-toaster` | [toast](projects/nexa-ui/src/lib/toast/README.md) |
| **toggle** | `nexa-toggle` | [toggle](projects/nexa-ui/src/lib/toggle/README.md) |
| **toggle-group** | `nexa-toggle-group` | [toggle-group](projects/nexa-ui/src/lib/toggle-group/README.md) |
| **tooltip** | `nexa-tooltip` | [tooltip](projects/nexa-ui/src/lib/tooltip/README.md) |
| **typography** | `nexa-typography` | [typography](projects/nexa-ui/src/lib/typography/README.md) |

Per-component usage docs live next to the source:
`projects/nexa-ui/src/lib/<name>/README.md`.

## Project structure

```
projects/nexa-ui/src/lib/   # the library — one folder per component
  <name>/                   # *.component.ts/html/scss + README.md
  tokens/tokens.scss        # design tokens (import once, globally)
  utils/                    # shared helpers (cn, ids, overlay)
  theme/                    # NexaThemeService (light/dark)
src/app/                    # showcase app — TOC + 64 live demos
tools/
  nexa.mjs                  # CLI stub: list | info | add
  gen-registry.mjs          # regenerates registry.json from source
registry.json               # machine-readable catalog (generated)
```

## Scripts

| Command | What it does |
|---|---|
| `npx ng build nexa-ui` | Build the library to `dist/nexa-ui` |
| `npx ng build nexa-showcase` | Build the showcase to `dist/nexa-showcase` |
| `npx ng serve nexa-showcase` | Serve the interactive demo |
| `node tools/nexa.mjs list` | List all 64 components |

## Requirements

Angular ≥ 22, Node ≥ 20. No runtime dependencies beyond Angular itself.
