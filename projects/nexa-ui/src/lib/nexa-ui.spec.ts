import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexaUi } from './nexa-ui';

describe('NexaUi', () => {
  let component: NexaUi;
  let fixture: ComponentFixture<NexaUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexaUi],
    }).compileComponents();

    fixture = TestBed.createComponent(NexaUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
