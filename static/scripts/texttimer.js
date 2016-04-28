/**
 * Created by christinaandresen on 31/03/16.
 */

var displayOutput = document.getElementById("textouput");
var sendOutput = document.getElementById("showoutput");

function showOutput() {
    displayOutput.innerHTML = "Timer is done, be aware of parking tickets!";
    setTimeout(function() {
        displayOutput.innerHTML=''
    }, 10000);
}

sendOutput.addEventListener("click", function() {
    showOutput();
});