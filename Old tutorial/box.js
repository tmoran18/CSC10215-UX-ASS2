// This class is the sqaures that make up the tetris pieces

class Box {
  constructor(
    x = 0,
    y = 0,
    boxD = this.boxDimension,
    color = { r: 0, g: 0, b: 0 }
  ) {
    this.x = x; // position of box on screen x
    this.y = y; // position of box on screen y
    this.boxD = boxD;
    this.color = color;
  }

  show() {
    let { r, g, b } = this.color;
    fill(r, g, b);
    rect(this.x, this.y, this.boxD, this.boxD);
  }
}
