import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnlabelledClockComponent } from './unlabelled-clock.component';

describe('UnlabelledClockComponent', () => {
  let component: UnlabelledClockComponent;
  let fixture: ComponentFixture<UnlabelledClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnlabelledClockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlabelledClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default timezone if not provided', () => {
    component.timezone = '';
    component.ngOnInit();
    expect(component.timezone).toBeTruthy();
  });

  it('should set default city if not provided', () => {
    component.city = '';
    component.ngOnInit();
    expect(component.city).toBe('local');
  });

  it('should have proper input bindings', () => {
    component.timezone = 'America/New_York';
    component.city = 'New York';
    component.displayName = true;
    component.displayDate = true;

    expect(component.timezone).toBe('America/New_York');
    expect(component.city).toBe('New York');
    expect(component.displayName).toBe(true);
    expect(component.displayDate).toBe(true);
  });
});
