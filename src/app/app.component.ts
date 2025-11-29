import { Component, OnInit } from '@angular/core';
import { CitiesService } from './services/cities.service';
import { UnlabelledClockComponent } from './components/unlabelled-clock/unlabelled-clock.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, UnlabelledClockComponent],
  providers: [CitiesService],
})
export class AppComponent implements OnInit {
  public cities: any[] = [];

  constructor(private citiesService: CitiesService) {}
  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.citiesService.getCities().subscribe((res) => {
      this.cities = res;
    });
  }
}
