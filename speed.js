const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originalText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer=[0,0,0,0];
var interval;
var timerRunnning = false;

// takes care of the two digit format for timer
function addLeadingZero(time){
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}

// Run the timer
function runTimer(){
    let currentTime = addLeadingZero(timer[0]) + ":" + addLeadingZero(timer[1]) + ":" + addLeadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60)
    timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
    timer[2] = Math.floor(timer[3]-timer[1]*100 - timer[0]*6000);
}


// Start the timer
function startTimer(){
    let testTextLength = testArea.value.length;
    if(testTextLength===0 && !timerRunnning){
        timerRunnning = true;
        interval = setInterval( runTimer, 10);
    }
}

// check the content of test area
function spellCheck(){
    let testTextEntered = testArea.value;
    let originalTextMatch = originalText.substring(0,testTextEntered.length);
    
    if(testTextEntered==originalText){
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890"; // green
    }
    else{
        if(testTextEntered==originalTextMatch){
            testWrapper.style.borderColor = "#65CCf3"; // blue
        }
        else{
            testWrapper.style.borderColor = "#E95D0F"; // red
        }
    }
}

// reset the test area
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunnning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listener for keyboard input and reset button
testArea.addEventListener("keypress",startTimer, false);
testArea.addEventListener("keyup",spellCheck, false);
resetButton.addEventListener("click", reset, false);