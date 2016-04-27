/**
 * Created by Christina Andresen on 16/03/16.
 */

var start = document.getElementById("start");
var reset = document.getElementById("reset");
var displayTime = document.getElementById("timeoutput");
var displayOutput = document.getElementById("setTimerOutput");

var hideSetimer = document.querySelector('.hide-settimer');

var intervalTime;
var hoursNow = new Date().getHours()
var minNow = new Date().getMinutes()
var secNow = new Date().getSeconds()
var hours;
var minutes;
var seconds = 59;
var minCounter;
var hourCounter;
var secCounter;

function setTimer(time) {
  console.log(time);
    console.log("Time length: " + time.length);
  if (time.value !== "") {
    hours = time.split(":")[0];
    minutes = time.split(":")[1];
  }
}

function hourMinCounter(hourCounter, minCounter, secCounter) {
    displayTime.innerHTML = formatTime(hourCounter, 2) + " : " + formatTime(minCounter, 2) + " : " + formatTime(secCounter, 2);

    intervalTime = setInterval(function() {
        if (secCounter == 0) {
            if (minCounter == 0) {
                if (hourCounter == 0) {
                    clearInterval(intervalTime);
                    displayOutput.innerHTML = "Timer is done, be aware of parking tickets!";
                    setTimeout(function () {
                        displayOutput.innerHTML = ''
                    }, 10000);
                    hourCounter = 00;
                    minCounter = 00;
                    secCounter = 00;
                }
                displayTime.innerHTML = formatTime(hourCounter, 2) + " : " + formatTime(minCounter, 2) + " : " + formatTime(secCounter, 2);

                minCounter = 59;
                hourCounter -= 1;
            } else {
                secCounter = 59;
                minCounter -= 1;

                displayTime.innerHTML = formatTime(hourCounter, 2) + " : " + formatTime(minCounter, 2) + " : " + formatTime(secCounter, 2);
            }
        }
        else {
            secCounter -= 1;

            displayTime.innerHTML = formatTime(hourCounter, 2) + " : " + formatTime(minCounter, 2) + " : " + formatTime(secCounter, 2);
        }

    }, 1000)
}

function checkTimer() {

    if (hoursNow == hours) {
        if (minNow == minutes) {
            if (secNow < seconds) {
                minCounter = minutes - minNow;
                hourCounter = hours - hoursNow;
                secCounter = seconds - secNow;

                hourMinCounter(hourCounter, minCounter, secCounter);
            }
            else {
                displayOutput.innerHTML = "Timer is wrong, set new time."
                setTimeout(function() {
                    displayOutput.innerHTML=''
            }, 10000);
            }
        }
        if (minNow < minutes) {
            if (secNow < seconds) {
                minCounter = minutes - minNow;
                hourCounter = hours - hoursNow;
                secCounter = seconds - secNow;

                hourMinCounter(hourCounter, minCounter, secCounter);
            }
            else {
                displayOutput.innerHTML = "Timer is wrong, set new time."
                setTimeout(function() {
                    displayOutput.innerHTML=''
            }, 10000);
            }
        }
    } else if (hoursNow < hours) {
        if (minNow <= minutes) {
            if (secNow < seconds) {
                minCounter = minutes - minNow;
                hourCounter = hours - hoursNow;
                secCounter = seconds - secNow;

                hourMinCounter(hourCounter, minCounter, secCounter);
            }
            else {
                displayOutput.innerHTML = "Timer is wrong, set new time."
                setTimeout(function() {
                    displayOutput.innerHTML=''
            }, 10000);
            }
        } else if (minNow > minutes){
            if (secNow < seconds) {
                minCounter = minutes - minNow;
                hourCounter = hours - hoursNow;
                secCounter = seconds - secNow;

                hourMinCounter(hourCounter, minCounter, secCounter);
            }
            else {
                displayOutput.innerHTML = "Timer is wrong, set new time."
                setTimeout(function() {
                    displayOutput.innerHTML=''
            }, 10000);
            }
            minCounter = minutes - minNow;
            var tempMinCounter = 59 + (minCounter);
            hourCounter = hours - hoursNow;
            console.log("H: " + hourCounter);
            hourCounter -= 1;
            console.log("Htem: " + hourCounter);
            secCounter -= 1;

            hourMinCounter(hourCounter, tempMinCounter, secCounter);

        } else {
            console.log("Timer is wrong")
            displayOutput.innerHTML = "Timer is wrong, set new time."
            setTimeout(function() {
                displayOutput.innerHTML=''
            }, 10000);
        }
    } else {
        console.log("Timer is wrong")
        displayOutput.innerHTML = "Timer is wrong, set new time."
        setTimeout(function () {
            displayOutput.innerHTML = ''
        }, 10000);

    }
}

// Format the time to 00:00
function formatTime(time, size) {
    var s = 00 + time;
    return s.substring((s.length - size));
};

// Start timer, and check if input time is valid.
start.addEventListener("click", function() {
    checkTimer();
});

// Resets time when reset button is clicked.
reset.addEventListener("click", function() {
    clearInterval(intervalTime);
    displayTime.innerHTML = "00 : 00 : 00";
});
