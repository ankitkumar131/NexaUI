# NexaAttachment

File chip with kind-aware icon, formatted size, upload progress and download/remove actions. Built for chat apps and upload lists.

## Import

```ts
import { NexaAttachmentComponent } from 'nexa-ui';
```

## Usage

```html
<nexa-attachment fileName="report.pdf" [fileSize]="245760" downloadHref="/files/report.pdf" (removed)="drop('report.pdf')" />
<nexa-attachment fileName="video.mp4" [fileSize]="10485760" [progress]="uploadPct()" [removable]="false" />
```

## API

| Input | Type | Default | Description |
|---|---|---|---|
| `fileName` | `string` | `''` | File name (drives the icon) |
| `fileSize` | `number` | — | Bytes (formatted B/KB/MB) |
| `progress` | `number \| null` | — | Upload % bar (`null` = complete) |
| `downloadHref` | `string` | — | Shows download link |
| `removable` | `boolean` | `true` | Show ✕ |
| `extraClass` | `string` | `''` | Extra host classes |

| Output | Description |
|---|---|
| `removed` | ✕ clicked (parent drops the file) |

## Accessibility

Progress uses `progressbar` semantics; actions are labelled buttons. File names truncate with ellipsis but remain fully available to screen readers.
