let APP_MINUTES = 1;
const ZERO = 0;
const FILL = '';
const TIMES_UP = 'Times Up! How did it Go?';
const HEADING_EL = document.getElementById('countdown');
const TIMESUP_EL = document.getElementById('timesup');

function init(time) {
    APP_MINUTES = time;
    countDown();
}

function countDown(mins = APP_MINUTES, secs = ZERO, secText = FILL) {
    let minutes = mins === 0 ? 0 : mins;
    let seconds = secs;
    let secFill = secText;
    // special case for when minutes starts with less than 10
    let minFill = getMinFill(minutes, ZERO, FILL); 

    if(minutes === 0 && seconds === 0) {
        setElText(HEADING_EL, FILL);
        setElText(TIMESUP_EL, TIMES_UP);
        setElVisibility(TIMESUP_EL, 'block');
        return;
    }

    const timerText = getTimerText(minutes, seconds, minFill, secFill);
    setElText(HEADING_EL, timerText);
        
    setTimeout(() => {
        if(seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        if(seconds < 10) {
            secFill = ZERO;
        } else {
            secFill = FILL;
        }

        countDown(minutes, seconds, secFill);
    }, 1000);
}

function getTimerText(mins, secs, minText, secText) {
    let secondsText = secs === 0 ? '00' : secs;
    return `${minText}${mins}:${secText}${secondsText}`;            
}

function setElText(el, text) {
    el.innerHTML = text;
}

function setElVisibility(el, propValue) {
    el.style.setProperty('display', propValue);
}

function getMinFill(minutes, zero, fill) {
    return minutes < 10 ? zero : fill;
}