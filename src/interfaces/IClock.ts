export interface IClock {
    getTimezoneOffset(): number;
    getCurrentTime(): Date;
    setTime(hours: number, minutes: number): void;
    reset(): void
}
