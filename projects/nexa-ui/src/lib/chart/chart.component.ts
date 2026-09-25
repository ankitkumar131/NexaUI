import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { nexaCn } from '../utils/utils';

export interface NexaChartPoint {
  label: string;
  value: number;
}

export type NexaChartType = 'bar' | 'line' | 'donut';

/**
 * NexaChart — dependency-free SVG charts (bar / line / donut) with an
 * accessible text summary and screen-reader data list.
 *
 * ```html
 * <nexa-chart type="bar" [data]="[{label:'Mon',value:12},{label:'Tue',value:19}]" />
 * ```
 */
@Component({
  selector: 'nexa-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
})
export class NexaChartComponent {
  readonly type = input<NexaChartType>('bar');
  readonly data = input<NexaChartPoint[]>([]);
  readonly height = input('12rem');
  readonly showLegend = input(true);
  readonly showValues = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly extraClass = input('');

  protected readonly hostClasses = computed(() =>
    nexaCn('nexa-chart-host', `nexa-chart-host--${this.type()}`, this.extraClass())
  );

  protected readonly max = computed(() => Math.max(0, ...this.data().map((d) => d.value)));
  protected readonly total = computed(() => this.data().reduce((s, d) => s + Math.max(0, d.value), 0));

  protected readonly summary = computed(() => {
    const data = this.data();
    if (!data.length) return 'Empty chart';
    const top = [...data].sort((a, b) => b.value - a.value)[0];
    return `${this.type} chart with ${data.length} points, total ${this.total()}, highest ${top?.label} ${top?.value}`;
  });

  /** Line-chart geometry in a 300×120 box. */
  protected readonly lineGeom = computed(() => {
    const data = this.data();
    const max = this.max() || 1;
    const n = data.length;
    const pts = data.map((d, i) => {
      const x = n === 1 ? 150 : 8 + (i / (n - 1)) * 284;
      const y = 112 - (Math.max(0, d.value) / max) * 96;
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, ...d };
    });
    const line = pts.map((p) => `${p.x},${p.y}`).join(' ');
    const area = `8,112 ${line} ${n === 1 ? '292,112' : '292,112'}`;
    return { pts, line, area };
  });

  /** Donut segments as stroked circles. */
  protected readonly donutSegs = computed(() => {
    const total = this.total();
    const r = 45;
    const c = 2 * Math.PI * r;
    let acc = 0;
    return this.data()
      .filter((d) => d.value > 0)
      .map((d, i) => {
        const frac = total > 0 ? d.value / total : 0;
        const seg = {
          ...d,
          dash: `${(frac * c).toFixed(2)} ${(c - frac * c).toFixed(2)}`,
          angle: (acc / (total || 1)) * 360,
          color: this.palette(i),
        };
        acc += d.value;
        return seg;
      });
  });

  protected palette(i: number): string {
    return `var(--nexa-chart-${(i % 5) + 1})`;
  }

  protected barHeight(value: number): number {
    const max = this.max();
    return max > 0 ? Math.max(2, Math.round((Math.max(0, value) / max) * 100)) : 0;
  }
}
