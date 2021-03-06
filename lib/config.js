const canvasWidth = 715;
const canvasHeight = 601; 

const vline = {
    x1: 100,
    y1: 0,
    x2: 100,
    y2: canvasHeight + 5
}

// let chkorentaion = false;
let count = 1;

const topLeft    = {X : 267, Y : 35};
const topRight   = {X : 528, Y : 35};
const bottonLeft = {X : 267, Y : 582};
const topLeft_O    = {X : 133, Y : 168};
const topRight_O   = {X : 682, Y : 168};
const bottonLeft_O = {X : 133, Y : 432};

const rowGap = topRight.X - topLeft.X;    
const columnGap = bottonLeft.Y - topLeft.Y;
const rowGap_O = topRight_O.X - topLeft_O.X;    
const columnGap_O = bottonLeft_O.Y - topLeft_O.Y;

const gridPoints = {
    X: topLeft.X,
    Y: topLeft.Y,
    X_O: topLeft_O.X,
    Y_O: topLeft_O.Y,
    W: rowGap,
    H : columnGap,
    W_O: rowGap_O,
    H_O: columnGap_O
}

export default {
    gridPoints,
    canvasWidth,
    canvasHeight,
    vline,
    count
}