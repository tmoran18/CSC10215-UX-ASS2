let tetrisBox;
let newPiece;
let platform;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  platform = new Platform();
  generateNewPiece();
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
  if (!newPiece.canCollide((box) => box.y === height - 30)) {
    newPiece.y += boxDimension;
  } else {
    platform.placePiece(newPiece);
    generateNewPiece();
  }
}
function generateNewPiece() {
  let index = Math.floor(Math.random() * pieces.length);
  newPiece = new Piece(pieces[index], width / 2, boxDimension, {
    r: 150,
    g: 48,
    b: 95,
  });
}

function keyPressed() {
  if (key === ' ') {
    newPiece.rotationMovement();
  }
  if (keyCode === LEFT_ARROW && !newPiece.canCollide((box) => box.x === 0)) {
    newPiece.x -= boxDimension;
  }
  if (
    keyCode === RIGHT_ARROW &&
    !newPiece.canCollide((box) => box.x + boxDimension === width)
  ) {
    newPiece.x += boxDimension;
  }
  if (keyCode === DOWN_ARROW) {
    applyGravity();
  }
}
