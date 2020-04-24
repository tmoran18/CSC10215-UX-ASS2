let tetrisBox;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  tetrisBox = new Box(width / 2, height / 2, 20, { r: 250, g: 48, b: 95 });
}

function draw() {
  background(backgroundColor);
  tetrisBox.show();
}
