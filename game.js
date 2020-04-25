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
  if (key === ' ') {
    newPiece.rotationMovement();
  }
  if (keyCode === LEFT_ARROW) {
    newPiece.x -= boxDimension;
  }
  if (keyCode === RIGHT_ARROW) {
    newPiece.x += boxDimension;
  }
  if (keyCode === DOWN_ARROW) {
    applyGravity();
  }
}
