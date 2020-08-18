let onScreen = 0
let buffer = 0
let operator = ''

const screen = document.querySelector(".screen")

function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
        handleClick(event.target.innerText);      
    });
}

function handleClick(itemClicked) {

    if(!isNaN(parseInt(itemClicked))) {
        if(screen.innerText === "0" || onScreen === 0) {
            onScreen = itemClicked
            rerender(itemClicked);
        } else if(onScreen > 0) {
            onScreen += itemClicked
            rerender(onScreen);
        }
    } else {
        specialCharacterClicked(itemClicked)
    }
}

function evaluateMath(inBuffer, onTheScreen, mathOperator) {
    switch(mathOperator) {
        case '*' :
            onScreen = inBuffer * onTheScreen;
            rerender(onScreen);
            break;
        case '+' :
            onScreen = parseInt(inBuffer) + parseInt(onTheScreen);
            rerender(onScreen);
            break;
        case '-' :
            onScreen = parseInt(inBuffer) - parseInt(onTheScreen);
            rerender(onScreen);
            break;
        case '÷' :
            onScreen = parseFloat(inBuffer) / parseFloat(onTheScreen);
            rerender(onScreen);
            break;                        
    }
}

function specialCharacterClicked(specialChar) {
    switch(specialChar) {
        case '⬅︎' :
            onScreen = onScreen.toString().substring(0, onScreen.toString() - 1);
            rerender(onScreen);
            break;
        case '=' :
            evaluateMath(buffer, onScreen, operator);
            buffer = 0;
            operator = '';
            break;
        case 'C' :
            buffer = 0;
            operator = '';
            onScreen = 0;
            rerender(onScreen);
            break;
        default :
            buffer = onScreen;
            onScreen = 0;
            operator = specialChar;
            break;        
    }
}

function rerender(toScreen) {
    screen.innerText = Math.round(toScreen);
}

init();