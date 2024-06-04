import { IDisplay } from '../interfaces/IDisplay';

export class Display implements IDisplay {
    private element: HTMLElement;
    private is24HourFormat: boolean;

    constructor(elementId: string) {
        this.element = document.getElementById(elementId);
        this.is24HourFormat = true;
    }

    showTime(time: Date): void {
        const hours: string = this.pad(this.is24HourFormat ? time.getHours() : (time.getHours() % 12 || 12));
        const minutes: string = this.pad(time.getMinutes());
        const seconds: string = this.pad(time.getSeconds());
        const period: string = this.is24HourFormat ? '' : (time.getHours() >= 12 ? ' PM' : ' AM');
        this.element.innerHTML = `${hours}:${minutes}:${seconds}${period}`;

        if (this.element.innerHTML.length > 8) {
            this.element.classList.add('large');
        } else {
            this.element.classList.remove('large');
        }
    };

    toggleLight(): void {
        this.element.classList.toggle('backlight');
    };

    changeFormat(): void {
        this.is24HourFormat = !this.is24HourFormat;
    };

    private pad(num: number): string {
        return num < 10 ? `0${num}` : num.toString();
    };
};
