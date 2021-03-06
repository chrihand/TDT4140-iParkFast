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
  var minute = outputMin.textContent;

  handleMinutes();

  setTimerOutput.textContent = "Timer set at " + String(hour) + " hours and " + String(minute) + " minutes.";


}

function handleMinutes() {
  var interval = setInterval(function() {
    var currentNumber = outputMin.textContent;
    var currentHour = output.textContent;

    if(currentNumber == 0) {
      if(currentHour.valueOf() > 0 ) {
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

buttonsContainer.addEventListener('click', buttonsClickHandler);
start.addEventListener('click', startClickHandler);
reset.addEventListener('click',resetClickHandler);