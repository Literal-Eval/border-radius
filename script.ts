var box = document.querySelector(".box") as HTMLElement;
var stops = document.querySelectorAll(".rad-stop") as NodeListOf<HTMLElement>;
var radiusDataText = document.querySelector(".radius-data-text") as HTMLElement;
var sizeSwitch = document.querySelector(".switch") as HTMLElement;
var modeSwitch = document.querySelector(".mode-switch") as HTMLElement;
var copyButton = document.querySelector(".btn-copy") as HTMLElement;
var copyInfo = document.querySelector(".copied-info") as HTMLElement;

var mode: string = "normal";
var showSize: boolean = false;

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
var boxDim = 0.0;

function updateDim(): void {
  viewWidth = window.innerWidth;
  viewHeight = window.innerHeight;
  boxDim =
    Math.min(viewHeight, viewWidth) == viewHeight
      ? viewHeight / 2
      : viewWidth * 0.6;
}

updateDim();
window.addEventListener("resize", updateDim);

var stopPositions = {
  a: 0.8 * boxDim,
  b: 0.2 * boxDim,
  c: 0.2 * boxDim,
  d: 0.8 * boxDim,
  e: 0.8 * boxDim,
  f: 0.8 * boxDim,
  g: 0.2 * boxDim,
  h: 0.2 * boxDim,
};

function updateBox(): void {
  let vh = viewHeight < viewWidth ? 200 / viewHeight : 500 / (3 * viewWidth);

  box.style.borderRadius = `${Math.round(stopPositions["a"] * vh)}%
    ${Math.round(stopPositions["b"] * vh)}%
    ${Math.round(stopPositions["c"] * vh)}%
    ${Math.round(stopPositions["d"] * vh)}% / 
    ${Math.round(stopPositions["e"] * vh)}%
    ${Math.round(stopPositions["f"] * vh)}%
    ${Math.round(stopPositions["g"] * vh)}%
    ${Math.round(stopPositions["h"] * vh)}%`;

  radiusDataText.textContent = box.style.borderRadius;
}

updateBox();

async function handleCopy(e: MouseEvent): Promise<void> {
  e.preventDefault();
  
  copyInfo.style.opacity = "100%";

  setTimeout(() => {
    copyInfo.style.opacity = "0%";
  }, 5000);

  await navigator.clipboard.writeText(
    "border-radius: " + box.style.borderRadius + ";"
  );
}

copyButton.addEventListener("click", handleCopy);

// Code that'll make you say BRUH in French

modeSwitch.addEventListener("click", (e) => {
  mode = mode == "normal" ? "abnormal_lol" : "normal";

  if (modeSwitch.classList.contains("on")) {
    modeSwitch.classList.remove("on");

    stopPositions["a"] = boxDim * 0.5;
    stopPositions["b"] = boxDim * 0.5;
    stopPositions["c"] = boxDim * 0.5;
    stopPositions["d"] = boxDim * 0.5;
    stopPositions["e"] = boxDim * 0.5;
    stopPositions["f"] = boxDim * 0.5;
    stopPositions["g"] = boxDim * 0.5;
    stopPositions["h"] = boxDim * 0.5;

    stopA.style.left = boxDim * 0.5 - 11 + "px";
    stopB.style.left = boxDim * 0.5 - 11 + "px";
    stopC.style.left = boxDim * 0.5 - 11 + "px";
    stopD.style.left = boxDim * 0.5 - 11 + "px";
    stopE.style.top = boxDim * 0.5 - 11 + "px";
    stopH.style.top = boxDim * 0.5 - 11 + "px";
    stopF.style.top = boxDim * 0.5 - 11 + "px";
    stopG.style.top = boxDim * 0.5 - 11 + "px";

    modeSwitch.textContent = "8";
    updateBox();
  }

  //
  else {
    modeSwitch.classList.add("on");

    stopPositions["a"] = boxDim * 0.2;
    stopPositions["b"] = boxDim * 0.2;
    stopPositions["c"] = boxDim * 0.2;
    stopPositions["d"] = boxDim * 0.2;
    stopPositions["e"] = boxDim * 0.2;
    stopPositions["h"] = boxDim * 0.2;
    stopPositions["f"] = boxDim * 0.2;
    stopPositions["g"] = boxDim * 0.2;

    stopA.style.left = boxDim * 0.2 - 11 + "px";
    stopB.style.left = boxDim * 0.8 - 11 + "px";
    stopC.style.left = boxDim * 0.8 - 11 + "px";
    stopD.style.left = boxDim * 0.2 - 11 + "px";
    stopE.style.top = boxDim * 0.2 - 11 + "px";
    stopH.style.top = boxDim * 0.8 - 11 + "px";
    stopF.style.top = boxDim * 0.2 - 11 + "px";
    stopG.style.top = boxDim * 0.8 - 11 + "px";

    modeSwitch.textContent = "4";
    updateBox();
  }
});

function handleSizeSwitchClick(e: MouseEvent | TouchEvent): void {
  if (showSize) {
    sizeSwitch.classList.remove("on");
    showSize = false;
  } else {
    sizeSwitch.classList.add("on");
    showSize = true;
  }
}

sizeSwitch.addEventListener("click", handleSizeSwitchClick);

function handleBtnClick(e: TouchEvent | MouseEvent, i: number): void {
  e.preventDefault();

  if (e instanceof MouseEvent) {
    oldX = e.screenX;
    oldY = e.screenY;
  } else {
    oldX = e.touches[0].screenX;
    oldY = e.touches[0].screenY;
  }

  oldLeft =
    stops[i].style.left === ""
      ? 0.8 * boxDim
      : +stops[i].style.left.substring(0, stops[i].style.left.length - 2);

  oldTop =
    stops[i].style.top === ""
      ? 0.8 * boxDim
      : +stops[i].style.top.substring(0, stops[i].style.top.length - 2);

  pressedStops[i] = true;
  pressed = true;
}

for (let i: number = 0; i < 8; i++) {
  stops[i].addEventListener("mousedown", (e) => handleBtnClick(e, i));
  stops[i].addEventListener("touchstart", (e) => handleBtnClick(e, i));

  stops[i].addEventListener("mouseup", (e) => {
    pressedStops[i] = false;
    pressed = false;
  });
}

function handleMouseUp(): void {
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

function handleMouseMove(e: MouseEvent | TouchEvent): void {
  e.preventDefault();
  let screenX: number = 0.0;
  let screenY: number = 0.0;

  if (e instanceof MouseEvent) {
    screenX = e.screenX;
    screenY = e.screenY;
  } else {
    screenX = e.touches[0].screenX;
    screenY = e.touches[0].screenY;
  }

  if (pressed) {
    if (pressedStops[0]) {
      stopPositions["a"] = Math.min(
        Math.max(0, oldLeft + screenX - oldX),
        boxDim
      );
      stopA.style.left = stopPositions["a"] - 10 + "px";

      if (mode == "normal") {
        stopPositions["b"] = boxDim - stopPositions["a"];
        stopB.style.left = stopPositions["a"] - 10 + "px";
      }
    }

    //
    else if (pressedStops[1]) {
      stopPositions["b"] =
        boxDim - Math.min(Math.max(0, oldLeft + screenX - oldX), boxDim);
      stopB.style.left = boxDim - stopPositions["b"] - 9 + "px";

      if (mode == "normal") {
        stopPositions["a"] = boxDim - stopPositions["b"];
        stopA.style.left = boxDim - stopPositions["b"] - 10 + "px";
      }
    }

    //
    else if (pressedStops[2]) {
      stopPositions["c"] =
        boxDim - Math.min(Math.max(0, oldLeft + screenX - oldX), boxDim);
      stopC.style.left = boxDim - stopPositions["c"] - 10 + "px";

      if (mode == "normal") {
        stopPositions["d"] = boxDim - stopPositions["c"];
        stopD.style.left = boxDim - stopPositions["c"] - 10 + "px";
      }
    }

    //
    else if (pressedStops[3]) {
      stopPositions["d"] = Math.min(
        Math.min(Math.max(0, oldLeft + screenX - oldX)),
        boxDim
      );
      stopD.style.left = stopPositions["d"] - 10 + "px";

      if (mode == "normal") {
        stopPositions["c"] = boxDim - stopPositions["d"];
        stopC.style.left = stopPositions["d"] - 10 + "px";
      }
    }

    //
    else if (pressedStops[4]) {
      stopPositions["e"] = Math.min(
        Math.max(0, oldTop + screenY - oldY),
        boxDim
      );
      stopE.style.top = stopPositions["e"] - 10 + "px";

      if (mode == "normal") {
        stopPositions["h"] = boxDim - stopPositions["e"];
        stopH.style.top = stopPositions["e"] - 10 + "px";
      }
    }

    //
    else if (pressedStops[5]) {
      stopPositions["h"] =
        boxDim - Math.min(Math.max(0, oldTop + screenY - oldY), boxDim);
      stopH.style.top = boxDim - stopPositions["h"] - 10 + "px";

      if (mode == "normal") {
        stopPositions["e"] = boxDim - stopPositions["h"];
        stopE.style.top = boxDim - stopPositions["h"] - 10 + "px";
      }
    }

    //
    else if (pressedStops[6]) {
      stopPositions["f"] = Math.min(
        Math.max(0, oldTop + screenY - oldY),
        boxDim
      );
      stopF.style.top = stopPositions["f"] - 10 + "px";

      if (mode == "normal") {
        stopPositions["g"] = boxDim - stopPositions["f"];
        stopG.style.top = stopPositions["f"] - 10 + "px";
      }
    }

    //
    else if (pressedStops[7]) {
      stopPositions["g"] =
        boxDim - Math.min(Math.max(0, oldTop + screenY - oldY), boxDim);
      stopG.style.top = boxDim - stopPositions["g"] - 10 + "px";

      if (mode == "normal") {
        stopPositions["f"] = boxDim - stopPositions["g"];
        stopF.style.top = boxDim - stopPositions["g"] - 10 + "px";
      }
    }

    updateBox();
  }
}
