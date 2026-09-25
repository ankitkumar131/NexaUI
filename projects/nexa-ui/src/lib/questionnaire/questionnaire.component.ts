import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { nexaCn } from '../utils/utils';
import { NexaButtonComponent } from '../button/button.component';
import { NexaProgressComponent } from '../progress/progress.component';

export interface NexaQuestionStep {
  id: string;
  title: string;
  description?: string;
}

/**
 * NexaQuestionnaire — multi-step wizard chrome (progress, step list, nav).
 * Step CONTENT is user-owned via `@if (step() === n)` projection.
 *
 * ```html
 * <nexa-questionnaire [steps]="steps" [(current)]="step" [nextDisabled]="!valid()" (completed)="submit()">
 *   @if (step() === 0) { …name fields… }
 *   @if (step() === 1) { …plan picker… }
 * </nexa-questionnaire>
 * ```
 */
@Component({
  selector: 'nexa-questionnaire',
  standalone: true,
  imports: [NexaButtonComponent, NexaProgressComponent],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaQuestionnaireComponent {
  readonly steps = input<NexaQuestionStep[]>([]);
  readonly current = model(0);
  readonly backText = input('Back');
  readonly nextText = input('Next');
  readonly finishText = input('Finish');
  readonly showProgress = input(true);
  readonly allowSkip = input(false);
  readonly nextDisabled = input(false);
  readonly ariaLabel = input('Questionnaire');
  readonly extraClass = input('');

  readonly completed = output<void>();

  protected readonly hostClasses = computed(() => nexaCn('nexa-qn-host', this.extraClass()));
  protected readonly total = computed(() => this.steps().length);
  protected readonly safeCurrent = computed(() => {
    const total = this.total();
    if (!total) return 0;
    return Math.min(total - 1, Math.max(0, this.current()));
  });
  protected readonly isFirst = computed(() => this.safeCurrent() === 0);
  protected readonly isLast = computed(() => this.safeCurrent() === this.total() - 1);
  protected readonly pct = computed(() => {
    const total = this.total();
    return total ? Math.round(((this.safeCurrent() + 1) / total) * 100) : 0;
  });

  protected back(): void {
    this.current.set(Math.max(0, this.safeCurrent() - 1));
  }

  protected next(): void {
    if (this.nextDisabled()) return;
    if (this.isLast()) this.completed.emit();
    else this.current.set(this.safeCurrent() + 1);
  }

  protected goto(index: number): void {
    if (!this.allowSkip()) return;
    this.current.set(Math.min(this.total() - 1, Math.max(0, index)));
  }

  protected stepState(index: number): 'done' | 'current' | 'todo' {
    const current = this.safeCurrent();
    if (index < current) return 'done';
    if (index === current) return 'current';
    return 'todo';
  }
}
