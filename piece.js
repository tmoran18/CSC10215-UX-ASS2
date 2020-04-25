class Piece {
  constructor(
    originalShape = [[]],
    x = 0,
    y = 0,
    color = { r: 0, g: 0, b: 0 }
  ) {
    this.originalShape = originalShape;
    this.x = x;
    this.y = y;
    this.color = color;
    this.shape = this.fillPiece(originalShape.length);
  }

  fillPiece(pieceLength) {
    return Array.from(new Array(pieceLength), (row, i) =>
      Array.from(new Array(pieceLength), (col, j) =>
        this.originalShape[i][j] == 1
          ? new Box(
              this.x + j * boxDimension,
              this.y + i * boxDimension,
              boxDimension,
              this.color
            )
          : null
      )
    );
  }

  //Tried to replicate the above function in a for loop rather than ES6 syntax
  //   fillPiece2(pieceLength) {
  //     for (let i = 0; i < pieceLength.length; i++) {
  //       for (let j = 0; j < pieceLength.length; j++) {
  //         if (this.originalShape[i][j] == 1) {
  //           return new Box(
  //             this.x + j * boxDimension,
  //             this.y + i * boxDimension,
  //             boxDimension,
  //             this.color
  //           );
  //         } else {
  //           return null;
  //         }
  //       }
  //     }
  //   }

  show() {
    this.shape.forEach((x) =>
      x.filter((j) => j != null).forEach((box) => box.show())
    );
  }
}
