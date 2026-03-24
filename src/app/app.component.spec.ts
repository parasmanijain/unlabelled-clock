import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CitiesService } from './services/cities.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), CitiesService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize empty cities array', () => {
    expect(component.cities).toEqual([]);
  });

  it('should implement OnDestroy', () => {
    expect(component.ngOnDestroy).toBeDefined();
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should have proper component structure', () => {
    expect(component.cities).toBeDefined();
    expect(Array.isArray(component.cities)).toBe(true);
  });
});
