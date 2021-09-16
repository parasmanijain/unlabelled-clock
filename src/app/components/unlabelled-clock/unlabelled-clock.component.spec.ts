import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlabelledClockComponent } from './unlabelled-clock.component';

describe('UnlabelledClockComponent', () => {
  let component: UnlabelledClockComponent;
  let fixture: ComponentFixture<UnlabelledClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlabelledClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlabelledClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
