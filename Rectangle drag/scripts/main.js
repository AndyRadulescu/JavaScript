var firstRect = document.querySelector("#firstRect");
var secondRect = document.getElementById("secondRect");

var st = window.getComputedStyle(secondRect, null);
var tr = st.getPropertyValue("transform");

console.log('Matrix: ' + tr);
var values = tr.split('(')[1].split(')')[0].split(',');
var secondRectX = parseInt(values[4]);
var secondRectY = parseInt(values[5]);
console.log('Matrix: ' + secondRectX + " " + secondRectY);

var mouseIsPressed = false;

//listeners
//container.addEventListener("click", getClickPosition, false);
firstRect.addEventListener("mousedown", onMouseDown, false);
firstRect.addEventListener("mouseup", onMouseUp, false);
container.addEventListener("mousemove", onMouseMove, false);

console.log(secondRect.offsetWidth);

/**
 * When mouse is pressed on the first Rect the it changes it's color.
 * @param {*} e 
 */
function onMouseDown(e) {
    mouseIsPressed = true;
    firstRect.style.backgroundColor = 'rgb(131, 5, 39)';
}

/**
 * When mouse is released the color is set to default.
 * @param {*} e 
 */
function onMouseUp(e) {
    mouseIsPressed = false;
    firstRect.style.backgroundColor = 'rgb(175, 17, 83)';
}

/**
 * When the mouse moves, if the click is pressed in the first rectangle, move the rectangle.
 * @param {*Event} e 
 */
function onMouseMove(e) {
    if (mouseIsPressed) {
        var parentPosition = getPosition(container);
        var xPos = e.clientX - parentPosition.x - (firstRect.offsetHeight / 2);
        var yPos = e.clientY - parentPosition.y - (firstRect.offsetWidth / 2);

        var translateValue = "translate(" + xPos + "px," + yPos + "px)";
        firstRect.style.transform = translateValue;
        ifCrossesOver();
    }
}

/**
 * Goes in each parrent and eliminates values like padding and margin for the final 
 * x and y value.
 * @param {*the container} element 
 */
function getPosition(element) {
    var xPos = 0;
    var yPos = 0;

    while (element) {
        xPos += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPos += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

/**
 * Verifies if the first rectangle is on top of the second one.
 */
function ifCrossesOver() {
    //var positions = getTransform(firstRect);
    var firstRectTranslated = getTransform(firstRect.style.transform);
    console.log(firstRectTranslated);
    if ((firstRectTranslated.x >= secondRectX - firstRect.offsetWidth && firstRectTranslated.x <= secondRectX + secondRect.offsetWidth)
        && (firstRectTranslated.y >= secondRectY - firstRect.offsetHeight && firstRectTranslated.y <= secondRectY + secondRect.offsetHeight)) {
        firstRect.style.backgroundColor = 'rgb(46, 17, 175)';
        secondRect.style.backgroundColor = 'rgb(131, 5, 39)';
    } else {
        firstRect.style.backgroundColor = 'rgb(131, 5, 39)';
        secondRect.style.backgroundColor = 'rgb(46, 17, 175)';
    }
    //console.log(firstRectTranslated.x + " " + firstRectTranslated.y + " " + c + " " + secondRectY);
}

/**
 * It takes out just the important values in the string : Xcoord and Ycoord
 * @param {*elements transform value} string 
 */
function getTransform(string) {
    var xPos = 0;
    var yPos = 0;
    var positions = string.substring(10).split('px,');
    xPos = positions[0];
    yPos = positions[1].substring(0, positions[1].length - 3);
    return {
        x: xPos,
        y: yPos
    };
}

