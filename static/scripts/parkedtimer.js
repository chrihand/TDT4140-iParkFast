/**
 * Created by christina andresen on 16/03/16.
 */

var display = document.getElementById("parkedoutput");

var startTime;
var time = 0;
var interval;


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
window.onload = function() {
	startTime = new Date().getTime();
	interval = setInterval(update, 10);
};