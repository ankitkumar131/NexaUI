import { Component, inject, signal } from '@angular/core';
import {
  NexaAspectRatioComponent,
  NexaAvatarComponent,
  NexaBadgeComponent,
  NexaButtonComponent,
  NexaCheckboxComponent,
  NexaFieldComponent,
  NexaInputGroupComponent,
  NexaInputOtpComponent,
  NexaInputComponent,
  NexaKbdComponent,
  NexaLabelComponent,
  NexaNativeSelectComponent,
  NexaRadioGroupComponent,
  NexaSelectComponent,
  NexaSeparatorComponent,
  NexaSliderComponent,
  NexaSwitchComponent,
  NexaTextareaComponent,
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
    NexaInputComponent,
    NexaTextareaComponent,
    NexaCheckboxComponent,
    NexaRadioGroupComponent,
    NexaSwitchComponent,
    NexaSliderComponent,
    NexaSelectComponent,
    NexaNativeSelectComponent,
    NexaInputOtpComponent,
    NexaInputGroupComponent,
    NexaFieldComponent,
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly theme = inject(NexaThemeService);

  // ---- form demos ----
  protected readonly name = signal('');
  protected readonly bio = signal('');
  protected readonly agree = signal(false);
  protected readonly newsletter = signal(true);
  protected readonly plan = signal<string | undefined>('pro');
  protected readonly notifications = signal(true);
  protected readonly volume = signal(40);
  protected readonly fruit = signal<string | undefined>('apple');
  protected readonly country = signal<string | undefined>(undefined);
  protected readonly otp = signal('');
  protected readonly amount = signal('');
  protected readonly email = signal('');

  protected readonly planOptions = [
    { value: 'free', label: 'Free', description: 'For side projects' },
    { value: 'pro', label: 'Pro', description: 'For growing teams' },
    { value: 'enterprise', label: 'Enterprise', description: 'SSO, audit logs, SLA' },
  ];

  protected readonly fruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'mango', label: 'Mango', disabled: true },
    { value: 'orange', label: 'Orange' },
  ];

  protected readonly countryOptions = [
    { value: 'in', label: 'India' },
    { value: 'us', label: 'United States' },
    { value: 'de', label: 'Germany' },
    { value: 'jp', label: 'Japan' },
  ];

  protected toggleTheme(): void {
    this.theme.toggle();
  }
}
