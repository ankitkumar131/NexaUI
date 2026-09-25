import { ChangeDetectionStrategy, Component, ElementRef, computed, contentChildren, effect, input, signal, viewChild } from '@angular/core';
import { nexaCn } from '../utils/utils';
import { NexaMessageComponent } from '../message/message.component';

/**
 * NexaMessageScroller — chat viewport that sticks to the newest message and
 * offers a jump-to-bottom button with unread count when scrolled up.
 *
 * ```html
 * <nexa-message-scroller maxHeight="24rem">
 *   @for (m of messages(); track m.id) {
 *     <nexa-message [from]="m.from">{{ m.text }}</nexa-message>
 *   }
 * </nexa-message-scroller>
 * ```
 */
@Component({
  selector: 'nexa-message-scroller',
  standalone: true,
  templateUrl: './message-scroller.component.html',
  styleUrl: './message-scroller.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaMessageScrollerComponent {
  readonly maxHeight = input('22rem');
  readonly stickToBottom = input(true);
  readonly showJump = input(true);
  readonly ariaLabel = input('Messages');
  readonly extraClass = input('');

  private readonly viewportRef = viewChild<ElementRef<HTMLDivElement>>('viewport');
  protected readonly messages = contentChildren(NexaMessageComponent);
  protected readonly nearBottom = signal(true);
  protected readonly unread = signal(0);

  constructor() {
    effect(() => {
      // Re-runs whenever the projected message count changes.
      const count = this.messages().length;
      if (this.stickToBottom() && this.nearBottom()) {
        this.scrollToBottom(false);
      } else if (count > 0 && !this.nearBottom()) {
        this.unread.update((u) => u + 1);
      }
    });
  }

  protected readonly hostClasses = computed(() => nexaCn('nexa-msg-scroll-host', this.extraClass()));

  protected onScroll(event: Event): void {
    const el = event.target as HTMLDivElement;
    const near = el.scrollHeight - el.scrollTop - el.clientHeight < 64;
    this.nearBottom.set(near);
    if (near) this.unread.set(0);
  }

  protected jump(): void {
    this.scrollToBottom(true);
    this.unread.set(0);
  }

  private scrollToBottom(smooth: boolean): void {
    const el = this.viewportRef()?.nativeElement;
    if (!el) return;
    // Defer so freshly projected messages have rendered.
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
    });
  }
}
