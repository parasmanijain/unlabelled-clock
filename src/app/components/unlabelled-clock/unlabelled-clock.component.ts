import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import moment from "moment-timezone";

@Component({
  selector: "app-unlabelled-clock",
  templateUrl: "./unlabelled-clock.component.html",
  styleUrls: ["./unlabelled-clock.component.scss"],
  standalone: true,
})
export class UnlabelledClockComponent implements OnInit, AfterViewInit {
  @Input() timezone;
  @Input() city;
  @Input() displayName: boolean;
  @Input() displayDate: boolean;
  public interval;
  public canvas: any;
  public ctx: any;
  public date: any;
  public angle: any;
  public secHandLength: any;
  constructor() {
    console.log("asdasda");
  }

  ngOnInit() {
    if (!this.timezone) {
      this.timezone = moment.tz.guess();
    }
    if (!this.city) {
      this.city = "local";
    }
  }

  ngAfterViewInit() {
    this.interval = setInterval(() => {
      this.canvas = <HTMLCanvasElement>(
        document.getElementById(
          "unlabelledClockCanvas-" + this.timezone + "-" + this.city
        )
      );
      this.ctx = this.canvas.getContext("2d");
      this.date = moment().tz(this.timezone);
      this.secHandLength = 60;
      this.showClock(
        this.ctx,
        this.canvas,
        this.date,
        this.secHandLength,
        this.angle
      );
    }, 1000);
  }
  showClock(ctx: any, canvas: any, date: any, secHandLength: any, angle: any) {
    // CLEAR EVERYTHING ON THE CANVAS. RE-DRAW NEW ELEMENTS EVERY SECOND.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.outerDial1(ctx, canvas, secHandLength);
    this.outerDial2(ctx, canvas, secHandLength);
    this.centerDial(ctx, canvas, date);
    this.markTheHours(ctx, canvas, secHandLength, angle);
    this.markTheSeconds(ctx, canvas, secHandLength, angle);
    this.showSeconds(ctx, canvas, date, secHandLength, angle);
    this.showMinutes(ctx, canvas, date, secHandLength, angle);
    this.showHours(ctx, canvas, date, secHandLength, angle);
  }

  outerDial1(ctx: any, canvas: any, secHandLength: any) {
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      secHandLength + 10,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = "#92949C";
    ctx.stroke();
  }

  outerDial2(ctx: any, canvas: any, secHandLength: any) {
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      secHandLength + 7,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = "#929BAC";
    ctx.stroke();
  }

  centerDial(ctx: any, canvas: any, date: any) {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.fillStyle = "#353535";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    if (this.displayDate) {
      ctx.fillText(
        date.format("Do-MMM-YYYY"),
        canvas.width / 2,
        0.3 * canvas.height
      );
    }
    if (this.displayName) {
      ctx.fillText(this.city, canvas.width / 2, 0.7 * canvas.height);
    }
    ctx.strokeStyle = "#0C3D4A";
    ctx.stroke();
  }

  markTheHours(ctx: any, canvas: any, secHandLength: any, angle: any) {
    for (let i = 0; i < 12; i++) {
      angle = ((i - 3) * (Math.PI * 2)) / 12; // THE ANGLE TO MARK.
      ctx.lineWidth = 1; // HAND WIDTH.
      ctx.beginPath();

      const x1 = canvas.width / 2 + Math.cos(angle) * secHandLength;
      const y1 = canvas.height / 2 + Math.sin(angle) * secHandLength;
      const x2 =
        canvas.width / 2 +
        Math.cos(angle) * (secHandLength - secHandLength / 7);
      const y2 =
        canvas.height / 2 +
        Math.sin(angle) * (secHandLength - secHandLength / 7);

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      ctx.strokeStyle = "#466B76";
      ctx.stroke();
    }
  }

  markTheSeconds(ctx: any, canvas: any, secHandLength: any, angle: any) {
    for (let i = 0; i < 60; i++) {
      angle = ((i - 3) * (Math.PI * 2)) / 60; // THE ANGLE TO MARK.
      ctx.lineWidth = 1; // HAND WIDTH.
      ctx.beginPath();

      const x1 = canvas.width / 2 + Math.cos(angle) * secHandLength;
      const y1 = canvas.height / 2 + Math.sin(angle) * secHandLength;
      const x2 =
        canvas.width / 2 +
        Math.cos(angle) * (secHandLength - secHandLength / 30);
      const y2 =
        canvas.height / 2 +
        Math.sin(angle) * (secHandLength - secHandLength / 30);

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      ctx.strokeStyle = "#C4D1D5";
      ctx.stroke();
    }
  }

  showSeconds(
    ctx: any,
    canvas: any,
    date: any,
    secHandLength: any,
    angle: any
  ) {
    const sec = date.seconds();
    angle = Math.PI * 2 * (sec / 60) - (Math.PI * 2) / 4;
    ctx.lineWidth = 0.5; // HAND WIDTH.

    ctx.beginPath();
    // START FROM CENTER OF THE CLOCK.
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    // DRAW THE LENGTH.
    ctx.lineTo(
      canvas.width / 2 + Math.cos(angle) * secHandLength,
      canvas.height / 2 + Math.sin(angle) * secHandLength
    );

    // DRAW THE TAIL OF THE SECONDS HAND.
    ctx.moveTo(canvas.width / 2, canvas.height / 2); // START FROM CENTER.
    // DRAW THE LENGTH.
    ctx.lineTo(
      canvas.width / 2 - Math.cos(angle) * 20,
      canvas.height / 2 - Math.sin(angle) * 20
    );

    ctx.strokeStyle = "#586A73"; // COLOR OF THE HAND.
    ctx.stroke();
  }

  showMinutes(
    ctx: any,
    canvas: any,
    date: any,
    secHandLength: any,
    angle: any
  ) {
    const min = date.minutes();
    angle = Math.PI * 2 * (min / 60) - (Math.PI * 2) / 4;
    ctx.lineWidth = 1.5; // HAND WIDTH.

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2); // START FROM CENTER.
    // DRAW THE LENGTH.
    ctx.lineTo(
      canvas.width / 2 + (Math.cos(angle) * secHandLength) / 1.1,
      canvas.height / 2 + (Math.sin(angle) * secHandLength) / 1.1
    );

    ctx.strokeStyle = "#999"; // COLOR OF THE HAND.
    ctx.stroke();
  }

  showHours(ctx: any, canvas: any, date: any, secHandLength: any, angle: any) {
    const hour = date.hours();
    const min = date.minutes();
    angle =
      Math.PI * 2 * ((hour * 5 + (min / 60) * 5) / 60) - (Math.PI * 2) / 4;
    ctx.lineWidth = 1.5; // HAND WIDTH.

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2); // START FROM CENTER.
    // DRAW THE LENGTH.
    ctx.lineTo(
      canvas.width / 2 + (Math.cos(angle) * secHandLength) / 1.5,
      canvas.height / 2 + (Math.sin(angle) * secHandLength) / 1.5
    );

    ctx.strokeStyle = "#000"; // COLOR OF THE HAND.
    ctx.stroke();
  }
}
