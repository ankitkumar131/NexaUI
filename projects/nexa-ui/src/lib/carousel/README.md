# NexaCarousel + NexaCarouselSlide

Accessible slideshow: arrows, dots, keyboard control and hover/focus-pausing autoplay.

## Import

```ts
import { NexaCarouselComponent, NexaCarouselSlideComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-carousel [(index)]="slide" [autoplay]="5000" ariaLabel="Product tour">
  <nexa-carousel-slide>
    <img src="a.jpg" alt="Dashboard overview" style="height:16rem" />
  </nexa-carousel-slide>
  <nexa-carousel-slide>
    <div style="padding:2rem">Any content — not just images.</div>
  </nexa-carousel-slide>
</nexa-carousel>
```

## API (`nexa-carousel`)

| Input | Type | Default | Description |
|---|---|---|---|
| `index` | `model<number>` | `0` | Two-way slide index (wraps when `loop`) |
| `autoplay` | `number` | `0` | ms between advances (`0` = off) |
| `loop` | `boolean` | `true` | Wrap around ends |
| `showArrows` / `showDots` | `boolean` | `true` | Controls |
| `ariaLabel` / `ariaRoledescription` | `string` | — | Region labelling |
| `extraClass` | `string` | `''` | Extra host classes |

## Accessibility

`region` + `aria-roledescription="carousel"`, dot `tablist`, live slide counter (`off` during autoplay to avoid chatter), arrows/Home/End keyboard map. Autoplay always pauses on hover and focus — never trap or surprise users.
