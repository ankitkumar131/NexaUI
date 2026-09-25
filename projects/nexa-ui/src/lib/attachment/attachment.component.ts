import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { nexaCn } from '../utils/utils';

/**
 * NexaAttachment — file chip with kind icon, size, upload progress and actions.
 *
 * ```html
 * <nexa-attachment fileName="report.pdf" [fileSize]="245760" downloadHref="/files/report.pdf" (removed)="drop(file)" />
 * <nexa-attachment fileName="video.mp4" [fileSize]="10485760" [progress]="64" />
 * ```
 */
@Component({
  selector: 'nexa-attachment',
  standalone: true,
  templateUrl: './attachment.component.html',
  styleUrl: './attachment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaAttachmentComponent {
  readonly fileName = input('');
  /** Bytes. */
  readonly fileSize = input<number | undefined>(undefined);
  /** Upload % (`null`/`undefined` = complete, no bar). */
  readonly progress = input<number | null | undefined>(undefined);
  readonly downloadHref = input<string | undefined>(undefined);
  readonly removable = input(true);
  readonly extraClass = input('');

  readonly removed = output<void>();

  protected readonly hostClasses = computed(() => nexaCn('nexa-attachment-host', this.extraClass()));

  protected readonly icon = computed(() => {
    const ext = this.fileName().split('.').pop()?.toLowerCase() ?? '';
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return '🖼';
    if (['mp4', 'mov', 'webm', 'avi'].includes(ext)) return '🎬';
    if (['mp3', 'wav', 'ogg'].includes(ext)) return '🎵';
    if (['pdf'].includes(ext)) return '📕';
    if (['zip', 'rar', 'tar', 'gz'].includes(ext)) return '🗜';
    if (['ts', 'js', 'html', 'css', 'json', 'py'].includes(ext)) return '💻';
    if (['doc', 'docx', 'txt', 'md'].includes(ext)) return '📝';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊';
    return '📎';
  });

  protected readonly sizeLabel = computed(() => {
    const bytes = this.fileSize();
    if (bytes === undefined) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  });

  protected readonly pct = computed(() => {
    const p = this.progress();
    return p === null || p === undefined ? null : Math.min(100, Math.max(0, Math.round(p)));
  });

  protected remove(): void {
    this.removed.emit();
  }
}
