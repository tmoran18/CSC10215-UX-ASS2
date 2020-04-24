// This class is the sqaures that make up the tetris pieces

class Box {
  constructor(x = 0, y = 0, boxDimension = 60, color = { r: 0, g: 0, b: 0 }) {
    this.x = x;
    this.y = y;
    this.boxDimension = boxDimension;
    this.color = color;
  }

  show() {
    let { r, g, b } = this.color;
    fill(r, g, b);
    rect(this.x, this.y, this.boxDimension, this.boxDimension);
  }
}
