//-------------------------------------------------------------------------
// game constants
//-------------------------------------------------------------------------

let KEY = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
let DIR = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3, MIN: 0, MAX: 3 };
//stats = new Stats(),
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let speed = { start: 0.6, decrement: 0.005, min: 0.1 }; // how long before piece drops by 1 row (seconds)
let nx = 10; // width of tetris court (in blocks)
let ny = 20; // height of tetris court (in blocks)
let nu = 5; // width/height of upcoming preview (in blocks)

//-------------------------------------------------------------------------
// tetris pieces
//
// blocks: each element represents a rotation of the piece (0, 90, 180, 270)
//         each element is a 16 bit integer where the 16 bits represent
//         a 4x4 set of blocks, e.g. j.blocks[0] = 0x44C0
//
//             0100 = 0x4 << 3 = 0x4000
//             0100 = 0x4 << 2 = 0x0400
//             1100 = 0xC << 1 = 0x00C0
//             0000 = 0x0 << 0 = 0x0000
//                               ------
//                               0x44C0
//
//-------------------------------------------------------------------------

var i = {
  size: 4,
  blocks: [0x0f00, 0x2222, 0x00f0, 0x4444],
  color: '#14AA5B',
};
var j = {
  size: 3,
  blocks: [0x44c0, 0x8e00, 0x6440, 0x0e20],
  color: '#00ACED',
};
var l = {
  size: 3,
  blocks: [0x4460, 0x0e80, 0xc440, 0x2e00],
  color: '#F27521',
};
var o = {
  size: 2,
  blocks: [0xcc00, 0xcc00, 0xcc00, 0xcc00],
  color: '#FFF109',
};
var s = {
  size: 3,
  blocks: [0x06c0, 0x8c40, 0x6c00, 0x4620],
  color: '#ED2b2d',
};
var t = {
  size: 3,
  blocks: [0x0e40, 0x4c40, 0x4e00, 0x4640],
  color: '#C71A8D',
};
var z = {
  size: 3,
  blocks: [0x0c60, 0x4c80, 0xc600, 0x2640],
  color: '#323393',
};
