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
          : 0
      )
    );
  }
  // Shows the tetris piece
  show() {
    this.updatePiecePosition();
    this.shape.forEach((x) =>
      x.filter((j) => j != 0).forEach((box) => box.show())
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

  rotateMatrix() {
    this.shape.reverse()[0].map((column, index) => {
      this.shape.map((row) => row[index]);
    });
  }

  transpose() {
    let dimension = this.shape.length;
    let aux = Array.from(new Array(dimension), (e) =>
      Array.from(new Array(dimension), (x) => null)
    );
    this.shape.forEach((row, i) => row.forEach((col, j) => (aux[j][i] = col)));
    this.shape = aux;
  }

  rotationMovement() {
    this.transpose();
    this.rotateMatrix();
    this.updatePiecePosition();
  }

  // shape is a dimensional array
  // filter out any boxes that are null
  // filter out any boxes that pass the collission function
  // if higher than 0 - box is colliding
  canCollide(collision) {
    return (
      this.shape.reduce(
        (z, row) =>
          z.concat(
            row.filter((col) => col != null).filter((box) => collision(box))
          ),
        []
      ).length > 0
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
