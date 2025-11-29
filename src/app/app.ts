import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('unlabelled-clock');
}
