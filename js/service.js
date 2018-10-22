'use strict'
var gCanvas = document.getElementById('canvas');
var gCtx = gCanvas.getContext('2d');
var gCurrShape = 'simple';
var gIsMouseDown = false;
var gStartMoveTime;
var gLocation = {
    curr: {},
    prev: {}
}

function clearCanvas() {
    gCtx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvas();
}

function downloadCanvas(elLink) {
    console.log(gCanvas.toDataURL())
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'my-canvas.jpg'
}

function setCanvas() {
    gCanvas.height = window.screen.height;
    gCanvas.width = window.screen.width;
    let bgColor = getBGColor();
    gCtx.fillStyle = bgColor;
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)

}

function getLocation() {
    return gLocation;
}

function getCanvas() {
    return gCanvas;
}

function getCanvasContext() {
    return gCtx;
}

function getShapeColor() {
    return document.querySelector('#textColor').value;
}

function getBGColor() {
    return document.querySelector('#bgColor').value;
}

function updateLocation(x, y) {
    [gLocation.prev.x, gLocation.prev.y] = [gLocation.curr.x, gLocation.curr.y];
    [gLocation.curr.x, gLocation.curr.y] = [x, y];
}

function onMouseDown(isDown) {
    gIsMouseDown = isDown;
}
function isMouseDown() {
    return gIsMouseDown;
}

function getLocation() {
    return gLocation;
}


function clearCurrLocation() {
    gLocation.curr = {};
    gLocation.prev = {};
}


function changeShape(shape) {
    gCurrShape = shape;
}

function getShape() {
    return gCurrShape;
}


function getSpeedMouse() {
    let x = gLocation.curr.x - gLocation.prev.x;
    let y = gLocation.curr.y - gLocation.prev.y;
    let distance = Math.sqrt(Math.pow(x, 2), Math.pow(y, 2));
    let time = Date.now() - gStartMoveTime;
    return distance / time;

}

