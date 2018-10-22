'use strict'

var gCanvas = document.getElementById('canvas');
var gCtx = gCanvas.getContext('2d');

function drawCanvas(){
    let textColor= getTextColor();
    gCtx.fillStyle(textColor);
}