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
    ctx.moveTo(location.prev.x, location.prev.y);
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
    ctx.arc(
        location.curr.x,
        location.curr.y,
        5 * getSpeedMouse(),
        0,
        2 * Math.PI
    );
    ctx.stroke();
}

function drawCanvasRectangles() {
    var location = getLocation();
    var ctx = getCanvasContext();
    let textColor = getShapeColor();
    ctx.strokeStyle = textColor;
    ctx.beginPath();
    ctx.moveTo(location.prev.x + getWidth(), location.curr.y + getHeight() / 2);
    ctx.lineTo(location.prev.x + getWidth(), location.curr.y - getHeight() / 2);
    ctx.lineTo(location.prev.x, location.curr.y - getHeight() / 2);
    ctx.lineTo(location.prev.x, location.curr.y + getHeight() / 2);
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
    let elBtnBar = document.querySelector('.change-settings-btn');
    if (isMouseDown()) {
        elBtnBar.style.display = 'none';
        gStartMoveTime = Date.now();
        console.log(ev);
        updateLocation(ev.offsetX, ev.offsetY);
        getDrawShapeFunction();
    } else {
        elBtnBar.style.display = 'block';
        clearCurrLocation();
    }
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
            drawCanvasCircle();
            break;
    }
}

function renderCanvas() {
    gCanvas.height = window.screen.height;
    gCanvas.width = window.screen.width;
    let bgColor = getBGColor();
    gCtx.fillStyle = bgColor;
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
}

function toggelBottomBar() {
    let elBtnBar = document.querySelector('.change-settings-btn');
    let elNavBar = document.querySelector('.top-nav-menu');
    let elBottonBar = document.querySelector('.bottom-bar');
    if (elBtnBar.innerText === '⇧') {
        elBtnBar.innerText = '⇩';
        elNavBar.classList.remove('close-bar');
        elBottonBar.classList.remove('close-bar-main');
    }
    else {
        elBtnBar.innerText = '⇧';
        elNavBar.classList.add('close-bar');
        elBottonBar.classList.add('close-bar-main');
    }
}

