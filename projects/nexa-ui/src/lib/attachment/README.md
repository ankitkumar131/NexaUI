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

## Live upload pattern

Pair a native file input with per-file progress signals. While `0 < progress < 100` the bar shows a gentle sheen; set `progress` to `null` when done to hide the bar:

```html
<input #pick type="file" multiple hidden (change)="onFiles($event)" />
<nexa-button variant="outline" (pressed)="pick.click()">Choose files…</nexa-button>
@for (u of uploads(); track u.id) {
  <nexa-attachment [fileName]="u.name" [fileSize]="u.size" [progress]="u.progress" (removed)="drop(u.id)" />
}
```

```ts
protected readonly uploads = signal<{ id: number; name: string; size: number; progress: number | null }[]>([]);

protected onFiles(e: Event): void {
  const files = Array.from((e.target as HTMLInputElement).files ?? []);
  for (const f of files) {
    const id = nextId++;
    this.uploads.update((l) => [...l, { id, name: f.name, size: f.size, progress: 0 }]);
    this.tick(id); // poll XHR/fetch progress, then set progress: null
  }
  (e.target as HTMLInputElement).value = '';
}
```

New attachments slide/fade in (`--nexa-attachment-enter-duration`, default `300ms`).
