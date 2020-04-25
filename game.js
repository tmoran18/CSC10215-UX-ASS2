let tetrisBox;
let myPiece;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  //   tetrisBox = new Box(width / 2, height / 2, boxDimension, {
  //     r: 250,
  //     g: 48,
  //     b: 95,
  //   });
  myPiece = new Piece(piece_S, width / 2, boxDimension, {
    r: 250,
    g: 48,
    b: 95,
  });
  //setInterval(() => applyGravity(), timer);
}

function draw() {
  background(backgroundColor);
  //tetrisBox.show();
  myPiece.show();
}

// Each second(timer) box will move 30px(boxDimension)
function applyGravity() {
  tetrisBox.y += boxDimension;
}
