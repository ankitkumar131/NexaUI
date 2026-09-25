import { Component, inject, signal } from '@angular/core';
import {
  NexaAlertDialogComponent,
  NexaAccordionComponent,
  NexaAlertComponent,
  NexaCalendarComponent,
  NexaChartComponent,
  NexaDataTableComponent,
  NexaDatePickerComponent,
  NexaEmptyComponent,
  NexaMessageComponent,
  NexaProgressComponent,
  NexaSkeletonComponent,
  NexaSpinnerComponent,
  NexaTableBodyComponent,
  NexaTableCellComponent,
  NexaTableComponent,
  NexaTableFooterComponent,
  NexaTableHeadComponent,
  NexaTableHeaderComponent,
  NexaTableRowComponent,
  NexaToasterComponent,
  NexaToastService,
  NexaAccordionItemComponent,
  NexaBreadcrumbComponent,
  NexaCardActionComponent,
  NexaCardComponent,
  NexaCardContentComponent,
  NexaCardDescriptionComponent,
  NexaCardFooterComponent,
  NexaCardHeaderComponent,
  NexaCardTitleComponent,
  NexaCollapsibleComponent,
  NexaCommandComponent,
  NexaCommandItem,
  NexaMenubarComponent,
  NexaMenubarSelection,
  NexaNavigationMenuComponent,
  NexaPaginationComponent,
  NexaResizableComponent,
  NexaScrollAreaComponent,
  NexaSidebarComponent,
  NexaTabPanelDirective,
  NexaTabsComponent,
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
    NexaBreadcrumbComponent,
    NexaPaginationComponent,
    NexaNavigationMenuComponent,
    NexaMenubarComponent,
    NexaTabsComponent,
    NexaTabPanelDirective,
    NexaCommandComponent,
    NexaCardComponent,
    NexaCardHeaderComponent,
    NexaCardTitleComponent,
    NexaCardDescriptionComponent,
    NexaCardActionComponent,
    NexaCardContentComponent,
    NexaCardFooterComponent,
    NexaAccordionComponent,
    NexaAccordionItemComponent,
    NexaCollapsibleComponent,
    NexaResizableComponent,
    NexaScrollAreaComponent,
    NexaSidebarComponent,
    NexaAlertComponent,
    NexaToasterComponent,
    NexaProgressComponent,
    NexaSpinnerComponent,
    NexaSkeletonComponent,
    NexaEmptyComponent,
    NexaMessageComponent,
    NexaTableComponent,
    NexaTableHeaderComponent,
    NexaTableBodyComponent,
    NexaTableFooterComponent,
    NexaTableRowComponent,
    NexaTableHeadComponent,
    NexaTableCellComponent,
    NexaDataTableComponent,
    NexaCalendarComponent,
    NexaDatePickerComponent,
    NexaChartComponent,
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

  // ---- navigation + layout demos ----
  protected readonly crumbs = [
    { label: 'Home', href: '#breadcrumb' },
    { label: 'Library', href: '#breadcrumb' },
    { label: 'Components', href: '#breadcrumb' },
    { label: 'Navigation', href: '#breadcrumb' },
    { label: 'Breadcrumb' },
  ];
  protected readonly page = signal(1);
  protected readonly navItems = [
    { label: 'Home', href: '#navigation-menu' },
    { label: 'Components', href: '#card', children: [
      { label: 'Card', href: '#card', description: 'Content containers' },
      { label: 'Tabs', href: '#tabs', description: 'Tabbed interfaces' },
      { label: 'Accordion', href: '#accordion' },
    ]},
    { label: 'Showcase', href: '#command' },
  ];
  protected readonly menubarMenus = [
    { label: 'File', items: [
      { label: 'New file', hint: '\u2318N' },
      { label: 'Open\u2026', hint: '\u2318O' },
      { label: 'Delete', destructive: true, separatorBefore: true },
    ]},
    { label: 'Edit', items: [
      { label: 'Undo', hint: '\u2318Z' },
      { label: 'Redo', hint: '\u21e7\u2318Z' },
      { label: 'Find', hint: '\u2318F', separatorBefore: true },
    ]},
    { label: 'View', items: [
      { label: 'Zoom in', hint: '\u2318+' },
      { label: 'Zoom out', hint: '\u2318\u2212' },
    ]},
  ];
  protected readonly menubarChoice = signal('\u2014');
  protected readonly tabDefs = [
    { value: 'account', label: 'Account' },
    { value: 'password', label: 'Password' },
    { value: 'team', label: 'Team', disabled: true },
  ];
  protected readonly tab = signal('account');
  protected readonly cmdOpen = signal(false);
  protected readonly cmdChoice = signal('\u2014');
  protected readonly commands = [
    { label: 'Go to Dashboard', hint: '\u2318D', group: 'Navigate' },
    { label: 'Go to Settings', group: 'Navigate' },
    { label: 'Create project', hint: '\u2318N', group: 'Actions' },
    { label: 'Invite member', group: 'Actions' },
    { label: 'Toggle theme', hint: '\u2318T', group: 'Actions' },
    { label: 'Sign out', group: 'Account' },
  ];
  protected readonly moreOpen = signal(false);
  protected readonly split = signal(40);
  protected readonly sideOpen = signal(false);

  protected onMenubar(sel: NexaMenubarSelection): void {
    this.menubarChoice.set(sel.menu + ' \u2192 ' + sel.item.label);
  }

  protected onCommand(item: NexaCommandItem): void {
    this.cmdChoice.set(item.label);
  }

  // ---- feedback + data demos ----
  protected readonly toast = inject(NexaToastService);
  protected readonly uploadPct = signal(64);
  protected readonly showBanner = signal(true);
  protected readonly calDate = signal<Date | null>(null);
  protected readonly picked = signal<Date | null>(null);
  protected readonly teamCols = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'location', header: 'Location' },
    { key: 'age', header: 'Age', sortable: true, width: '4rem' },
  ];
  protected readonly teamRows = [
    { id: 1, name: 'Ada Lovelace', role: 'Engineer', location: 'London', age: 36 },
    { id: 2, name: 'Grace Hopper', role: 'Admiral', location: 'New York', age: 85 },
    { id: 3, name: 'Alan Turing', role: 'Scientist', location: 'Manchester', age: 41 },
    { id: 4, name: 'Katherine Johnson', role: 'Mathematician', location: 'Virginia', age: 101 },
    { id: 5, name: 'Linus Torvalds', role: 'Engineer', location: 'Helsinki', age: 55 },
    { id: 6, name: 'Margaret Hamilton', role: 'Engineer', location: 'Boston', age: 87 },
  ];
  protected readonly teamSel = signal<Array<string | number>>([]);
  protected readonly sales = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 19 },
    { label: 'Wed', value: 8 },
    { label: 'Thu', value: 24 },
    { label: 'Fri', value: 17 },
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
