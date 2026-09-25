# Angular Shadcn-Inspired UI Component System — System Design & AI Agent Build Specification

**Document type:** Master system-design specification  
**Target:** Angular UI component ecosystem distributed through npm  
**Architecture:** Nx monorepo + standalone Angular components + reusable primitives + design tokens + optional source-code registry/CLI  
**Primary goals:** shadcn-inspired composition and customization, Material-like npm installation, responsive UI, accessibility, tree-shaking, low runtime overhead, SSR/hydration compatibility, and strong developer experience.

---

## 1. Executive Summary

Build a production-grade Angular UI ecosystem inspired by the design philosophy of shadcn/ui, but implemented as an Angular-native system.

The project must combine two distribution models:

1. **Package mode** — developers install the library from npm and import standalone components.
2. **Source mode** — a CLI can add component source into an Angular application so developers own and customize the implementation.

The project is **not** a React-to-Angular port and must not copy React-specific architecture. Angular primitives, Angular CDK, Angular forms, standalone components, signals, dependency injection, SSR, hydration, and Angular's package/build conventions must drive the implementation.

shadcn/ui explicitly positions itself as a set of accessible components plus a code-distribution platform rather than a conventional npm component library. Its current official component catalog is dynamic and currently lists 64 components. The project must therefore treat the catalog as an initial compatibility target rather than assuming the number can never change.

References:
- shadcn introduction: https://ui.shadcn.com/docs
- shadcn component catalog: https://ui.shadcn.com/docs/components
- Angular component architecture: https://angular.dev/guide/components
- Angular library generation: https://angular.dev/cli/generate/library

---

# 2. Product Vision

Create an Angular UI ecosystem that provides:

- beautiful defaults
- composable components
- predictable APIs
- accessible behavior
- responsive layouts
- light/dark/custom themes
- CSS-variable-driven design tokens
- low bundle overhead
- tree-shakable imports
- standalone Angular components
- Angular Forms integration
- SSR and hydration compatibility
- source-code customization through a CLI
- npm distribution for conventional library usage
- documentation and examples
- visual regression testing
- automated accessibility testing
- bundle-size budgets
- semantic versioning
- automated npm releases

The final developer experience should feel like:

```text
npm install @scope/ui
        ↓
configure theme
        ↓
import component
        ↓
use component
        ↓
customize with tokens/classes/composition
```

And optionally:

```text
npx @scope/cli add button
        ↓
component source is added to the application
        ↓
developer owns and customizes it
```

---

# 3. Core Design Principles

## 3.1 Composition over configuration

Prefer small composable pieces over enormous components with dozens of configuration inputs.

For example, a card should conceptually support:

```text
Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter
```

The API should make valid composition obvious.

shadcn added explicit component-composition documentation in 2026 because structured component trees improve both developer and AI-agent reliability. Apply the same principle to this project.

## 3.2 Open and understandable code

The source should be readable by developers and coding agents.

Avoid unnecessary abstraction layers, generated runtime code, or magic behavior.

## 3.3 Angular-native

Use modern Angular patterns:

- standalone components
- signals where appropriate
- dependency injection
- Angular CDK
- Angular Forms
- strict templates
- strict TypeScript
- SSR compatibility
- hydration compatibility
- modern Angular build tooling

Angular's current documentation states that components are standalone by default and can be imported directly into other components.

## 3.4 Accessibility first

Accessibility is part of the component definition, not an optional enhancement.

Target WCAG 2.2 AA behavior where applicable.

## 3.5 Responsive by default

Every component must work across mobile, tablet, laptop, desktop, 2K and 4K viewports.

## 3.6 Performance first

Every component must minimize:

- JavaScript
- CSS
- runtime subscriptions
- unnecessary DOM nodes
- dependencies
- global styles
- change-detection work
- expensive event handlers

## 3.7 Predictable APIs

Similar components must expose similar concepts and naming conventions.

## 3.8 No global CSS pollution

The library must not unexpectedly override application-wide HTML elements or common class names.

---

# 4. Current Initial Component Scope

Use the current official shadcn catalog as the initial component target.

The official catalog currently lists 64 components:

### Foundations

1. Accordion
2. Alert
3. Alert Dialog
4. Aspect Ratio
5. Attachment
6. Avatar
7. Badge
8. Breadcrumb
9. Bubble
10. Button
11. Button Group
12. Calendar
13. Card
14. Carousel
15. Chart
16. Checkbox
17. Collapsible
18. Combobox
19. Command
20. Context Menu

### Forms / Data

21. Data Table
22. Date Picker
23. Dialog
24. Direction
25. Drawer
26. Dropdown Menu
27. Empty
28. Field
29. Hover Card
30. Input
31. Input Group
32. Input OTP
33. Item
34. Kbd
35. Label
36. Marker
37. Menubar
38. Message
39. Message Scroller
40. Native Select
41. Navigation Menu
42. Pagination
43. Popover
44. Progress
45. Questionnaire
46. Radio Group
47. Resizable
48. Scroll Area
49. Select
50. Separator
51. Sheet
52. Sidebar
53. Skeleton
54. Slider
55. Spinner
56. Switch
57. Table
58. Tabs
59. Textarea
60. Toast
61. Toggle
62. Toggle Group
63. Tooltip
64. Typography

**Important:** The official catalog is continuously evolving. At project initialization, re-check the official catalog and update this list if the upstream catalog has changed. Do not treat 64 as a permanent limit.

Official source:
https://ui.shadcn.com/docs/components

The 2026 shadcn changelog also shows that chat-oriented components such as MessageScroller, Message, Bubble, Attachment and Marker were added as a coordinated component family. This is a useful example of grouping related primitives rather than implementing every component in isolation.

---

# 5. Recommended Internal Component Domains

Organize the implementation into logical domains.

## Foundations

- Typography
- Button
- Badge
- Avatar
- Label
- Kbd
- Separator
- Aspect Ratio

## Layout

- Card
- Resizable
- Scroll Area
- Scroller
- Sidebar
- Drawer
- Sheet

## Forms

- Input
- Textarea
- Checkbox
- Radio Group
- Switch
- Slider
- Select
- Native Select
- Input OTP
- Input Group
- Field
- Date Picker
- Calendar

## Navigation

- Breadcrumb
- Pagination
- Navigation Menu
- Menubar
- Tabs
- Command

## Overlays

- Dialog
- Alert Dialog
- Popover
- Tooltip
- Hover Card
- Dropdown Menu
- Context Menu
- Drawer
- Sheet

## Feedback

- Alert
- Toast
- Progress
- Spinner
- Skeleton
- Empty
- Message

## Data

- Table
- Data Table
- Calendar
- Date Picker
- Chart

## Advanced / Domain Components

- Accordion
- Collapsible
- Combobox
- Carousel
- Toggle
- Toggle Group
- Button Group
- Attachment
- Bubble
- Item
- Marker
- Message Scroller
- Questionnaire

---

# 6. Repository Architecture

Use an **Nx monorepo**.

The project is an ecosystem rather than a single library, so a monorepo is preferred over a simple Angular workspace containing one large library.

Recommended conceptual structure:

```text
angular-ui/
│
├── apps/
│   ├── docs/
│   ├── playground/
│   ├── showcase/
│   └── test-app/
│
├── packages/
│   ├── core/
│   ├── primitives/
│   ├── tokens/
│   ├── utils/
│   ├── icons/
│   │
│   ├── accordion/
│   ├── alert/
│   ├── alert-dialog/
│   ├── aspect-ratio/
│   ├── attachment/
│   ├── avatar/
│   ├── badge/
│   ├── breadcrumb/
│   ├── bubble/
│   ├── button/
│   ├── button-group/
│   ├── calendar/
│   ├── card/
│   ├── carousel/
│   ├── chart/
│   ├── checkbox/
│   ├── collapsible/
│   ├── combobox/
│   ├── command/
│   ├── context-menu/
│   ├── data-table/
│   ├── date-picker/
│   ├── dialog/
│   ├── direction/
│   ├── drawer/
│   ├── dropdown-menu/
│   ├── empty/
│   ├── field/
│   ├── hover-card/
│   ├── input/
│   ├── input-group/
│   ├── input-otp/
│   ├── item/
│   ├── kbd/
│   ├── label/
│   ├── marker/
│   ├── menubar/
│   ├── message/
│   ├── message-scroller/
│   ├── native-select/
│   ├── navigation-menu/
│   ├── pagination/
│   ├── popover/
│   ├── progress/
│   ├── questionnaire/
│   ├── radio-group/
│   ├── resizable/
│   ├── scroll-area/
│   ├── select/
│   ├── separator/
│   ├── sheet/
│   ├── sidebar/
│   ├── skeleton/
│   ├── slider/
│   ├── spinner/
│   ├── switch/
│   ├── table/
│   ├── tabs/
│   ├── textarea/
│   ├── toast/
│   ├── toggle/
│   ├── toggle-group/
│   ├── tooltip/
│   └── typography/
│
├── registry/
│   ├── components/
│   ├── blocks/
│   ├── examples/
│   └── registry.json
│
├── tools/
│   ├── cli/
│   ├── generators/
│   ├── release/
│   └── validation/
│
├── e2e/
├── scripts/
├── nx.json
├── package.json
└── tsconfig.base.json
```

The agent may adjust the exact directory names if the resulting dependency graph is cleaner, but it must preserve the architectural separation.

---

# 7. Package Strategy

Do not create one huge runtime package containing every component in a way that prevents tree-shaking.

The ecosystem should expose:

```text
@scope/ui
@scope/ui/button
@scope/ui/card
@scope/ui/dialog
@scope/ui/table
...
```

Also create supporting packages where justified:

```text
@scope/tokens
@scope/primitives
@scope/icons
@scope/utils
@scope/cli
```

Do not publish 64 independent npm packages merely because there are 64 components. Excessive package fragmentation creates release and dependency-management overhead.

Preferred model:

```text
Monorepo
    ↓
independent internal projects
    ↓
single primary npm package with secondary entry points
    ↓
optional supporting packages
```

---

# 8. Public Distribution Modes

## 8.1 Package Mode

Primary installation:

```text
npm install @scope/ui
```

Users import standalone components from the library.

The package must provide clean exports and secondary entry points.

## 8.2 Source Mode

Provide a CLI:

```text
npx @scope/cli add button
npx @scope/cli add dialog
npx @scope/cli add button dialog card
```

The CLI copies or generates component source into the user's Angular project.

This is inspired by the open-code philosophy of shadcn.

shadcn's current CLI adds component source directly to the application rather than merely importing a precompiled component. Its configuration file also defines aliases, dependencies and registry behavior.

Source:
https://ui.shadcn.com/docs/components-json

---

# 9. CLI Requirements

Create an optional CLI package:

```text
@scope/cli
```

Expected command families:

```text
ui init
ui add <component>
ui add <component> <component>
ui list
ui search <term>
ui view <component>
ui update
ui remove <component>
ui doctor
ui info
```

The CLI must:

- detect Angular project structure
- validate compatibility
- create configuration
- install required dependencies
- resolve component dependencies
- resolve registry dependencies
- copy source files
- update theme tokens
- preserve user modifications where possible
- report conflicts clearly
- support dry-run mode
- support non-interactive mode for CI/AI agents

The CLI should use a machine-readable project configuration inspired by shadcn's `components.json`.

---

# 10. Registry Architecture

Create a registry system capable of describing:

```text
component name
description
category
version
files
dependencies
registry dependencies
peer dependencies
CSS variables
theme requirements
examples
documentation
```

Example conceptual registry item:

```text
button
├── metadata
├── source files
├── dependencies
├── theme tokens
├── examples
└── documentation
```

Registry entries must be machine-readable and stable.

The registry should support future private/company registries.

shadcn's current registry system supports UI items, dependencies, registry dependencies and CSS variables. Use that as conceptual inspiration, not as a format to copy blindly.

Source:
https://ui.shadcn.com/docs/registry/registry-index
https://ui.shadcn.com/docs/registry/examples

---

# 11. Core Primitive Layer

Do not allow 64 components to independently implement the same interaction logic.

Create reusable primitives for:

```text
focus management
overlay
portal
positioning
keyboard navigation
menu behavior
selection
scrolling
form control
animation
dismissible interactions
outside-click handling
roving focus
directionality
```

Conceptually:

```text
Angular CDK
     ↓
Project primitives
     ↓
Component primitives
     ↓
Public components
```

Examples:

```text
Dialog
  ↓
Overlay + focus management + portal

Popover
  ↓
Overlay + positioning

Dropdown Menu
  ↓
Menu + keyboard navigation

Select
  ↓
Selection + keyboard navigation + overlay

Tooltip
  ↓
Overlay + positioning + timing

Date Picker
  ↓
Calendar + Popover + form control
```

---

# 12. Angular CDK Strategy

Use Angular CDK for complex behavior when appropriate.

Evaluate CDK for:

- overlay
- portal
- accessibility
- focus management
- menus
- drag/drop
- scrolling
- table behavior
- keyboard interaction

Do not reimplement mature browser interaction infrastructure unnecessarily.

The visual layer and component API must remain owned by this design system.

---

# 13. Angular Component Architecture

All public UI components should be standalone.

Follow current Angular conventions:

- standalone components
- strict TypeScript
- strict templates
- signals where they provide clear value
- dependency injection
- content projection
- host bindings/directives where useful
- modern Angular control flow
- Angular Forms integration
- SSR-safe implementation

Do not require NgModules for normal component usage.

Angular's current documentation states that standalone components can be directly imported by other components and that standalone is the default model for modern Angular components.

---

# 14. Component API Philosophy

Every component must have a predictable API.

Avoid:

- unnecessary inputs
- giant configuration objects
- duplicated APIs
- component-specific naming for common concepts
- implicit global state
- hidden side effects

Prefer:

- composition
- explicit inputs
- explicit outputs/events
- semantic variants
- content projection
- CSS variables
- predictable state models

---

# 15. Variant System

Create a consistent variant architecture.

Components may have:

```text
variant
size
state
orientation
appearance
```

But only expose a property when it represents a meaningful public behavior.

Example conceptual Button variants:

```text
default
secondary
destructive
outline
ghost
link
```

Sizes:

```text
small
default
large
icon
```

The variant system must be shared conceptually across components so developers do not learn a completely different API for every component.

---

# 16. Design Token System

Create:

```text
@scope/tokens
```

Design tokens should cover:

## Colors

- background
- foreground
- primary
- primary foreground
- secondary
- secondary foreground
- muted
- muted foreground
- accent
- accent foreground
- destructive
- destructive foreground
- border
- input
- ring
- card
- popover

## Typography

- font family
- font size
- font weight
- line height
- letter spacing

## Spacing

- xs
- sm
- md
- lg
- xl
- 2xl
- etc.

## Radius

- sm
- md
- lg
- xl
- full

## Shadows

- sm
- md
- lg
- xl

## Z-index

- dropdown
- sticky
- overlay
- modal
- popover
- toast
- tooltip

---

# 17. CSS Architecture

Use SCSS internally where useful, but do not force a giant global SCSS bundle on consumers.

Preferred model:

```text
SCSS source
   ↓
component styles
   ↓
CSS custom properties
```

Theme tokens should be represented using CSS custom properties so runtime theme switching is cheap.

Use a predictable namespace such as:

```text
--ui-primary
--ui-background
--ui-foreground
--ui-border
--ui-radius
```

Do not create generic global selectors that can unexpectedly affect the application.

---

# 18. Theme System

Support:

```text
light
dark
system
custom
```

The preferred implementation should rely primarily on CSS custom properties rather than a large runtime theme engine.

Theme switching should not require recompiling components.

Users should be able to override semantic tokens without rewriting every component.

---

# 19. Responsive Design

Responsive behavior is mandatory.

Use a mobile-first strategy.

Minimum test widths:

```text
320px
375px
425px
640px
768px
1024px
1280px
1440px
1920px
2560px
3840px
```

Components must not depend on a fixed desktop viewport.

Examples:

### Dialog

Desktop:

```text
centered modal
```

Mobile:

```text
near full-width / constrained viewport
```

### Sidebar

Desktop:

```text
persistent navigation
```

Mobile:

```text
drawer/sheet behavior
```

### Data table

Desktop:

```text
full table
```

Mobile:

```text
responsive overflow or intentionally transformed presentation
```

Do not blindly shrink content until it becomes unusable.

---

# 20. Accessibility Requirements

Every interactive component must define:

- semantic HTML
- ARIA behavior
- keyboard behavior
- focus behavior
- focus restoration
- disabled state
- loading state where applicable
- error state where applicable
- screen-reader behavior
- reduced-motion behavior
- touch behavior

High-risk components:

```text
Dialog
Alert Dialog
Dropdown Menu
Context Menu
Select
Combobox
Command
Popover
Tooltip
Tabs
Accordion
Carousel
Navigation Menu
```

must receive dedicated keyboard and accessibility tests.

---

# 21. Forms Architecture

Components that represent form controls must integrate with Angular Forms.

Support where applicable:

- Reactive Forms
- Template-driven Forms
- FormControl
- FormGroup
- FormArray
- ControlValueAccessor
- validation states
- touched/dirty states
- disabled states
- error messages

Form controls must behave naturally inside Angular forms rather than inventing a separate form system.

---

# 22. Overlay Architecture

Centralize overlay behavior.

Components such as:

```text
Dialog
Alert Dialog
Popover
Tooltip
Hover Card
Dropdown
Context Menu
Select
Combobox
Date Picker
Drawer
Sheet
```

must share appropriate infrastructure.

Requirements:

- viewport collision handling
- keyboard dismissal
- Escape behavior
- focus management
- focus restoration
- scroll locking where appropriate
- SSR safety
- nested overlay support
- z-index management
- touch support

---

# 23. Directionality and RTL

Build directionality into the architecture.

Support:

```text
LTR
RTL
```

Avoid hard-coding:

```text
left
right
```

where logical CSS properties can be used.

Prefer logical concepts such as:

```text
inline-start
inline-end
block-start
block-end
```

This should be considered during component design rather than retrofitted later.

---

# 24. Icons

Do not tightly couple every component to one icon library.

Create an icon abstraction that can accept:

- custom SVG
- project icon components
- external icon components
- user-defined icons

Do not require a large icon dependency for components that do not need icons.

---

# 25. Performance Requirements

Primary performance goals:

- minimal JavaScript
- minimal CSS
- tree-shaking
- small dependency graph
- no unnecessary runtime services
- no unnecessary subscriptions
- minimal DOM
- OnPush-compatible architecture
- signals where useful
- lazy loading for heavy features
- optional heavy dependencies
- efficient event listeners

Do not claim the library is "faster than Material" without benchmarks.

Instead establish measurable budgets.

---

# 26. Tree-Shaking

The package must support dead-code elimination.

Importing:

```text
Button
```

must not pull unrelated components such as:

```text
Chart
Calendar
Data Table
Carousel
```

into the application's production bundle.

Use:

- proper ESM output
- package exports
- side-effect discipline
- independent entry points
- minimal top-level initialization
- lazy loading where appropriate

---

# 27. Secondary Entry Points

Support conceptual imports such as:

```text
@scope/ui/button
@scope/ui/card
@scope/ui/dialog
@scope/ui/table
```

while allowing the convenience import:

```text
@scope/ui
```

The convenience entry point must still be tree-shakable.

---

# 28. Heavy Components

Components with potentially large dependencies must be isolated.

Examples:

```text
Chart
Data Table
Calendar
Date Picker
Carousel
```

Do not make basic components depend on charting or other large packages.

A user who installs only Button and Card should not inherit charting dependencies.

---

# 29. Chart Architecture

Treat Chart as an optional feature.

The base UI package must remain lightweight.

If a charting engine is required, isolate it behind a chart-specific entry point/package.

Evaluate any charting dependency for:

- bundle size
- SSR
- accessibility
- maintenance
- licensing
- tree-shaking

---

# 30. Data Table Architecture

Keep:

```text
Table
```

lightweight.

Data Table can optionally support:

- sorting
- filtering
- pagination
- row selection
- column visibility
- column resizing
- virtualization

Do not force every Table consumer to pay the Data Table runtime cost.

---

# 31. SSR and Hydration

All components must be safe for Angular SSR and hydration.

Do not assume browser globals exist during server rendering.

Browser-only behavior must be isolated.

Test:

```text
server render
+
hydration
+
client interaction
```

for components that depend on overlays, measurements, scrolling or browser APIs.

---

# 32. Animation

Animations must be:

- subtle
- fast
- optional where appropriate
- GPU-conscious
- accessible

Respect:

```text
prefers-reduced-motion
```

Avoid expensive JavaScript-driven animations when CSS can perform the same task efficiently.

---

# 33. Global CSS Rules

The library must not globally style:

```text
button
input
div
h1
h2
p
a
```

unless a deliberate, documented reset is part of an explicitly opt-in theme package.

Component styles must be scoped/namespaced.

Avoid generic global class names:

```text
.button
.card
.container
.modal
```

Prefer a consistent project namespace.

---

# 34. Component File Organization

Every component should have a consistent conceptual structure:

```text
component/
├── src/
│   ├── component
│   ├── types
│   ├── styles
│   └── internal helpers
├── tests/
├── examples/
└── documentation
```

The exact extension and file naming should follow current Angular conventions.

The agent may consolidate tiny files when doing so improves maintainability, but the public API must remain clear.

---

# 35. Documentation Application

Create:

```text
apps/docs
```

Documentation must contain:

- Introduction
- Installation
- Quick Start
- Theming
- Design Tokens
- Accessibility
- Responsive Design
- Customization
- CLI
- Registry
- Components
- Recipes
- Migration
- Changelog
- Contributing

Every component page must contain:

1. purpose
2. preview
3. installation
4. basic usage
5. composition
6. API
7. variants
8. accessibility
9. responsive behavior
10. theming
11. customization
12. advanced examples
13. source/registry information

---

# 36. Playground Application

Create:

```text
apps/playground
```

Purpose:

- manually test components
- test combinations
- test edge cases
- test responsive behavior
- test themes
- test RTL
- test keyboard interactions

The playground should expose controls for:

```text
viewport
theme
direction
component state
```

---

# 37. Test Application

Create:

```text
apps/test-app
```

It must consume the library as a consumer would.

This should be used to detect:

- package export problems
- CSS packaging problems
- dependency problems
- Angular peer dependency problems
- SSR problems
- tree-shaking problems

The test application should eventually test against the packed npm artifact, not only workspace source.

---

# 38. Testing Strategy

Use multiple testing layers.

## Unit tests

Test:

- inputs
- outputs
- state
- signals
- methods
- rendering
- conditional behavior

## Integration tests

Test:

- forms
- overlays
- CDK
- component composition
- interactions

## Accessibility tests

Test:

- keyboard
- focus
- ARIA
- semantic structure
- common accessibility violations

## Visual regression tests

Test:

- light theme
- dark theme
- RTL
- mobile
- tablet
- desktop
- 2K
- 4K

---

# 39. Responsive Visual Regression Matrix

At minimum:

| Profile | Width |
|---|---:|
| Mobile S | 320px |
| Mobile M | 375px |
| Mobile L | 425px |
| Tablet | 768px |
| Laptop | 1024px |
| Laptop L | 1440px |
| Desktop | 1920px |
| 2K | 2560px |
| 4K | 3840px |

The agent must create automated visual checks for representative components.

---

# 40. Bundle Size Testing

Introduce bundle-size budgets.

Track at least:

```text
core
tokens
Button
Dialog
Table
Data Table
Calendar
Chart
CLI
```

CI must report:

- raw size
- compressed size where appropriate
- dependency changes
- previous release comparison

Set budgets and fail CI when an unexplained regression exceeds the allowed threshold.

---

# 41. Dependency Policy

Every production dependency must be justified.

Before introducing a dependency, evaluate:

- bundle size
- tree-shaking
- security
- maintenance
- Angular compatibility
- SSR compatibility
- accessibility
- license
- long-term stability

Do not introduce dependencies simply because they make one component easier to implement.

---

# 42. Security

The agent must review:

- npm dependency vulnerabilities
- malicious package risk
- unsafe DOM APIs
- HTML injection
- URL handling
- dynamic content
- SVG handling
- user-provided content
- dependency licenses

Avoid unnecessary use of raw HTML insertion.

---

# 43. Browser Compatibility

Test supported current versions of:

- Chrome
- Firefox
- Edge
- Safari
- relevant mobile browsers

Do not rely on Chrome-only behavior.

---

# 44. Internationalization

The architecture must avoid assumptions about:

- language direction
- text length
- date formats
- number formats
- locale
- translated labels

Components should not break when labels become substantially longer.

---

# 45. Localization and Date Components

Date-related components must support localization through Angular-compatible mechanisms.

Do not hard-code:

- month names
- weekday names
- date formats
- first day of week

Date and calendar components should be locale-aware.

---

# 46. Release Architecture

Use:

```text
GitHub
   ↓
CI
   ↓
Lint
   ↓
Typecheck
   ↓
Unit tests
   ↓
Integration tests
   ↓
Accessibility
   ↓
Visual regression
   ↓
Build
   ↓
Bundle analysis
   ↓
Version
   ↓
npm publish
   ↓
GitHub release
```

Automate releases as much as practical.

---

# 47. Semantic Versioning

Follow:

```text
MAJOR.MINOR.PATCH
```

Examples:

- new component: MINOR
- backward-compatible feature: MINOR
- bug fix: PATCH
- breaking API change: MAJOR

Document breaking changes clearly.

---

# 48. Changelog

Maintain an automated or semi-automated changelog.

Categorize:

```text
Added
Changed
Fixed
Deprecated
Removed
Performance
Accessibility
Breaking
```

Every public API change must be documented.

---

# 49. Component Definition of Done

A component is not complete merely because it renders.

A component is complete only when all applicable requirements are satisfied:

```text
✓ Angular standalone
✓ strict TypeScript
✓ strict template checking
✓ public API documented
✓ composition documented
✓ responsive
✓ light theme
✓ dark theme
✓ RTL where applicable
✓ accessible
✓ keyboard support
✓ mobile/touch support
✓ forms integration where applicable
✓ SSR safe
✓ hydration safe
✓ unit tests
✓ integration tests
✓ accessibility tests
✓ visual regression tests
✓ documentation
✓ examples
✓ tree-shaking verified
✓ bundle budget verified
✓ no unnecessary dependencies
✓ no global CSS pollution
```

---

# 50. Implementation Phases

Do not implement all components simultaneously.

## Phase 1 — Workspace

Build:

- Nx monorepo
- Angular workspace
- package structure
- apps
- linting
- formatting
- testing
- CI foundation

## Phase 2 — Tokens

Build:

- color system
- typography
- spacing
- radius
- shadows
- z-index
- light theme
- dark theme
- custom theme mechanism

## Phase 3 — Primitives

Build:

- focus
- overlay
- portal
- positioning
- keyboard
- menu
- selection
- scrolling
- form control
- animation
- directionality

## Phase 4 — Foundations

Build:

- Button
- Badge
- Avatar
- Label
- Typography
- Kbd
- Separator
- Aspect Ratio

## Phase 5 — Forms

Build:

- Input
- Textarea
- Checkbox
- Radio Group
- Switch
- Slider
- Select
- Native Select
- Input OTP
- Input Group
- Field

## Phase 6 — Overlays

Build:

- Dialog
- Alert Dialog
- Popover
- Tooltip
- Hover Card
- Dropdown Menu
- Context Menu
- Drawer
- Sheet

## Phase 7 — Navigation

Build:

- Breadcrumb
- Pagination
- Navigation Menu
- Menubar
- Tabs
- Command

## Phase 8 — Layout

Build:

- Card
- Accordion
- Collapsible
- Resizable
- Scroll Area
- Scroller
- Sidebar

## Phase 9 — Feedback

Build:

- Alert
- Toast
- Progress
- Spinner
- Skeleton
- Empty
- Message

## Phase 10 — Data

Build:

- Table
- Data Table
- Calendar
- Date Picker
- Chart

## Phase 11 — Advanced

Build remaining:

- Carousel
- Combobox
- Toggle
- Toggle Group
- Button Group
- Attachment
- Bubble
- Item
- Marker
- Message Scroller
- Questionnaire
- Direction

## Phase 12 — Distribution

Build:

- npm package
- secondary entry points
- CLI
- registry
- source installation
- documentation

## Phase 13 — Hardening

Perform:

- accessibility audit
- SSR tests
- hydration tests
- bundle audit
- visual regression
- browser testing
- security audit
- API review
- documentation review

---

# 51. Dependency Graph Requirements

The agent must maintain a dependency graph.

Avoid cycles.

Example:

```text
tokens
  ↓
core
  ↓
primitives
  ↓
Button
  ↓
Card
```

A component must never import a higher-level application concept.

Avoid:

```text
Button → Dialog → Button
```

or:

```text
primitive → public component
```

Primitives may be used by components, not the reverse.

---

# 52. Public API Rules

Do not expose internal implementation details unless required.

Public exports should include:

- component
- directives
- public types
- public tokens/configuration
- public utilities that users genuinely need

Do not expose internal:

- state managers
- DOM helpers
- private overlay details
- implementation-specific classes

unless there is a documented reason.

---

# 53. Error Handling

Components must fail predictably.

Examples:

- invalid configuration should produce useful developer errors
- missing required provider should produce actionable errors
- invalid component composition should be documented
- CLI conflicts should not silently overwrite user files
- registry failures should explain the failing resource
- unsupported Angular versions should be detected

---

# 54. CLI Safety

The CLI must:

- show files before destructive operations where practical
- support dry-run
- avoid silent overwrites
- detect modified files
- create backups or clearly warn when required
- preserve customizations
- validate project configuration

---

# 55. AI-Agent-Friendly Architecture

Because this system will be developed and maintained with AI coding agents, every component must have:

- predictable file structure
- predictable naming
- explicit composition tree
- explicit dependency metadata
- documented public API
- examples
- accessibility behavior
- responsive behavior
- test cases
- registry metadata

Do not rely on undocumented conventions.

The architecture should allow an AI agent to answer:

```text
What is this component?
What does it depend on?
How do I compose it?
What inputs does it accept?
What events does it emit?
How does it behave on mobile?
What keyboard interactions exist?
Which design tokens does it use?
How do I test it?
```

without reading the entire repository.

---

# 56. Documentation Metadata

Every component should have machine-readable metadata conceptually containing:

```text
name
category
description
version
dependencies
peerDependencies
registryDependencies
tokens
variants
accessibility
responsiveBehavior
examples
```

This metadata can power:

- CLI
- documentation
- registry
- AI agents
- component search
- dependency resolution
- release validation

---

# 57. Package Installation Experience

The normal user experience should be simple.

Conceptually:

```text
npm install @scope/ui
```

Then:

```text
import { Button } from '@scope/ui';
```

The user should not need:

- complicated global providers
- giant module imports
- manual CSS copying for every component
- dozens of dependencies
- custom webpack configuration

Theme initialization should be documented clearly and should be minimal.

---

# 58. Source Installation Experience

The source model should be:

```text
npx @scope/cli init
```

then:

```text
npx @scope/cli add button
```

The CLI should:

1. detect Angular project
2. create configuration
3. install required dependencies
4. resolve registry dependencies
5. copy component source
6. update required tokens/styles
7. update configuration
8. show exactly what changed

This mirrors the useful part of shadcn's distribution model while remaining Angular-native.

---

# 59. Theme Customization

Users must be able to change:

- colors
- typography
- radius
- shadows
- spacing
- component-specific tokens

without editing every component.

Use semantic tokens rather than hard-coded visual values.

Components should consume tokens instead of embedding application-specific colors.

---

# 60. Component-Specific Tokens

Allow components to define specialized semantic tokens when necessary.

Example:

```text
sidebar-background
sidebar-foreground
sidebar-border
dialog-background
dialog-shadow
chart-1
chart-2
```

Do not create hundreds of tokens without purpose.

Each token must have a clear semantic meaning.

---

# 61. No Tailwind Requirement

The core Angular library should not require Tailwind CSS.

The visual system should work with:

```text
Angular
SCSS/CSS
CSS custom properties
```

Users may still integrate utility CSS externally if they want, but the library must remain functional without it.

This keeps the Angular package framework-native and avoids forcing an unrelated styling pipeline on consumers.

---

# 62. No Hard Dependency on React or React Ecosystem

The implementation must be fully Angular-native.

Do not port:

- React hooks
- JSX assumptions
- React context
- Radix React components
- React-specific state models

The shadcn project is the inspiration for:

- composition
- customization
- open code
- registry distribution
- beautiful defaults

not a technical dependency.

---

# 63. Angular Version Policy

The agent must inspect the current Angular release and establish a support policy before implementation.

Document:

```text
minimum supported Angular version
recommended Angular version
supported TypeScript range
supported Node versions
supported browser versions
```

Peer dependencies must be declared correctly.

Do not silently support unsupported Angular versions.

---

# 64. Package Metadata

The npm package must include:

- correct name
- description
- keywords
- license
- repository
- homepage
- bugs URL
- exports
- peer dependencies
- files
- version
- Angular compatibility metadata where appropriate

Do not publish:

- tests
- source maps unnecessarily
- internal scripts
- development-only assets
- playground applications

unless explicitly useful.

---

# 65. NPM Packaging Validation

Before every release:

```text
build package
↓
pack npm artifact
↓
install artifact into clean Angular app
↓
test imports
↓
test styles
↓
test SSR if applicable
↓
test production build
```

Do not assume that a successful monorepo build means the npm package is consumable.

---

# 66. Performance Acceptance Criteria

The project must establish measurable budgets before release.

At minimum:

- no unrelated component code in simple imports
- no unnecessary production dependency
- no major bundle regression without review
- no excessive DOM nodes
- no unnecessary global listeners
- no repeated expensive computations
- no memory leaks in overlays/subscriptions
- no hydration mismatch

The exact byte budgets should be established after baseline measurements rather than invented arbitrarily.

---

# 67. Accessibility Acceptance Criteria

Before release, verify:

- keyboard-only operation
- focus visibility
- focus order
- focus trap where appropriate
- focus restoration
- Escape behavior
- screen-reader naming
- ARIA state
- semantic structure
- disabled behavior
- error behavior
- reduced motion
- RTL

---

# 68. Visual Design Requirements

The default visual system should be:

- clean
- modern
- minimal
- professional
- consistent
- neutral enough for customization
- suitable for SaaS dashboards
- suitable for admin panels
- suitable for landing pages
- suitable for internal applications

Do not copy shadcn's exact branding or proprietary project identity.

Create an original visual identity inspired by the underlying design philosophy.

---

# 69. Component Consistency

Components must share:

- spacing conventions
- typography
- border treatment
- radius system
- focus ring
- disabled state
- hover state
- active state
- selected state
- error state
- loading state
- animation language

The library should look like one system, not 64 unrelated components.

---

# 70. Focus Ring System

Create a common focus treatment.

All keyboard-focusable controls should use the same conceptual focus token.

Allow applications to customize:

```text
focus color
focus width
focus offset
```

without editing every component.

---

# 71. State System

Standardize common states:

```text
default
hover
focus
active
selected
disabled
loading
invalid
readonly
```

Not every component needs every state.

Document which states each component supports.

---

# 72. Mobile Interaction

Touch targets must remain usable.

Components must not depend on hover-only behavior.

For example:

- Tooltip must have a non-hover fallback
- Hover Card must have an appropriate mobile strategy
- Dropdowns must support touch
- Context menus need touch-compatible behavior
- Sidebar must have mobile behavior
- Data tables must remain usable on narrow screens

---

# 73. Empty / Loading / Error Patterns

Create consistent visual language for:

```text
Empty
Skeleton
Spinner
Progress
Alert
```

This enables developers to build predictable application states.

---

# 74. Toast Architecture

Toast should not require consumers to manually manage complicated state.

The public API should be simple.

The implementation must support:

- stacking
- dismissal
- duration
- keyboard access
- screen readers
- reduced motion
- mobile layout
- SSR safety
- configurable positioning

---

# 75. Dialog Architecture

Dialog must support:

- controlled/open state
- trigger
- content
- title
- description
- footer/actions
- focus trap
- focus restoration
- Escape
- backdrop interaction
- nested scenarios where appropriate
- responsive sizing
- SSR
- hydration
- accessibility

Alert Dialog must use stricter semantics for destructive confirmations.

---

# 76. Select / Combobox Architecture

These must be treated as advanced interactive components.

Requirements include:

- keyboard navigation
- typeahead where applicable
- selection
- focus
- disabled options
- loading state
- empty state
- search
- virtualization when justified
- forms integration
- accessibility
- mobile behavior

Avoid building a giant generic abstraction that makes simple Select unnecessarily expensive.

---

# 77. Table Architecture

Table should be simple.

Support:

- semantic table markup
- responsive overflow
- sticky behavior where appropriate
- caption
- header
- footer
- row
- cell
- selection styling where appropriate

Advanced Data Table functionality should remain separately composable.

---

# 78. Chart Accessibility

Chart must have an accessibility strategy.

Do not rely exclusively on visual graphics.

Support:

- accessible labels
- summaries
- alternative representations where appropriate
- keyboard interaction where applicable
- high-contrast considerations

---

# 79. Documentation for AI Agents

Documentation should include a machine-readable component composition section.

Example conceptual structure:

```text
Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter
```

Also document:

```text
Dependencies
Accessibility
Responsive rules
Tokens
Examples
```

This should be part of the documentation generation pipeline.

---

# 80. Registry + Package Relationship

The registry and npm package are complementary.

```text
                  Design System
                       │
             ┌─────────┴─────────┐
             │                   │
        npm package          registry
             │                   │
      compiled component     source component
             │                   │
      package mode           CLI/source mode
```

Do not make the registry the only distribution mechanism.

Do not make npm the only distribution mechanism.

---

# 81. Future Blocks

After all core components are stable, add higher-level blocks:

```text
Login
Signup
Dashboard
Settings
Profile
Navbar
Sidebar layouts
Data dashboard
Pricing section
Hero
Contact form
Admin layout
```

Blocks should be compositions of existing components.

Do not build blocks before the primitives and core components are stable.

---

# 82. Future Templates

Eventually provide:

```text
SaaS dashboard
Admin dashboard
E-commerce
CRM
Portfolio
Analytics
Authentication
Settings
```

These should demonstrate the component system without making the core package larger.

---

# 83. Future AI Integration

Because the system is intentionally structured and documented, future AI tooling can support:

```text
generate component
search component
explain component
modify component
create block
convert design to component
generate tests
generate documentation
```

The registry metadata and composition trees should be designed to support these workflows.

---

# 84. Migration Strategy

Eventually provide migration tooling for breaking releases.

Migration system should support:

```text
version detection
deprecated API detection
automatic replacements where safe
migration warnings
manual migration instructions
```

Do not make every major version a manual rewrite.

---

# 85. Contribution Model

Contributors should be required to provide:

- implementation
- tests
- accessibility tests
- responsive tests
- documentation
- examples
- changelog entry
- bundle impact
- dependency justification

A component PR should not be accepted based solely on visual appearance.

---

# 86. Pull Request Checklist

Every component PR should verify:

```text
[ ] API reviewed
[ ] Naming follows conventions
[ ] No unnecessary dependency
[ ] Accessibility tested
[ ] Keyboard tested
[ ] Mobile tested
[ ] Dark mode tested
[ ] RTL tested where applicable
[ ] SSR tested
[ ] Unit tests
[ ] Integration tests
[ ] Visual regression
[ ] Bundle impact reviewed
[ ] Documentation
[ ] Examples
[ ] Registry metadata
```

---

# 87. CI Requirements

PR pipeline:

```text
install
↓
format check
↓
lint
↓
typecheck
↓
unit tests
↓
integration tests
↓
a11y tests
↓
build
↓
bundle analysis
↓
visual tests
```

Use Nx affected-project logic so unrelated packages are not rebuilt unnecessarily.

---

# 88. Release Checklist

Before publishing:

```text
[ ] All tests pass
[ ] Package builds
[ ] npm artifact inspected
[ ] Clean Angular app installation succeeds
[ ] Secondary imports succeed
[ ] SSR succeeds
[ ] Hydration succeeds
[ ] Bundle budgets pass
[ ] Documentation updated
[ ] Changelog updated
[ ] Version correct
[ ] Peer dependencies correct
[ ] License correct
[ ] No development files included
```

---

# 89. What the AI Agent Must NOT Do

Do not:

1. build all components in one uncontrolled generation step
2. copy React code and mechanically translate it
3. introduce Tailwind as a mandatory dependency
4. introduce Angular Material as a runtime dependency for the entire library
5. create one giant component module
6. create a global CSS reset by default
7. add unnecessary third-party libraries
8. duplicate overlay/focus/menu logic
9. ignore accessibility until the end
10. ignore responsive behavior until the end
11. claim performance improvements without measurements
12. expose internal implementation APIs unnecessarily
13. create circular package dependencies
14. make heavy components mandatory dependencies
15. overwrite user source files silently through the CLI
16. make every component API completely different
17. sacrifice semantic HTML for visual convenience
18. optimize only for desktop
19. assume browser globals exist during SSR
20. treat the initial 64-component list as immutable

---

# 90. Required Development Sequence

The AI agent must work incrementally.

For each phase:

```text
Plan
↓
Implement
↓
Test
↓
Review
↓
Document
↓
Benchmark
↓
Commit
↓
Move to next phase
```

Do not proceed to the next architectural layer if the previous layer is fundamentally broken.

---

# 91. Required Final Architecture

The completed ecosystem should conceptually be:

```text
                         Angular UI Ecosystem
                                  │
            ┌─────────────────────┴─────────────────────┐
            │                                           │
       Package Mode                                Source Mode
            │                                           │
     @scope/ui                                  @scope/cli
            │                                           │
            ▼                                           ▼
   Standalone Components                       Registry Components
            │                                           │
            └─────────────────────┬─────────────────────┘
                                  │
                           Design System
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
          Tokens              Primitives             A11y
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  │
                          64+ Components
                                  │
                ┌─────────────────┼─────────────────┐
                │                 │                 │
           Documentation      Testing           Tooling
                │                 │                 │
                └─────────────────┼─────────────────┘
                                  │
                               CI/CD
                                  │
                                npm
```

---

# 92. Final Acceptance Criteria

The project can be considered production-ready only when:

### Architecture

- Nx monorepo exists
- dependency graph is clean
- package boundaries are clear
- primitives are separated from components

### Angular

- standalone components
- strict TypeScript
- strict templates
- Angular-native APIs
- modern Angular architecture

### Design

- coherent design tokens
- light/dark themes
- responsive design
- RTL support
- consistent states

### Components

- initial shadcn-inspired catalog implemented
- composition is predictable
- public APIs documented
- dependencies documented

### Accessibility

- keyboard support
- focus management
- ARIA
- semantic HTML
- screen-reader considerations
- reduced motion

### Performance

- tree-shaking
- secondary entry points
- bundle budgets
- no unnecessary dependencies
- heavy components isolated
- no unnecessary runtime work

### Distribution

- npm package
- CLI
- registry
- source installation
- clean-project installation test

### Quality

- unit tests
- integration tests
- accessibility tests
- visual regression
- SSR tests
- hydration tests
- browser testing

### Developer Experience

- documentation website
- playground
- examples
- clear errors
- migration documentation
- changelog

---

# 93. Final Instruction to the AI Coding Agent

Treat this document as the **system-design contract** for the project.

Do not interpret the project as "make 64 Angular components."

Interpret it as:

> Build a production-grade Angular-native UI ecosystem inspired by shadcn/ui's principles of open code, composition, beautiful defaults, customization, registry-based distribution and AI-friendly structure, while providing a conventional npm installation experience similar to a traditional Angular component library.

The implementation must prioritize:

```text
Correctness
Accessibility
Composition
Developer Experience
Responsive Design
Performance
Tree-shaking
Maintainability
SSR/Hydration
Testing
Documentation
```

in that order when trade-offs are necessary.

When a design decision is ambiguous:

1. Prefer the simpler architecture.
2. Prefer Angular-native APIs.
3. Prefer composition over configuration.
4. Prefer CSS variables over runtime theme machinery.
5. Prefer fewer dependencies.
6. Prefer tree-shakable modules.
7. Prefer accessible semantic HTML.
8. Prefer mobile-first responsive behavior.
9. Prefer explicit APIs over magic.
10. Prefer source that an AI agent can understand and modify.

Do not declare the project complete until the Definition of Done and Final Acceptance Criteria have been satisfied.

---

## Official References

- shadcn/ui introduction: https://ui.shadcn.com/docs
- shadcn/ui components: https://ui.shadcn.com/docs/components
- shadcn components configuration: https://ui.shadcn.com/docs/components-json
- shadcn registry: https://ui.shadcn.com/docs/registry/registry-index
- shadcn registry examples: https://ui.shadcn.com/docs/registry/examples
- Angular components: https://angular.dev/guide/components
- Angular library generation: https://angular.dev/cli/generate/library

