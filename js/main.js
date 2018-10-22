'use strict';
var gDrawingInterval;
var gPrevRectangleWidth;


function init() {
    renderCanvas();
    drawImage();
}



function drawCanvasSimple() {
    var location = getLocation();
    var ctx = getCanvasContext();
    let textColor = getShapeColor();
    ctx.strokeStyle = textColor;
    ctx.beginPath();
    ctx.moveTo(location.prev.x, location.prev.y)
    ctx.lineTo(location.curr.x, location.curr.y);
    ctx.stroke();
}
function drawCanvasCircle() {
    var location = getLocation();
    var ctx = getCanvasContext();
    let shapeColor = getShapeColor();
    ctx.strokeStyle = shapeColor;
    ctx.fillStyle = getBGColor();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(location.curr.x, location.curr.y, 5 * getSpeedMouse(), 0, 2 * Math.PI);
    ctx.stroke();
}

function drawCanvasRectangles() {
    var location = getLocation();
    var ctx = getCanvasContext();
    let textColor = getShapeColor();
    ctx.strokeStyle = textColor;
    // ctx.rotate((location.curr.y - location.prev.y) / (location.curr.x - location.prev.x));
    ctx.beginPath();
    ctx.rotate(45 * Math.PI / 180)
    ctx.moveTo(location.prev.x + getWidth(), location.curr.y + getHeight()/2);
    ctx.lineTo(location.prev.x + getWidth() , location.curr.y - getHeight()/2);
    ctx.lineTo(location.prev.x , location.curr.y - getHeight()/2);
    ctx.lineTo(location.prev.x , location.curr.y + getHeight()/2);
    ctx.closePath();
    ctx.stroke();

    function getWidth() {
        var a = location.prev.x - location.curr.x;
        var b = location.prev.y - location.curr.y;
        return Math.sqrt(a ** 2 + b ** 2);
    }

    function getHeight() {
        return getWidth() * 1.5;
    }
}

function drawingRectanglesTime() {
    if (gDrawingInterval) return;
    gDrawingInterval = setInterval(drawCanvasRectangles, 200);
}

function stopDrawingInterval() {
    clearInterval(gDrawingInterval);
}


function onMouseMove(ev) {
    if (isMouseDown()) {
        gStartMoveTime = Date.now();
        console.log(ev);
        updateLocation(ev.clientX, ev.clientY);
        getDrawShapeFunction();

    } else {

        clearCurrLocation();
        // stopDrawingInterval();
    }

    // debugger;

}


function getDrawShapeFunction() {
    switch (getShape()) {
        case 'simple':
            drawCanvasSimple();
            break;
        case 'rectangles':
            drawCanvasRectangles();
            break;
        case 'circles':
            drawCanvasCircle()
            break;
    }
}

