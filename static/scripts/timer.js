/**
 * Created by ingridskar on 01/03/16.
 */

'use strict';

var buttonsContainer = document.querySelector('.buttons');
var output = document.querySelector('#output');
var setTimerOutput = document.querySelector('#setTimerOutput');
var start = document.querySelector('#start');
var reset = document.querySelector('#reset');

function buttonsClickHandler(event) {
  var element = event.target;
  if(element.nodeName !== 'BUTTON') { return; }

  var number = element.dataset.number;
  var currentNumber = output.textContent;

  output.textContent = currentNumber === '0' ? number : currentNumber += number;
}

function startClickHandler(event) {
  var timerAt = output.textContent;
  var interval = setInterval(function() {
    var currentNumber = output.textContent;

    if(currentNumber === '0') {
      clearInterval(interval);
      setTimerOutput.textContent = "Time's up";
      return;
    }
    output.textContent = Number(currentNumber) - 1;
  }, 100);

  setTimerOutput.textContent = "Timer set at " + String(timerAt) + " minutes.";


}

function resetClickHandler(event) {
  output.textContent = 0;
  setTimerOutput.textContent = "";
}

buttonsContainer.addEventListener('click', buttonsClickHandler);
start.addEventListener('click', startClickHandler);
reset.addEventListener('click',resetClickHandler);

