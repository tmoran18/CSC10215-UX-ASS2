class Platform {
  constructor(
    platform = [[]],
    x = 0,
    y = 0,
    dimension = boxDimension,
    color = { r: 255, g: 255, b: 255 }
  ) {
    this.platform = platform;
    this.dimension = dimension;
    this.color = color;
    this.x = x;
    this.y = y;
    this.generatePlatform();
  }

  generatePlatform() {
    let platformLength = canvasWidth / this.dimension;
    this.platform = Array.from(new Array(platformLength), (row) =>
      Array.from(new Array(platformLength), (col) => null)
    );
  }

  show() {
    this.platform.forEach((row, i) =>
      row.forEach((box, j) =>
        box === null ? this.showEmptyBox(j, i) : box.show()
      )
    );
  }

  placePiece(newPiece) {
    newPiece.shape
      .reduce((z, row) => z.concat(row.filter((col) => col != null)), [])
      .forEach(
        (box) =>
          (this.platform[box.y / boxDimension][box.x / boxDimension] = box)
      )
      .forEach();
  }
}
