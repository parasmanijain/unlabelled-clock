import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CitiesService } from './services/cities.service';
import { UnlabelledClockComponent } from './components/unlabelled-clock/unlabelled-clock.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [UnlabelledClockComponent],
  providers: [CitiesService],
})
export class AppComponent implements OnInit, OnDestroy {
  public cities: any[] = [];
  private destroy$ = new Subject<void>();
  private citiesService = inject(CitiesService);

  ngOnInit(): void {
    this.getCities();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getCities() {
    this.citiesService.getCities().subscribe((res) => {
      this.cities = res;
    });
  }
}
