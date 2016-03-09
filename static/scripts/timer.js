/**
 * Created by ingridskar on 01/03/16.
 */

'use strict';

var buttonsContainer = document.querySelector('.buttons');
var output = document.querySelector('#output');
var outputMin = document.querySelector('#outputHour');
var setTimerOutput = document.querySelector('#setTimerOutput');
var start = document.querySelector('#start');
var reset = document.querySelector('#reset');

var interval;

function buttonsClickHandler(event) {
  var element = event.target;
  if(element.nodeName !== 'BUTTON') { return; }

  var number = element.dataset.number;
  var currentNumber = output.textContent;
  var currentNumberMin = outputHour.textContent;

  if (output.textContent.length <= 1) {
    output.textContent = currentNumber === '0' ? number : currentNumber += number;
  } else {
    outputMin.textContent = currentNumberMin === '0' ? number : currentNumberMin += number;
  }

}

function startClickHandler(event) {
  var timerAt = Number(output.textContent);
  var minAt = outputMin.textContent;

  if (timerAt != 0) {

    for (var i  = timerAt; i > 0; i--) {

    interval = setInterval(function() {

      var currentNumber = output.textContent;
      var currentNumberMin = outputMin.textContent;

      if (Number(outputMin.textContent) == 0) {
        outputMin.textContent = "59";
        currentNumberMin = 59;
        output.textContent = Number(currentNumber) - 1;
      }

      if((Number(output.textContent) == 0) && (Number(outputMin.textContent) == 0)) {
        stopClock();
      }

      outputMin.textContent = Number(currentNumberMin) - 1;
    }, 2000)
  }
  }

  setTimerOutput.textContent = "Timer set at " + String(timerAt) + " hours and " + String(minAt) + " minutes.";


}

function stopClock() {
  output.textContent = 0;
  outputMin.textContent = 0;
  setTimerOutput.textContent = "Time's up";
  return;
}

function resetClickHandler(event) {
  output.textContent = 0;
  outputMin.textContent = 0;
  setTimerOutput.textContent = "";
  clearInterval(interval);
  return;

}

buttonsContainer.addEventListener('click', buttonsClickHandler);
start.addEventListener('click', startClickHandler);
reset.addEventListener('click',resetClickHandler);