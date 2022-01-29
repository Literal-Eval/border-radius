"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var box = document.querySelector(".box");
var stops = document.querySelectorAll(".rad-stop");
var radiusDataText = document.querySelector(".radius-data-text");
var sizeSwitch = document.querySelector(".switch");
var modeSwitch = document.querySelector(".mode-switch");
var copyButton = document.querySelector(".btn-copy");
var copyInfo = document.querySelector(".copied-info");
var sizeBarInputs = document.querySelector(".size-bar-inputs");
var widthMeter = document.querySelector("#width-meter");
var heightMeter = document.querySelector("#height-meter");
var mode = "normal";
var showSize = false;
var stopA = stops[0];
var stopB = stops[1];
var stopC = stops[2];
var stopD = stops[3];
var stopE = stops[4];
var stopH = stops[5];
var stopF = stops[6];
var stopG = stops[7];
var pressedStops = new Array(8).fill(false);
var pressed = false;
var oldX = 0;
var oldY = 0;
var oldLeft = 0;
var oldTop = 0;
var boxLeft = box.getBoundingClientRect().left;
var viewWidth = 0.0;
var viewHeight = 0.0;
var boxDim = {
    width: 0.0,
    height: 0.0,
};
function updateDim() {
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;
    if (!showSize) {
        boxDim.width = boxDim.height =
            Math.min(viewHeight, viewWidth) == viewHeight
                ? viewHeight / 2
                : viewWidth * 0.6;
    }
}
updateDim();
window.addEventListener("resize", updateDim);
var stopPositions = {
    a: 0.8 * boxDim.width,
    b: 0.2 * boxDim.width,
    c: 0.2 * boxDim.width,
    d: 0.8 * boxDim.width,
    e: 0.8 * boxDim.height,
    f: 0.8 * boxDim.height,
    g: 0.2 * boxDim.height,
    h: 0.2 * boxDim.height,
};
function updateBox() {
    let vh = 0.0;
    let vw = 0.0;
    if (showSize) {
        vw = 100 / boxDim.width;
        vh = 100 / boxDim.height;
    }
    else {
        vh = vw = viewHeight < viewWidth ? 200 / viewHeight : 500 / (3 * viewWidth);
    }
    box.style.borderRadius = `${Math.round(stopPositions["a"] * vw)}%
    ${Math.round(stopPositions["b"] * vw)}%
    ${Math.round(stopPositions["c"] * vw)}%
    ${Math.round(stopPositions["d"] * vw)}% / 
    ${Math.round(stopPositions["e"] * vh)}%
    ${Math.round(stopPositions["f"] * vh)}%
    ${Math.round(stopPositions["g"] * vh)}%
    ${Math.round(stopPositions["h"] * vh)}%`;
    radiusDataText.textContent = box.style.borderRadius;
}
updateBox();
function handleCopy(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        copyInfo.style.opacity = "100%";
        setTimeout(() => {
            copyInfo.style.opacity = "0%";
        }, 5000);
        yield navigator.clipboard.writeText("border-radius: " + box.style.borderRadius + ";");
    });
}
copyButton.addEventListener("click", handleCopy);
// Code that'll make you say BRUH in French
modeSwitch.addEventListener("click", (e) => {
    mode = mode == "normal" ? "abnormal_lol" : "normal";
    if (modeSwitch.classList.contains("on")) {
        modeSwitch.classList.remove("on");
        stopPositions["a"] = boxDim.width * 0.5;
        stopPositions["b"] = boxDim.width * 0.5;
        stopPositions["c"] = boxDim.width * 0.5;
        stopPositions["d"] = boxDim.width * 0.5;
        stopPositions["e"] = boxDim.height * 0.5;
        stopPositions["f"] = boxDim.height * 0.5;
        stopPositions["g"] = boxDim.height * 0.5;
        stopPositions["h"] = boxDim.height * 0.5;
        stopA.style.left = boxDim.width * 0.5 - 11 + "px";
        stopB.style.left = boxDim.width * 0.5 - 11 + "px";
        stopC.style.left = boxDim.width * 0.5 - 11 + "px";
        stopD.style.left = boxDim.width * 0.5 - 11 + "px";
        stopE.style.top = boxDim.height * 0.5 - 11 + "px";
        stopH.style.top = boxDim.height * 0.5 - 11 + "px";
        stopF.style.top = boxDim.height * 0.5 - 11 + "px";
        stopG.style.top = boxDim.height * 0.5 - 11 + "px";
        modeSwitch.textContent = "8";
        updateBox();
    }
    //
    else {
        modeSwitch.classList.add("on");
        stopPositions["a"] = boxDim.width * 0.2;
        stopPositions["b"] = boxDim.width * 0.2;
        stopPositions["c"] = boxDim.width * 0.2;
        stopPositions["d"] = boxDim.width * 0.2;
        stopPositions["e"] = boxDim.height * 0.2;
        stopPositions["h"] = boxDim.height * 0.2;
        stopPositions["f"] = boxDim.height * 0.2;
        stopPositions["g"] = boxDim.height * 0.2;
        stopA.style.left = boxDim.width * 0.2 - 11 + "px";
        stopB.style.left = boxDim.width * 0.8 - 11 + "px";
        stopC.style.left = boxDim.width * 0.8 - 11 + "px";
        stopD.style.left = boxDim.width * 0.2 - 11 + "px";
        stopE.style.top = boxDim.height * 0.2 - 11 + "px";
        stopH.style.top = boxDim.height * 0.8 - 11 + "px";
        stopF.style.top = boxDim.height * 0.2 - 11 + "px";
        stopG.style.top = boxDim.height * 0.8 - 11 + "px";
        modeSwitch.textContent = "4";
        updateBox();
    }
});
function handleSizeSwitchClick(e) {
    if (showSize) {
        sizeSwitch.classList.remove("on");
        sizeBarInputs.classList.remove("on");
        showSize = false;
        boxDim.width = boxDim.height =
            Math.min(viewHeight, viewWidth) == viewHeight
                ? viewHeight / 2
                : viewWidth * 0.6;
        box.style.width = box.style.height = boxDim.width + 'px';
    }
    else {
        sizeSwitch.classList.add("on");
        sizeBarInputs.classList.add("on");
        showSize = true;
    }
    updateBox();
}
sizeSwitch.addEventListener("click", handleSizeSwitchClick);
function handleWidthChange() {
    box.style.width = widthMeter.value + "px";
}
function handleHeightChange() {
    box.style.height = heightMeter.value + "px";
}
widthMeter.addEventListener("input", handleWidthChange);
heightMeter.addEventListener("input", handleHeightChange);
function handleBtnClick(e, i) {
    e.preventDefault();
    if (e instanceof MouseEvent) {
        oldX = e.screenX;
        oldY = e.screenY;
    }
    else {
        oldX = e.touches[0].screenX;
        oldY = e.touches[0].screenY;
    }
    oldLeft =
        stops[i].style.left === ""
            ? 0.8 * boxDim.width
            : +stops[i].style.left.substring(0, stops[i].style.left.length - 2);
    oldTop =
        stops[i].style.top === ""
            ? 0.8 * boxDim.height
            : +stops[i].style.top.substring(0, stops[i].style.top.length - 2);
    pressedStops[i] = true;
    pressed = true;
}
for (let i = 0; i < 8; i++) {
    stops[i].addEventListener("mousedown", (e) => handleBtnClick(e, i));
    stops[i].addEventListener("touchstart", (e) => handleBtnClick(e, i));
    stops[i].addEventListener("mouseup", (e) => {
        pressedStops[i] = false;
        pressed = false;
    });
}
function handleMouseUp() {
    for (let i = 0; i < 8; i++) {
        pressedStops[i] = false;
    }
    pressed = false;
}
document.body.addEventListener("mouseup", handleMouseUp);
document.body.addEventListener("touchend", handleMouseUp);
document.body.addEventListener("mousemove", handleMouseMove);
document.body.addEventListener("touchmove", handleMouseMove);
// Wadafaka
function handleMouseMove(e) {
    e.preventDefault();
    let screenX = 0.0;
    let screenY = 0.0;
    if (e instanceof MouseEvent) {
        screenX = e.screenX;
        screenY = e.screenY;
    }
    else {
        screenX = e.touches[0].screenX;
        screenY = e.touches[0].screenY;
    }
    if (pressed) {
        if (pressedStops[0]) {
            stopPositions["a"] = Math.min(Math.max(0, oldLeft + screenX - oldX), boxDim.width);
            stopA.style.left = stopPositions["a"] - 10 + "px";
            if (mode == "normal") {
                stopPositions["b"] = boxDim.width - stopPositions["a"];
                stopB.style.left = stopPositions["a"] - 10 + "px";
            }
        }
        //
        else if (pressedStops[1]) {
            stopPositions["b"] =
                boxDim.width -
                    Math.min(Math.max(0, oldLeft + screenX - oldX), boxDim.width);
            stopB.style.left = boxDim.width - stopPositions["b"] - 9 + "px";
            if (mode == "normal") {
                stopPositions["a"] = boxDim.width - stopPositions["b"];
                stopA.style.left = boxDim.width - stopPositions["b"] - 10 + "px";
            }
        }
        //
        else if (pressedStops[2]) {
            stopPositions["c"] =
                boxDim.width -
                    Math.min(Math.max(0, oldLeft + screenX - oldX), boxDim.width);
            stopC.style.left = boxDim.width - stopPositions["c"] - 10 + "px";
            if (mode == "normal") {
                stopPositions["d"] = boxDim.width - stopPositions["c"];
                stopD.style.left = boxDim.width - stopPositions["c"] - 10 + "px";
            }
        }
        //
        else if (pressedStops[3]) {
            stopPositions["d"] = Math.min(Math.min(Math.max(0, oldLeft + screenX - oldX)), boxDim.width);
            stopD.style.left = stopPositions["d"] - 10 + "px";
            if (mode == "normal") {
                stopPositions["c"] = boxDim.width - stopPositions["d"];
                stopC.style.left = stopPositions["d"] - 10 + "px";
            }
        }
        //
        else if (pressedStops[4]) {
            stopPositions["e"] = Math.min(Math.max(0, oldTop + screenY - oldY), boxDim.height);
            stopE.style.top = stopPositions["e"] - 10 + "px";
            if (mode == "normal") {
                stopPositions["h"] = boxDim.height - stopPositions["e"];
                stopH.style.top = stopPositions["e"] - 10 + "px";
            }
        }
        //
        else if (pressedStops[5]) {
            stopPositions["h"] =
                boxDim.height -
                    Math.min(Math.max(0, oldTop + screenY - oldY), boxDim.height);
            stopH.style.top = boxDim.height - stopPositions["h"] - 10 + "px";
            if (mode == "normal") {
                stopPositions["e"] = boxDim.height - stopPositions["h"];
                stopE.style.top = boxDim.height - stopPositions["h"] - 10 + "px";
            }
        }
        //
        else if (pressedStops[6]) {
            stopPositions["f"] = Math.min(Math.max(0, oldTop + screenY - oldY), boxDim.height);
            stopF.style.top = stopPositions["f"] - 10 + "px";
            if (mode == "normal") {
                stopPositions["g"] = boxDim.height - stopPositions["f"];
                stopG.style.top = stopPositions["f"] - 10 + "px";
            }
        }
        //
        else if (pressedStops[7]) {
            stopPositions["g"] =
                boxDim.height -
                    Math.min(Math.max(0, oldTop + screenY - oldY), boxDim.height);
            stopG.style.top = boxDim.height - stopPositions["g"] - 10 + "px";
            if (mode == "normal") {
                stopPositions["f"] = boxDim.height - stopPositions["g"];
                stopF.style.top = boxDim.height - stopPositions["g"] - 10 + "px";
            }
        }
        updateBox();
    }
}
