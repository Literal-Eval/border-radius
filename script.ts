var box             = document.querySelector(".box") as HTMLElement;
var stops           = document.querySelectorAll(".rad-stop") as NodeListOf<HTMLElement>;
var radiusDataText  = document.querySelector(".radius-data-text") as HTMLElement;
var sizeSwitch      = document.querySelector(".switch") as HTMLElement;
var modeSwitch      = document.querySelector(".mode-switch") as HTMLElement;

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
var stopPositions = {
  a: 59,
  b: 41,
  c: 36,
  d: 64,
  e: 57,
  f: 43,
  g: 57,
  h: 43,
};
var pressed = false;
var oldX = 0;
var oldY = 0;
var oldLeft = 0;
var oldTop = 0;
var boxLeft = box.getBoundingClientRect().left;

var viewWidth = 0.0;
var viewHeight = 0.0;
var boxDim = 0.0;

function updateBox(): void {
  var vh = 200 / window.innerHeight;

  box.style.borderRadius = '';
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

modeSwitch.addEventListener("click", (e) => {
  mode = (mode == "normal") ? "abnormal_lol" : "normal";
  
  if (modeSwitch.classList.contains("on")) {
    modeSwitch.classList.remove("on");

    stopPositions['a'] = boxDim * 0.5;
    stopPositions['b'] = boxDim * 0.5;
    stopPositions['c'] = boxDim * 0.5;
    stopPositions['d'] = boxDim * 0.5;
    stopPositions['e'] = boxDim * 0.5;
    stopPositions['f'] = boxDim * 0.5;
    stopPositions['g'] = boxDim * 0.5;
    stopPositions['h'] = boxDim * 0.5;

    stopA.style.left = boxDim * 0.5 + 'px';
    stopB.style.left = boxDim * 0.5 + 'px';
    stopC.style.left = boxDim * 0.5 + 'px';
    stopD.style.left = boxDim * 0.5 + 'px';
    stopE.style.top  = boxDim * 0.5 + 'px';
    stopH.style.top  = boxDim * 0.5 + 'px';
    stopF.style.top  = boxDim * 0.5 + 'px';
    stopG.style.top  = boxDim * 0.5 + 'px';

    updateBox();
  } 
  
  //
  else {
    modeSwitch.classList.add("on");

    stopPositions['a'] = boxDim * 0.2;
    stopPositions['b'] = boxDim * 0.2;
    stopPositions['c'] = boxDim * 0.2;
    stopPositions['d'] = boxDim * 0.2;
    stopPositions['e'] = boxDim * 0.2;
    stopPositions['h'] = boxDim * 0.2;
    stopPositions['f'] = boxDim * 0.2;
    stopPositions['g'] = boxDim * 0.2;

    stopA.style.left = boxDim * 0.2 + 'px';
    stopB.style.left = boxDim * 0.8 + 'px';
    stopC.style.left = boxDim * 0.8 + 'px';
    stopD.style.left = boxDim * 0.2 + 'px';
    stopE.style.top  = boxDim * 0.2 + 'px';
    stopH.style.top  = boxDim * 0.8 + 'px';
    stopF.style.top  = boxDim * 0.2 + 'px';
    stopG.style.top  = boxDim * 0.8 + 'px';

    updateBox();
  }
});

sizeSwitch.addEventListener("click", (e) => {
  if (showSize) {
    sizeSwitch.classList.remove("on");
    showSize = false;
  } else {
    sizeSwitch.classList.add("on");
    showSize = true;
  }
});

function updateDim(): void {
  viewWidth = window.innerWidth;
  viewHeight = window.innerHeight;
  boxDim = viewHeight / 2;
}

updateDim();
window.addEventListener("resize", updateDim);

for (let i: number = 0; i < 4; i++) {
  stops[i].addEventListener("mousedown", (e) => {
    oldX = e.screenX;
    oldLeft =
      stops[i].style.left === ""
        ? 0
        : +stops[i].style.left.substring(0, stops[i].style.left.length - 2);
    pressedStops[i] = true;
    pressed = true;
  });

  stops[i].addEventListener("mouseup", (e) => {
    pressedStops[i] = false;
    pressed = false;
  });
}

for (let i: number = 4; i < 8; i++) {
  stops[i].addEventListener("mousedown", (e) => {
    oldY = e.screenY;
    oldTop =
      stops[i].style.top === ""
        ? 0
        : +stops[i].style.top.substring(0, stops[i].style.top.length - 2);
    pressedStops[i] = true;
    pressed = true;
  });

  stops[i].addEventListener("mouseup", (e) => {
    pressedStops[i] = false;
    pressed = false;
  });
}

document.body.addEventListener("mouseup", (e) => {
  pressedStops[0] = false;
  pressed = false;
});

// Shitty Code

document.body.addEventListener("mousemove", (e) => {
  if (pressed) {
    if (pressedStops[0]) {
      stopPositions["a"] = Math.min(
        Math.max(0, oldLeft + e.screenX - oldX),
        boxDim
      );
      stopA.style.left = stopPositions["a"] + "px";

      if (mode == "normal") {
        stopPositions["b"] = boxDim - stopPositions["a"];
        stopB.style.left = stopPositions["a"] + "px";
      }
    }

    //
    else if (pressedStops[1]) {
      stopPositions["b"] =
        boxDim - Math.min(Math.max(0, oldLeft + e.screenX - oldX), boxDim);
      stopB.style.left = boxDim - stopPositions["b"] + "px";

      if (mode == "normal") {
        stopPositions["a"] = boxDim - stopPositions["b"];
        stopA.style.left = boxDim - stopPositions["b"] + "px";
      }
    }

    //
    else if (pressedStops[2]) {
      stopPositions["c"] =
        boxDim - Math.min(Math.max(0, oldLeft + e.screenX - oldX), boxDim);
      stopC.style.left = boxDim - stopPositions["c"] + "px";

      if (mode == "normal") {
        stopPositions["d"] = boxDim - stopPositions["c"];
        stopD.style.left = boxDim - stopPositions["c"] + "px";
      }
    }

    //
    else if (pressedStops[3]) {
      stopPositions["d"] = Math.min(
        Math.min(Math.max(0, oldLeft + e.screenX - oldX)),
        boxDim
      );
      stopD.style.left = stopPositions["d"] + "px";

      if (mode == "normal") {
        stopPositions["c"] = boxDim - stopPositions["d"];
        stopC.style.left = stopPositions["d"] + "px";
      }
    }

    //
    else if (pressedStops[4]) {
      stopPositions["e"] = Math.min(
        Math.max(0, oldTop + e.screenY - oldY),
        boxDim
      );
      stopE.style.top = stopPositions["e"] + "px";

      if (mode == "normal") {
        stopPositions["h"] = boxDim - stopPositions["e"];
        stopH.style.top = stopPositions["e"] + "px";
      }
    }

    //
    else if (pressedStops[5]) {
      stopPositions["h"] =
        boxDim - Math.min(Math.max(0, oldTop + e.screenY - oldY), boxDim);
      stopH.style.top = boxDim - stopPositions["h"] + "px";

      if (mode == "normal") {
        stopPositions["e"] = boxDim - stopPositions["h"];
        stopE.style.top = boxDim - stopPositions["h"] + "px";
      }
    }

    //
    else if (pressedStops[6]) {
      stopPositions["f"] = Math.min(
        Math.max(0, oldTop + e.screenY - oldY),
        boxDim
      );
      stopF.style.top = stopPositions["f"] + "px";

      if (mode == "normal") {
        stopPositions["g"] = boxDim - stopPositions["f"];
        stopG.style.top = stopPositions["f"] + "px";
      }
    }

    //
    else if (pressedStops[7]) {
      stopPositions["g"] =
        boxDim - Math.min(Math.max(0, oldTop + e.screenY - oldY), boxDim);
      stopG.style.top = boxDim - stopPositions["g"] + "px";

      if (mode == "normal") {
        stopPositions["f"] = boxDim - stopPositions["g"];
        stopF.style.top = boxDim - stopPositions["g"] + "px";
      }
    }

    updateBox();
  }
});
