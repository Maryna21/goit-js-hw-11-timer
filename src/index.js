import './styles.css';
const daysRef = document.querySelector('[data-value="days"]');
const hoursRef = document.querySelector('[data-value="hours"]');
const minsRef = document.querySelector('[data-value="mins"]');
const secsRef = document.querySelector('[data-value="secs"]');

class CountdownTimer {
    constructor({onTick, targetDate}) {
        this.intervalId = null;
        this.isActive = false; 
        this.onTick = onTick;
        this.targetDate = targetDate;
        this.init();
    }
    init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
    }
    
start() {
        if (this.isActive) {
            return
        }
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now()
            const deltaTime = this.targetDate - currentTime;
            const time = this.getTimeComponents(deltaTime);
            this.onTick(time);
        }, 1000)
    };
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }
     getTimeComponents(time) {
         const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs };
     }
    pad(value) {
    return String(value).padStart(2, '0');
} 
}
   
const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Nov 21, 2020'),
    onTick: updateClockface,
});

function updateClockface({ days, hours, mins, secs }) {
    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minsRef.textContent = `${mins}`;
    secsRef.textContent = `${secs}`;
}

timer.start();
