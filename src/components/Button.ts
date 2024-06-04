import { IButton } from '../interfaces/IButton';

export class Button implements IButton {
    private element: HTMLElement | null;

    constructor(elementId: string) {
        this.element = document.getElementById(elementId);
    }

    onClick(callback: () => void): void {
        this.element.addEventListener('click', callback);
    }

    static createButton(className: string, textContent: string): HTMLButtonElement {
        const buttonElement: HTMLButtonElement = document.createElement('button');
        buttonElement.className = `button ${className}`;
        buttonElement.id = `${className}Button${document.querySelectorAll(`.button.${className}`).length + 1}`;
        buttonElement.textContent = textContent;
        return buttonElement;
    }
}
