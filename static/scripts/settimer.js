/**
 * Created by Christina Andresen on 16/03/16.
 */




var start = document.getElementById("start");
var reset = document.getElementById("reset");
var displayTime = document.getElementById("timeoutput");
var displayOutput = document.getElementById("setTimerOutput");

var timeRunning = false;
var hoursNow = new Date().getHours()
var minNow = new Date().getMinutes()
var hours;
var minutes;
var minCounter;
var hourCounter;

function setTimer(time) {
  console.log(time);
  if (time.value !== "") {
    hours = time.split(":")[0];
    minutes = time.split(":")[1];
    //var suffix = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    hours = hours < 10 ? "0" + hours : hours;

    var displayTimer = hours + ":" + minutes;
    displayTime.innerHTML = displayTimer;

  }
}


start.addEventListener("click", function() {
    if (hoursNow == hours) {
        if (minNow < minutes) {
            minCounter = minutes - minNow;
            hourCounter = hours - hoursNow;
            console.log("Min counter: " + minCounter);
            console.log("Hours counter: " + hourCounter);
        } else {
            console.log("Timer is wrong")
            displayOutput.innerHTML = "Timer is wrong, set new time."
        }
    } else if (hoursNow < hours) {
        if (minNow <= minutes) {
            minCounter = minutes - minNow;
            hourCounter = hours - hoursNow;
            console.log("Min counter: " + minCounter);
            console.log("Hours counter: " + hourCounter);
        } else {
            console.log("Timer is wrong")
            displayOutput.innerHTML = "Timer is wrong, set new time."
        }
    } else {
        console.log("Timer is wrong")
        displayOutput.innerHTML = "Timer is wrong, set new time."
        setTimeout(function() {
            displayOutput.innerHTML=''
        }, 10*1000);

    }
});

// Resets time when reset button is clicked.
reset.addEventListener("click", function() {
	clearInterval(interval);
	displaytime.innerHTML = "00 : 00";
	timeRunning = false;
	startTime = null;
	time = 0;
});


//buttonsContainer.addEventListener('click', buttonsClickHandler);


/*
var display = document.getElementById("display-area");
var toggle = document.getElementById("toggle-button");
var reset = document.getElementById("reset-button");

var timeRunning = false;
var startTime;
var time = 0;
var interval;

// Updates the display-area with the formated time
var update = function() {
	var timeInMSec = (new Date().getTime() - startTime); + time;
	display.innerHTML = format(timeInMSec);
};

// Formats time in ms to h, m, s and ms
var format = function(timeInMSec) {
	var h, m, s, ms = 0;
	h = Math.floor(timeInMSec / (60 * 60 * 1000));
	timeInMSec = timeInMSec % (60 * 60 * 1000);
	m = Math.floor(timeInMSec / (60 * 1000));
	timeInMSec = timeInMSec % (60 * 1000);
	s = Math.floor ( timeInMSec / 1000);
	ms = timeInMSec % 1000;

	var newTime = (formatTime(h, 2) + ":" + formatTime(m, 2) + ":" + formatTime(s, 2) + ":" + formatTime(ms, 3));

	return newTime;
};

// Formats time to the format 00:00:00.000
var formatTime = function(time, size) {
	var s = "0000" + time;
	return s.substring(s.length - size);
};

// When toggle button is clicked
toggle.addEventListener("click", function() {
	timeRunning = !timeRunning;

	if (timeRunning) {
		startTime = new Date().getTime();
		interval = setInterval(update, 10);
	} else {
		time += new Date().getTime() - startTime;
		clearInterval(interval);
	};
});

// Resets time when reset button is clicked.
reset.addEventListener("click", function() {
	clearInterval(interval);
	display.innerHTML = "00:00:00.000"
	timeRunning = false;
	startTime = null;
	time = 0;
});





function buttonsClickHandler(event) {
  var element = event.target;
  if(element.nodeName !== 'BUTTON') { return; }

  var number = element.dataset.number;
  var currentNumber = output.textContent;
  console.log("Number: " + currentNumber);
  var currentMin = outputMin.textContent;

  if(currentNumber.length < 2) {
    output.textContent = currentNumber === '0' ? number : currentNumber += number;
    console.log("added number to hours");
    console.log(currentNumber);
  } else {
    if(currentMin.length < 2) {
      outputMin.textContent = currentMin === '0' ? number : currentMin += number;
      console.log("added number to minutes");
    }
  }
}

function startClickHandler(event) {
  var hour = output.textContent;
  var minute = outputMin.textContent;

  handleMinutes();

  setTimerOutput.textContent = "Timer set at " + String(hour) + " hours and " + String(minute) + " minutes.";


}

function handleMinutes() {
  var interval = setInterval(function() {
    var currentNumber = outputMin.textContent;
    var currentHour = output.textContent;

    if(currentNumber == 0) {
      if(currentHour.valueOf() > 0) {
        outputMin.textContent = 59;
        handleHours();
      } else if(currentHour.valueOf(0) && currentNumber.valueOf(0)){
          setTimerOutput.textContent = "Time's up";
          clearInterval(interval);
      }
    } else {
      outputMin.textContent = Number(currentNumber) - 1;
    }

  }, 100);
}

function handleHours() {
  var currentNumber = output.textContent;
  output.textContent = Number(currentNumber) - 1;

}


function resetClickHandler(event) {
  output.textContent = 0;
  outputMin.textContent = 0;
  setTimerOutput.textContent = "";
}

start.addEventListener('click', startClickHandler);
reset.addEventListener('click',resetClickHandler);
*/
