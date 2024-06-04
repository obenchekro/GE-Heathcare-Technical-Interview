import { Watch } from './Watch';
import { Clock } from './Clock';
import { Display } from './Display';
import { Button } from './Button';

export class ClockManager {
    private static instance: ClockManager;
    private clocksContainer: HTMLElement;
    private addClockButton: Button;

    private constructor(clocksContainerId: string, addClockButtonId: string) {
        this.clocksContainer = document.getElementById(clocksContainerId);
        this.addClockButton = new Button(addClockButtonId);
        this.addClockButton.onClick(() => this.promptForTimezone());
    };

    public static getInstance(clocksContainerId: string, addClockButtonId: string): ClockManager {
        if (!ClockManager.instance) {
            ClockManager.instance = new ClockManager(clocksContainerId, addClockButtonId);
        }
        return ClockManager.instance;
    };

    private promptForTimezone(): void {
        const timezoneInput: string | null = prompt('Enter timezone offset (e.g., -5 for GMT-5):', '0');
        if (timezoneInput !== null) {
            const timezoneOffset: number = parseInt(timezoneInput);
            if (!isNaN(timezoneOffset)) {
                this.createClock(timezoneOffset);
            } else {
                alert("Invalid input. Please enter a valid number for the timezone offset.");
            };
        };
    };

    public createClock(timezoneOffset: number): void {
        const clockElement: HTMLDivElement = document.createElement('div');
        clockElement.className = 'watch';

        const displayElement: HTMLDivElement = document.createElement('div');
        displayElement.className = 'display';
        displayElement.id = `clockDisplay${document.querySelectorAll('.display').length + 1}`;
        clockElement.appendChild(displayElement);

        const modeButtonElement = Button.createButton('mode', 'Mode');
        const increaseButtonElement = Button.createButton('increase', 'Increase');
        const resetButtonElement = Button.createButton('reset', 'Reset');
        const lightButtonElement = Button.createButton('light', 'Light');
        const formatButtonElement = Button.createButton('format', 'Format');

        clockElement.appendChild(modeButtonElement);
        clockElement.appendChild(increaseButtonElement);
        clockElement.appendChild(resetButtonElement);
        clockElement.appendChild(lightButtonElement);
        clockElement.appendChild(formatButtonElement);

        this.clocksContainer.appendChild(clockElement);

        const clock: Clock = new Clock(timezoneOffset);
        const display: Display = new Display(displayElement.id);
        const modeButton: Button = new Button(modeButtonElement.id);
        const increaseButton: Button = new Button(increaseButtonElement.id);
        const resetButton: Button = new Button(resetButtonElement.id);
        const lightButton: Button = new Button(lightButtonElement.id);
        const formatButton: Button = new Button(formatButtonElement.id);

        new Watch(clock, display, modeButton, increaseButton, lightButton, resetButton, formatButton);
    };
};
