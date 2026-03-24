import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { format, getHours, getMinutes, getSeconds } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@Component({
  selector: 'app-unlabelled-clock',
  templateUrl: './unlabelled-clock.component.html',
  styleUrls: ['./unlabelled-clock.component.scss'],
  standalone: true,
})
export class UnlabelledClockComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() timezone = '';
  @Input() city = '';
  @Input() displayName = false;
  @Input() displayDate = false;

  private intervalId: number | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private readonly secHandLength = 60;

  ngOnInit(): void {
    if (!this.timezone) {
      this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    if (!this.city) {
      this.city = 'local';
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngAfterViewInit(): void {
    this.intervalId = window.setInterval(() => {
      this.canvas = document.getElementById(
        `unlabelledClockCanvas-${this.timezone}-${this.city}`,
      ) as HTMLCanvasElement;

      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
        if (this.ctx) {
          const now = new Date();
          const zonedDate = toZonedTime(now, this.timezone);
          this.showClock(this.ctx, this.canvas, zonedDate);
        }
      }
    }, 1000);
  }

  private showClock(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, date: Date): void {
    // CLEAR EVERYTHING ON THE CANVAS. RE-DRAW NEW ELEMENTS EVERY SECOND.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.outerDial1(ctx, canvas);
    this.outerDial2(ctx, canvas);
    this.centerDial(ctx, canvas, date);
    this.markTheHours(ctx, canvas);
    this.markTheSeconds(ctx, canvas);
    this.showSeconds(ctx, canvas, date);
    this.showMinutes(ctx, canvas, date);
    this.showHours(ctx, canvas, date);
  }

  private outerDial1(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, this.secHandLength + 10, 0, Math.PI * 2);
    ctx.strokeStyle = '#92949C';
    ctx.stroke();
  }

  private outerDial2(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, this.secHandLength + 7, 0, Math.PI * 2);
    ctx.strokeStyle = '#929BAC';
    ctx.stroke();
  }

  private centerDial(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, date: Date): void {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.fillStyle = '#353535';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    if (this.displayDate) {
      const formattedDate = format(date, 'do-MMM-yyyy');
      ctx.fillText(formattedDate, canvas.width / 2, 0.3 * canvas.height);
    }
    if (this.displayName) {
      ctx.fillText(this.city, canvas.width / 2, 0.7 * canvas.height);
    }

    ctx.strokeStyle = '#0C3D4A';
    ctx.stroke();
  }

  private markTheHours(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    for (let i = 0; i < 12; i++) {
      const angle = ((i - 3) * (Math.PI * 2)) / 12; // THE ANGLE TO MARK.
      ctx.lineWidth = 1; // HAND WIDTH.
      ctx.beginPath();

      const x1 = canvas.width / 2 + Math.cos(angle) * this.secHandLength;
      const y1 = canvas.height / 2 + Math.sin(angle) * this.secHandLength;
      const x2 = canvas.width / 2 + Math.cos(angle) * (this.secHandLength - this.secHandLength / 7);
      const y2 =
        canvas.height / 2 + Math.sin(angle) * (this.secHandLength - this.secHandLength / 7);

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      ctx.strokeStyle = '#466B76';
      ctx.stroke();
    }
  }

  private markTheSeconds(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    for (let i = 0; i < 60; i++) {
      const angle = ((i - 3) * (Math.PI * 2)) / 60; // THE ANGLE TO MARK.
      ctx.lineWidth = 1; // HAND WIDTH.
      ctx.beginPath();

      const x1 = canvas.width / 2 + Math.cos(angle) * this.secHandLength;
      const y1 = canvas.height / 2 + Math.sin(angle) * this.secHandLength;
      const x2 =
        canvas.width / 2 + Math.cos(angle) * (this.secHandLength - this.secHandLength / 30);
      const y2 =
        canvas.height / 2 + Math.sin(angle) * (this.secHandLength - this.secHandLength / 30);

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      ctx.strokeStyle = '#C4D1D5';
      ctx.stroke();
    }
  }

  private showSeconds(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, date: Date): void {
    const sec = getSeconds(date);
    const angle = Math.PI * 2 * (sec / 60) - (Math.PI * 2) / 4;
    ctx.lineWidth = 0.5; // HAND WIDTH.

    ctx.beginPath();
    // START FROM CENTER OF THE CLOCK.
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    // DRAW THE LENGTH.
    ctx.lineTo(
      canvas.width / 2 + Math.cos(angle) * this.secHandLength,
      canvas.height / 2 + Math.sin(angle) * this.secHandLength,
    );

    // DRAW THE TAIL OF THE SECONDS HAND.
    ctx.moveTo(canvas.width / 2, canvas.height / 2); // START FROM CENTER.
    // DRAW THE LENGTH.
    ctx.lineTo(canvas.width / 2 - Math.cos(angle) * 20, canvas.height / 2 - Math.sin(angle) * 20);

    ctx.strokeStyle = '#586A73'; // COLOR OF THE HAND.
    ctx.stroke();
  }

  private showMinutes(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, date: Date): void {
    const min = getMinutes(date);
    const angle = Math.PI * 2 * (min / 60) - (Math.PI * 2) / 4;
    ctx.lineWidth = 1.5; // HAND WIDTH.

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2); // START FROM CENTER.
    // DRAW THE LENGTH.
    ctx.lineTo(
      canvas.width / 2 + (Math.cos(angle) * this.secHandLength) / 1.1,
      canvas.height / 2 + (Math.sin(angle) * this.secHandLength) / 1.1,
    );

    ctx.strokeStyle = '#999'; // COLOR OF THE HAND.
    ctx.stroke();
  }

  private showHours(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, date: Date): void {
    const hour = getHours(date);
    const min = getMinutes(date);
    const angle = Math.PI * 2 * ((hour * 5 + (min / 60) * 5) / 60) - (Math.PI * 2) / 4;
    ctx.lineWidth = 1.5; // HAND WIDTH.

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2); // START FROM CENTER.
    // DRAW THE LENGTH.
    ctx.lineTo(
      canvas.width / 2 + (Math.cos(angle) * this.secHandLength) / 1.5,
      canvas.height / 2 + (Math.sin(angle) * this.secHandLength) / 1.5,
    );

    ctx.strokeStyle = '#000'; // COLOR OF THE HAND.
    ctx.stroke();
  }
}
