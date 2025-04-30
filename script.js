// DOM elements
const currentTimeElement = document.getElementById('current-time');
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const secondInput = document.getElementById('second');
const setAlarmButton = document.getElementById('set-alarm');
const alarmsContainer = document.getElementById('alarms-container');

// Array to store alarms
let alarms = [];
let alarmSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');

// Update current time
function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    // Check if any alarm matches current time
    checkAlarms(hours, minutes, seconds);
}

// Initialize clock
setInterval(updateCurrentTime, 1000);
updateCurrentTime();

// Set alarm
setAlarmButton.addEventListener('click', () => {
    const hour = hourInput.value.padStart(2, '0');
    const minute = minuteInput.value.padStart(2, '0');
    const second = secondInput.value.padStart(2, '0');
    
    if (!hour || !minute || !second) {
        alert('Please enter valid time values');
        return;
    }
    
    const alarmTime = `${hour}:${minute}:${second}`;
    
    // Check if alarm already exists
    if (alarms.includes(alarmTime)) {
        alert('This alarm already exists!');
        return;
    }
    
    // Add alarm to array
    alarms.push(alarmTime);
    
    // Add alarm to UI
    addAlarmToUI(alarmTime);
    
    // Clear input fields
    hourInput.value = '';
    minuteInput.value = '';
    secondInput.value = '';
});

// Add alarm to UI
function addAlarmToUI(alarmTime) {
    const li = document.createElement('li');
    li.className = 'alarm-item';
    
    li.innerHTML = `
        <span>${alarmTime}</span>
        <button class="delete-btn" data-time="${alarmTime}">Delete</button>
    `;
    
    alarmsContainer.appendChild(li);
    
    // Add event listener to delete button
    li.querySelector('.delete-btn').addEventListener('click', function() {
        const timeToDelete = this.getAttribute('data-time');
        deleteAlarm(timeToDelete, li);
    });
}

// Delete alarm
function deleteAlarm(alarmTime, element) {
    alarms = alarms.filter(time => time !== alarmTime);
    element.remove();
}

// Check if any alarm matches current time
function checkAlarms(hours, minutes, seconds) {
    const currentTime = `${hours}:${minutes}:${seconds}`;
    
    if (alarms.includes(currentTime)) {
        triggerAlarm();
    }
}

// Trigger alarm
function triggerAlarm() {
    alarmSound.play();
    alarmSound.loop = true;
    
    const confirmStop = confirm('Alarm! Click OK to stop.');
    
    if (confirmStop) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
}

// Input validation
function validateInput(input, max) {
    input.addEventListener('input', function() {
        let value = parseInt(this.value, 10);
        
        if (isNaN(value)) {
            this.value = '';
        } else if (value < 0) {
            this.value = '0';
        } else if (value > max) {
            this.value = max.toString();
        }
    });
}

// Validate inputs
validateInput(hourInput, 23);
validateInput(minuteInput, 59);
validateInput(secondInput, 59);