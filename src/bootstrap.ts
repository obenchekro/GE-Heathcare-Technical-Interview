import { ClockManager } from './components/ClockManager';
import './index.css';

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded event on track!');
    const clockManager = ClockManager.getInstance('clocksContainer', 'addClockButton');
    clockManager.createClock(0);
});

