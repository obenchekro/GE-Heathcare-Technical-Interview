import { IClock } from '../interfaces/IClock';
import { IDisplay } from '../interfaces/IDisplay';
import { IButton } from '../interfaces/IButton';

enum Mode {
    View,
    EditHour,
    EditMinute
};

export class Watch {
    private clock: IClock;
    private display: IDisplay;
    private modeButton: IButton;
    private increaseButton: IButton;
    private lightButton: IButton;
    private resetButton: IButton;
    private formatButton: IButton;
    private mode: Mode;

    constructor(
        clock: IClock, 
        display: IDisplay, 
        modeButton: IButton, 
        increaseButton: IButton, 
        lightButton: IButton,
        resetButton: IButton,
        formatButton: IButton
    ) {
        this.clock = clock;
        this.display = display;
        this.modeButton = modeButton;
        this.increaseButton = increaseButton;
        this.lightButton = lightButton;
        this.resetButton = resetButton;
        this.formatButton = formatButton;
        this.mode = Mode.View;

        this.modeButton.onClick(() => this.changeMode());
        this.increaseButton.onClick(() => this.increaseTime());
        this.lightButton.onClick(() => this.toggleLight());
        this.resetButton.onClick(() => this.resetTime());
        this.formatButton.onClick(() => this.changeFormat());

        setInterval(() => this.updateDisplay(), 1000);
        this.updateDisplay();
    };

    private changeMode(): void {
        if (this.mode === Mode.View) {
            this.mode = Mode.EditHour;
        } else if (this.mode === Mode.EditHour) {
            this.mode = Mode.EditMinute;
        } else {
            this.mode = Mode.View;
        }
        console.log(`Mode changed to: ${Mode[this.mode]}`);
    };

    private increaseTime(): void {
        const currentTime: Date = this.clock.getCurrentTime();
        const timezoneOffset: number = this.clock. getTimezoneOffset();
        if (this.mode === Mode.EditHour) {
            this.clock.setTime(currentTime.getHours() + 1 - timezoneOffset, currentTime.getMinutes());
        } else if (this.mode === Mode.EditMinute) {
            this.clock.setTime(currentTime.getHours() - timezoneOffset, currentTime.getMinutes() + 1);
        }
        this.updateDisplay();
    };

    private updateDisplay(): void {
        this.display.showTime(this.clock.getCurrentTime());
    };

    private toggleLight(): void {
        this.display.toggleLight();
    };

    private resetTime(): void {
        this.clock.reset();
        this.updateDisplay();
    };

    private changeFormat(): void {
        this.display.changeFormat();
        this.updateDisplay();
    };
};
