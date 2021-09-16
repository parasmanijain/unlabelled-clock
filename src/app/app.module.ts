import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CitiesService } from './services/cities.service';
import { UnlabelledClockComponent } from './components/unlabelled-clock/unlabelled-clock.component';


@NgModule({
  declarations: [
    AppComponent,
    UnlabelledClockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
