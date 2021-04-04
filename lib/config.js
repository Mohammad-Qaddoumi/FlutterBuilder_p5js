let screensArray = [];
let selectedScreen = 0;
let mainParticleArray = [];
let unSortedWidjets = [];

const vline = {
    x1: 100,
    y1: 0,
    x2: 100,
    y2: 603
}

let selected = null;
let count = 1;
let img;
let chkorentaion = false;
let showBar = true;

let canvasWidth = 715;
let canvasHeight = 601; 

let topLeft    = {X : 267, Y : 35};
let topRight   = {X : 528, Y : 35};
let bottonLeft = {X : 267, Y : 582};
let topLeft_O    = {X : 133, Y : 168};
let topRight_O   = {X : 682, Y : 168};
let bottonLeft_O = {X : 133, Y : 432};

let rows = 1;
let columns = 1;
let rowGap = topRight.X - topLeft.X;    
let columnGap = bottonLeft.Y - topLeft.Y;
let rowGap_O = topRight_O.X - topLeft_O.X;    
let columnGap_O = bottonLeft_O.Y - topLeft_O.Y;

let gridPoints = {
    X: topLeft.X,
    Y: topLeft.Y,
    X_O: topLeft_O.X,
    Y_O: topLeft_O.Y,
    W: rowGap,
    H : columnGap,
    W_O: rowGap_O,
    H_O: columnGap_O
}

let font;
let updateison = false;
let modelPhone;
let bg_phone_forModel;
let txtUpdating;
let spin = 0;