export type GetStopwatch = { hours: string; minutes: string; seconds: string };
type OnStopwatchUpdate = (stopwatch: GetStopwatch) => void;

export default class Stopwatch {
  public onUpdate: OnStopwatchUpdate = () => {};
  private interval: number | null = null;
  private seconds = 0;
  private minutes = 0;
  private hours = 0;
  private isRunning = false;

  private updateTime(): void {
    this.seconds = (this.seconds + 1) % 60;
    if (this.seconds === 0) this.minutes = (this.minutes + 1) % 60;
    if (this.minutes === 0 && this.seconds === 0) this.hours = (this.hours + 1) % 24;
    this.onUpdate(this.get());
  }

  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private startStopwatch() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.interval = window.setInterval(() => this.updateTime(), 1000);
    }
  }

  private stopStopwatch(): void {
    if (this.isRunning) {
      this.isRunning = false;
      if (this.interval !== null) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  }

  start(): void { this.startStopwatch(); }
  resume(): void { this.startStopwatch(); }
  pause(): void { this.stopStopwatch(); }
  
  reset(): void {
    this.stopStopwatch();
    this.seconds = this.minutes = this.hours = 0;
    this.onUpdate(this.get());
  }

  get(): GetStopwatch {
    return {
      hours: this.formatTime(this.hours),
      minutes: this.formatTime(this.minutes),
      seconds: this.formatTime(this.seconds),
    };
  }
}
