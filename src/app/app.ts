import { Component, inject } from '@angular/core';
import {
  NexaAspectRatioComponent,
  NexaAvatarComponent,
  NexaBadgeComponent,
  NexaButtonComponent,
  NexaKbdComponent,
  NexaLabelComponent,
  NexaSeparatorComponent,
  NexaThemeService,
  NexaTypographyComponent,
} from 'nexa-ui';

@Component({
  imports: [
    NexaButtonComponent,
    NexaTypographyComponent,
    NexaBadgeComponent,
    NexaAvatarComponent,
    NexaLabelComponent,
    NexaKbdComponent,
    NexaSeparatorComponent,
    NexaAspectRatioComponent,
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly theme = inject(NexaThemeService);

  protected toggleTheme(): void {
    this.theme.toggle();
  }
}
