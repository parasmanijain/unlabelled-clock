import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CitiesService } from './services/cities.service';
import { UnlabelledClockComponent } from './components/unlabelled-clock/unlabelled-clock.component';


@NgModule({ declarations: [
        AppComponent,
        UnlabelledClockComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule], providers: [CitiesService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
