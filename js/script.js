var savedText = [];
var backGround;
var fontSize;
var xCoor;
var yCoor;
setToDefault();

function modelSelected (modelID) {
    var buttons = getAllModels();
    for (var i = 0; i < buttons.length; i ++) {
        buttons[i].style.borderColor = 'transparent';
    }
    var selectedModel = document.getElementById(modelID);
    selectedModel.style.borderColor = 'black';
    clearProgress();
    drawOnCanvas(selectedModel);
}

function clearProgress() {
    backGround = "";
    savedText = [];
    clearInput();
    setToDefault();
}

function getAllModels() {
    var part_1 = document.getElementById("part_1");
    var buttons = part_1.getElementsByTagName("button");
    return buttons;
}

function drawOnCanvas(targetButton) {
    var myCanvas = document.getElementById('myCanvas');
    var ctx = myCanvas.getContext("2d");
    var currentImg = targetButton.childNodes[1].childNodes[1];
    ctx.drawImage(currentImg, 0, 0, 600, 600);
    backGround = currentImg;
}

function clearInput() {
    var textInput = document.getElementById('user_input1');
    textInput.value = "";
}

function saveText() {
    appendToSavedText();
    clearInput();
    setToDefault();
}

function setToDefault() {
    fontSize = 80;
    xCoor = 100;
    yCoor = 500;
}

function appendToSavedText() {
    var textInput = document.getElementById('user_input1');
    
    var newTextInfo = [textInput.value, fontSize, xCoor, yCoor];
    savedText.push(newTextInfo);
}

function drawSavedInfo() {
    var myCanvas = document.getElementById('myCanvas');
    var ctx = myCanvas.getContext("2d");
    ctx.drawImage(backGround, 0, 0, 600, 600);

    for (var i = 0; i < savedText.length; i ++) {
        ctx.font = savedText[i][1] + 'px 微软雅黑';
        ctx.fillText(savedText[i][0], savedText[i][2], savedText[i][3]);
    }
}

function largerFont() {
    fontSize = Math.min(fontSize + 10, 160);
    updateText();
}

function smallerFont() {
    fontSize = Math.max(fontSize - 10, 0);
    updateText();
}

function moveLeft() {
    xCoor = Math.max(xCoor - 15, 0);
    updateText();
}

function moveRight() {
    xCoor = Math.min(xCoor + 15, 600);
    updateText();
}

function moveUp() {
    yCoor = Math.max(yCoor - 15, 0);
    updateText();
}

function moveDown() {
    yCoor = Math.min(yCoor + 15, 600);
    updateText();
}

function updateText() {
    var myCanvas = document.getElementById('myCanvas');
    var ctx = myCanvas.getContext("2d");
    var textInput = document.getElementById('user_input1');
    drawSavedInfo();

    ctx.font = fontSize + 'px 微软雅黑';
    ctx.fillText(textInput.value, xCoor, yCoor);
}

function openCanvasInNewWindow() {
    var myCanvas = document.getElementById('myCanvas');
    var imageURL = myCanvas.toDataURL("image/png");
    var w = window.open();
    w.document.write("<img src='" + imageURL + "' alt='from canvas'/>");
}