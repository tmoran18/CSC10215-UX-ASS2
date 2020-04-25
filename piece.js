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

  // Creates a tetris piece
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
  // Shows the tetris piece
  show() {
    this.updatePiecePosition();
    this.shape.forEach((x) =>
      x.filter((j) => j != null).forEach((box) => box.show())
    );
  }

  // Update the tetris piece location
  updatePiecePosition() {
    this.shape.forEach((row, i) =>
      row.forEach((col, j) => {
        if (col) {
          col.x = this.x + j * boxDimension;
          col.y = this.y + i * boxDimension;
        }
      })
    );
  }
}

//Tried to replicate the fillPiece() function in a for loop rather than ES6 syntax
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
