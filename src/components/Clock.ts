import { IClock } from '../interfaces/IClock';

export class Clock implements IClock {
    private currentTime: Date;
    private timezoneOffset: number;

    constructor(timezoneOffset: number=0) {
        this.currentTime = new Date();
        this.timezoneOffset = timezoneOffset;
    }

    getTimezoneOffset(): number {
        return this.timezoneOffset;
    } 

    getCurrentTime(): Date {
        const localTime: Date = new Date(this.currentTime);
        localTime.setHours(localTime.getHours() + this.timezoneOffset);
        return localTime;
    }

    setTime(hours: number, minutes: number): void {
        this.currentTime.setHours(hours);
        this.currentTime.setMinutes(minutes);
    }

    reset(): void {
        this.currentTime = new Date();
    }
}
