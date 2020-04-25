let tetrisBox;
let newPiece;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  newPiece = new Piece(piece_J, width / 2, boxDimension, {
    r: 250,
    g: 48,
    b: 95,
  });
  // Uses a timer and applyGravity function to move pieces down
  // Speed of gravity can be changed by modifying the timer
  setInterval(() => applyGravity(), timer);
}

function draw() {
  background(backgroundColor);
  newPiece.show();
}

// Each second(timer) box will move 30px(boxDimension)
function applyGravity() {
  newPiece.y += boxDimension;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    newPiece.rotationMovement();
  }
}
