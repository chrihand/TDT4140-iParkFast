/**
 * Created by christina andresen on 16/03/16.
 */

var display = document.getElementById("parkedoutput");

var startTime;
var time = 0;
var interval;
var startinterval;


// Updates the display-area with the formated time
var update = function() {
	var timeInMSec = (new Date().getTime() - startTime) + time;
	display.innerHTML = format(timeInMSec);
};

// Formats time in ms to h, m, s
var format = function(timeInMSec) {
	var h, m, s = 0;
	h = Math.floor(timeInMSec / (60 * 60 * 1000));
	timeInMSec = timeInMSec % (60 * 60 * 1000);
	m = Math.floor(timeInMSec / (60 * 1000));
    timeInMSec = timeInMSec % (60 * 1000);
	s = Math.floor ( timeInMSec / 1000);

	var newTime = (formatTime(h, 2) + "h " + formatTime(m, 2) + "m " + formatTime(s, 2) + "s");
	return newTime;
};

// Formats time to the right format
var formatTime = function(time, size) {
	var s = "0000" + time;
	return s.substring(s.length - size);
};

// Starts when site is loaded, should change this when raspberry pi is ready.
function checkActive() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			if (xhttp.responseText == 1) {
				startTime = new Date().getTime();
				interval = setInterval(update, 10);
				clearInterval(startinterval)
			}
		}
	};
	xhttp.open("GET", "http://129.241.13.115:7000/static/active.txt?_=" + new Date().getTime(), true);
	xhttp.send();
}

startinterval = setInterval(checkActive, 3000);