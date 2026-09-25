import { Component, inject, signal } from '@angular/core';
import {
  NexaAlertDialogComponent,
  NexaAspectRatioComponent,
  NexaAvatarComponent,
  NexaBadgeComponent,
  NexaButtonComponent,
  NexaCheckboxComponent,
  NexaContextMenuComponent,
  NexaDialogComponent,
  NexaDrawerComponent,
  NexaDropdownMenuComponent,
  NexaFieldComponent,
  NexaHoverCardComponent,
  NexaInputGroupComponent,
  NexaInputOtpComponent,
  NexaInputComponent,
  NexaKbdComponent,
  NexaLabelComponent,
  NexaMenuItem,
  NexaNativeSelectComponent,
  NexaPopoverComponent,
  NexaRadioGroupComponent,
  NexaSelectComponent,
  NexaSeparatorComponent,
  NexaSheetComponent,
  NexaSliderComponent,
  NexaSwitchComponent,
  NexaTextareaComponent,
  NexaThemeService,
  NexaTooltipComponent,
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
    NexaDialogComponent,
    NexaAlertDialogComponent,
    NexaPopoverComponent,
    NexaTooltipComponent,
    NexaHoverCardComponent,
    NexaDropdownMenuComponent,
    NexaContextMenuComponent,
    NexaDrawerComponent,
    NexaSheetComponent,
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

  // ---- overlay demos ----
  protected readonly dialogOpen = signal(false);
  protected readonly alertOpen = signal(false);
  protected readonly deleting = signal(false);
  protected readonly alertResult = signal('—');
  protected readonly menuChoice = signal('—');
  protected readonly ctxChoice = signal('—');
  protected readonly drawerOpen = signal(false);
  protected readonly sheetOpen = signal(false);

  protected readonly menuItems = [
    { label: 'Edit', value: 'edit', hint: '⌘E' },
    { label: 'Duplicate', value: 'duplicate', hint: '⌘D' },
    { label: 'Archive', value: 'archive' },
    { label: 'Delete', value: 'delete', destructive: true, separatorBefore: true },
  ];

  protected toggleTheme(): void {
    this.theme.toggle();
  }

  protected confirmDelete(): void {
    this.deleting.set(true);
    setTimeout(() => {
      this.deleting.set(false);
      this.alertOpen.set(false);
      this.alertResult.set('deleted at ' + new Date().toLocaleTimeString());
    }, 900);
  }

  protected onMenu(item: NexaMenuItem): void {
    this.menuChoice.set(item.label);
  }

  protected onCtx(item: NexaMenuItem): void {
    this.ctxChoice.set(item.label);
  }
}
