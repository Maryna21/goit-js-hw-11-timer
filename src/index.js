import './styles.css';
const daysRef = document.querySelector('[data-value="days"]');
const hoursRef = document.querySelector('[data-value="hours"]');
const minsRef = document.querySelector('[data-value="mins"]');
const secsRef = document.querySelector('[data-value="secs"]');
function updateClockface({ days, hours, mins, secs }) {
    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minsRef.textContent = `${mins}`;
    secsRef.textContent = `${secs}`;
}
console.log(updateClockface);
// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 17, 2019'),
// });


function pad(value) {
    return String(value).padStart(2, '0');
}
const timer = {
    intervalId: null,
    isActive: false,
    start() {
        if (this.isActive) {
            return
        }
        const startTime = Date.now();
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now()
            const deltaTime = currentTime - startTime;
            const time = getTimeComponents(deltaTime);
            updateClockface(time);
        }, 1000)
    },
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
    }
    }

timer.start();
function getTimeComponents(time) {
    const days = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const hours = pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs };
  }