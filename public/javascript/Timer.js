const ZERO = 0;
const FILL = '';
const TIMES_UP = 'Times Up! How did it Go?';
const HEADING_EL = document.getElementById('countdown');
const TIMESUP_EL = document.getElementById('timesup');

function Timer(appMinutes) {
    
    this.countDown = (mins = appMinutes, secs = ZERO, secText = FILL) => {
        let minutes = mins === 0 ? 0 : mins;
        let seconds = secs;
        let secFill = secText;
        // special case for when minutes starts with less than 10
        let minFill = this.getMinFill(minutes, ZERO, FILL); 

        if(minutes === 0 && seconds === 0) {
            setElText(HEADING_EL, FILL);
            setElText(TIMESUP_EL, TIMES_UP);
            setElVisibility(TIMESUP_EL, 'block');
            return;
        }

        const timerText = this.getTimerText(minutes, seconds, minFill, secFill);
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
            
            this.countDown(minutes, seconds, secFill);
        }, 1000);
    };

    this.getMinFill = (minutes, zero, fill) => {
        return minutes < 10 ? zero : fill;
    }
    
    this.getTimerText = (mins, secs, minText, secText) => {
        let secondsText = secs === 0 ? '00' : `${secText}${secs}`;
        
        return `${minText}${mins}:${secondsText}`;            
    }

};

// Utilities
function setElText(el, text) {
    el.innerHTML = text;
}

function setElVisibility(el, propValue) {
    el.style.setProperty('display', propValue);
}
