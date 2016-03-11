/**
 * Created by ingridskar on 01/03/16.
 */

'use strict';

var buttonsContainer = document.querySelector('.buttons');
var output = document.querySelector('#output');
var outputMin = document.querySelector('#outputMin');
var setTimerOutput = document.querySelector('#setTimerOutput');
var start = document.querySelector('#start');
var reset = document.querySelector('#reset');
var hour;
var minute;

function buttonsClickHandler(event) {
  var element = event.target;
  if(element.nodeName !== 'BUTTON') { return; }

  var number = element.dataset.number;
  var currentNumber = output.textContent;
  var currentMin = outputMin.textContent;

  if(currentNumber.length < 2) {
    output.textContent = currentNumber === '0' ? number : currentNumber += number;
    console.log("added number to hours");
  } else {
    if(currentMin.length < 2) {
      outputMin.textContent = currentMin === '0' ? number : currentMin += number;
      console.log("added number to minutes");
    }
  }


}

function startClickHandler(event) {
  var hour = output.textContent;
  var minute = output.textContent;

  handleMinutes();
  handleHours();

  setTimerOutput.textContent = "Timer set at " + String(hour) + " minutes.";


}

function handleMinutes() {
  var interval = setInterval(function() {
    var currentNumber = outputMin.textContent;
    var currentHour = output.textContent;

    if(currentNumber === '0') {
      if(Number(currentHour) < 0) {
        for(var i = Number(currentHour); i < 0; i--) {
          outputMin.textContent = 59;
        }
      } else {
        clearInterval(interval);
        setTimerOutput.textContent = "Time's up";
      }
    } else {
      outputMin.textContent = Number(currentNumber) - 1;
    }

  }, 1000);
}

function handleHours() {
  var interval = setInterval(function() {
    var currentNumber = output.textContent;

    if(currentNumber === '0') {
      clearInterval(interval);
      return;
    }

    output.textContent = Number(currentNumber) - 1;
  }, 60000);
}


function resetClickHandler(event) {
  output.textContent = 0;
  outputMin.textContent = 0;
  setTimerOutput.textContent = "";
}

buttonsContainer.addEventListener('click', buttonsClickHandler);
start.addEventListener('click', startClickHandler);
reset.addEventListener('click',resetClickHandler);