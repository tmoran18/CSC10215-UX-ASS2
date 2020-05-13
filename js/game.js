//-------------------------------------------------------------------------
// base helper methods
//-------------------------------------------------------------------------

function get(id) {
  return document.getElementById(id);
}
function hide(id) {
  get(id).style.visibility = 'hidden';
}
function show(id) {
  get(id).style.visibility = null;
}
function html(id, html) {
  get(id).innerHTML = html;
}

function timestamp() {
  return new Date().getTime();
}
function random(min, max) {
  return min + Math.random() * (max - min);
}
function randomChoice(choices) {
  return choices[Math.round(random(0, choices.length - 1))];
}

if (!window.requestAnimationFrame) {
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimationFrame =
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback, element) {
      window.setTimeout(callback, 1000 / 60);
    };
}

//-------------------------------------------------------------------------
// game variables (initialized during reset)
//-------------------------------------------------------------------------

let ucanvas = get('upcoming');
let uctx = ucanvas.getContext('2d');
var dx,
  dy, // pixel size of a single tetris block
  blocks, // 2 dimensional array (nx*ny) representing tetris court - either empty block or occupied by a 'piece'
  actions, // queue of user actions (inputs)
  playing, // true|false - game is in progress
  dt, // time since starting this game
  current, // the current piece
  next, // the next piece
  score, // the current score
  vscore, // the currently displayed score (it catches up to score in small chunks - like a spinning slot machine)
  rows, // number of completed rows in the current game
  step, // how long before current piece drops by 1 row
  level = 1,
  highestScore;

//------------------------------------------------
// do the bit manipulation and iterate through each
// occupied block (x,y) for a given piece
//------------------------------------------------
function eachblock(type, x, y, dir, fn) {
  var bit,
    result,
    row = 0,
    col = 0,
    blocks = type.blocks[dir];
  for (bit = 0x8000; bit > 0; bit = bit >> 1) {
    if (blocks & bit) {
      fn(x + col, y + row);
    }
    if (++col === 4) {
      col = 0;
      ++row;
    }
  }
}

//-----------------------------------------------------
// check if a piece can fit into a position in the grid
//-----------------------------------------------------
function occupied(type, x, y, dir) {
  var result = false;
  eachblock(type, x, y, dir, function (x, y) {
    if (x < 0 || x >= nx || y < 0 || y >= ny || getBlock(x, y)) result = true;
  });
  return result;
}

function unoccupied(type, x, y, dir) {
  return !occupied(type, x, y, dir);
}

//-----------------------------------------
// start with 4 instances of each piece and
// pick randomly until the 'bag is empty'
//-----------------------------------------
var pieces = [];
function randomPiece() {
  if (pieces.length == 0) pieces = [i, i, i, i, j, j, j, j, l, l, l, l, o, o, o, o, s, s, s, s, t, t, t, t, z, z, z, z];
  var type = pieces.splice(random(0, pieces.length - 1), 1)[0];
  return {
    type: type,
    dir: DIR.UP,
    x: Math.round(random(0, nx - type.size)),
    y: 0,
  };
}

//-------------------------------------------------------------------------
// GAME LOOP
//-------------------------------------------------------------------------

function run() {
  addEvents(); // attach keydown and resize events

  var last = (now = timestamp());
  function frame() {
    now = timestamp();
    update(Math.min(1, (now - last) / 1000.0)); // using requestAnimationFrame have to be able to handle large delta's caused when it 'hibernates' in a background or non-visible tab
    draw();
    last = now;
    requestAnimationFrame(frame, canvas);
  }

  resize(); // setup all our sizing information
  reset(); // reset the per-game variables
  frame(); // start the first frame
}

function addEvents() {
  document.addEventListener('keydown', keydown, false);
  window.addEventListener('resize', resize, false);
}

function resize(event) {
  canvas.width = canvas.clientWidth; // set canvas logical size equal to its physical size
  canvas.height = canvas.clientHeight; // (ditto)
  ucanvas.width = ucanvas.clientWidth;
  ucanvas.height = ucanvas.clientHeight;
  dx = canvas.width / nx; // pixel size of a single tetris block
  dy = canvas.height / ny; // (ditto)
  invalidate();
  invalidateNext();
}

function keydown(ev) {
  var handled = false;
  if (playing) {
    switch (ev.keyCode) {
      case KEY.LEFT:
        actions.push(DIR.LEFT);
        handled = true;
        break;
      case KEY.RIGHT:
        actions.push(DIR.RIGHT);
        handled = true;
        break;
      case KEY.UP:
        actions.push(DIR.UP);
        handled = true;
        break;
      case KEY.DOWN:
        actions.push(DIR.DOWN);
        handled = true;
        break;
      case KEY.ESC:
        lose();
        handled = true;
        break;
    }
  } else if (ev.keyCode == KEY.SPACE) {
    play();
    handled = true;
  }
  if (handled) ev.preventDefault(); // prevent arrow keys from scrolling the page (supported in IE9+ and all other browsers)
}

//-------------------------------------------------------------------------
// GAME LOGIC
//-------------------------------------------------------------------------

function play() {
  hide('start');
  reset();
  playing = true;
}
function lose() {
  show('start');
  setVisualScore();
  playing = false;
  setScoreStats();
  window.location.href = 'gameover.html';
}

function setVisualScore(n) {
  vscore = n || score;
  invalidateScore();
}
function setScore(n) {
  score = n;
  setVisualScore(n);
}
function addScore(n) {
  score = score + n;
}
function clearScore() {
  setScore(0);
}
function clearRows() {
  setRows(0);
}
function setRows(n) {
  rows = n;
  step = Math.max(speed.min, speed.start - speed.decrement * rows);
  invalidateRows();
}
function addRows(n) {
  setRows(rows + n);
}
function getBlock(x, y) {
  return blocks && blocks[x] ? blocks[x][y] : null;
}
function setBlock(x, y, type) {
  blocks[x] = blocks[x] || [];
  blocks[x][y] = type;
  invalidate();
}
function clearBlocks() {
  blocks = [];
  invalidate();
}
function clearActions() {
  actions = [];
}
function setCurrentPiece(piece) {
  current = piece || randomPiece();
  invalidate();
}
function setNextPiece(piece) {
  next = piece || randomPiece();
  invalidateNext();
}

function reset() {
  dt = 0;
  clearActions();
  clearBlocks();
  clearRows();
  clearScore();
  setCurrentPiece(next);
  setNextPiece();
}

function update(idt) {
  if (playing) {
    if (vscore < score) setVisualScore(vscore + 1);
    handle(actions.shift());
    dt = dt + idt;
    if (dt > step) {
      dt = dt - step;
      drop();
    }
  }
}

function handle(action) {
  switch (action) {
    case DIR.LEFT:
      move(DIR.LEFT);
      break;
    case DIR.RIGHT:
      move(DIR.RIGHT);
      break;
    case DIR.UP:
      rotate();
      break;
    case DIR.DOWN:
      drop();
      break;
  }
}

function move(dir) {
  var x = current.x,
    y = current.y;
  switch (dir) {
    case DIR.RIGHT:
      x = x + 1;
      break;
    case DIR.LEFT:
      x = x - 1;
      break;
    case DIR.DOWN:
      y = y + 1;
      break;
  }
  if (unoccupied(current.type, x, y, current.dir)) {
    current.x = x;
    current.y = y;
    invalidate();
    return true;
  } else {
    return false;
  }
}

function rotate() {
  var newdir = current.dir == DIR.MAX ? DIR.MIN : current.dir + 1;
  if (unoccupied(current.type, current.x, current.y, newdir)) {
    blockRotate.play();
    current.dir = newdir;
    invalidate();
  }
}

function drop() {
  if (!move(DIR.DOWN)) {
    addScore(10);
    dropPiece();
    blockPlace.play();
    removeLines();
    increaseLevel(); // Author: Tim Moran
    setCurrentPiece(next);
    setNextPiece(randomPiece());
    clearActions();
    if (occupied(current.type, current.x, current.y, current.dir)) {
      lose();
    }
  }
}

function dropPiece() {
  eachblock(current.type, current.x, current.y, current.dir, function (x, y) {
    setBlock(x, y, current.type);
  });
}

function removeLines() {
  var x,
    y,
    complete,
    n = 0;
  for (y = ny; y > 0; --y) {
    complete = true;
    for (x = 0; x < nx; ++x) {
      if (!getBlock(x, y)) complete = false;
    }
    if (complete) {
      removeLine(y);
      y = y + 1; // recheck same line
      n++;
    }
  }
  if (n > 0) {
    addRows(n);
    addScore(100 * Math.pow(2, n - 1)); // 1: 100, 2: 200, 3: 400, 4: 800
    lineComplete.play();
    window.Canvas = new Universe(element);
  }
}

function removeLine(n) {
  var x, y;
  for (y = n; y >= 0; --y) {
    for (x = 0; x < nx; ++x) setBlock(x, y, y == 0 ? null : getBlock(x, y - 1));
  }
}

//-------------------------------------------------------------------------
// RENDERING
//-------------------------------------------------------------------------

var invalid = {};

function invalidate() {
  invalid.court = true;
}
function invalidateNext() {
  invalid.next = true;
}
function invalidateScore() {
  invalid.score = true;
}
function invalidateRows() {
  invalid.rows = true;
}

function draw() {
  ctx.save();
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.translate(0.5, 0.5); // for crisp 1px black lines
  drawCourt();
  drawNext();
  drawScore();
  drawRows();
  drawLevel(); // NEW CODE
  ctx.restore();
}

function drawCourt() {
  if (invalid.court) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (playing) drawPiece(ctx, current.type, current.x, current.y, current.dir);
    var x, y, block;
    for (y = 0; y < ny; y++) {
      for (x = 0; x < nx; x++) {
        if ((block = getBlock(x, y))) drawBlock(ctx, x, y, block.color);
      }
    }
    ctx.strokeRect(0, 0, nx * dx - 1, ny * dy - 1); // court boundary
    invalid.court = false;
  }
}

function drawNext() {
  if (invalid.next) {
    uctx.lineWidth = 2;
    uctx.lineJoin = 'round';
    uctx.lineCap = 'round';
    var padding = (nu - next.type.size) / 2;
    uctx.save();
    uctx.translate(0.5, 0.5);
    uctx.clearRect(0, 0, nu * dx, nu * dy);
    drawPiece(uctx, next.type, padding, padding, next.dir);
    uctx.strokeStyle = 'black';
    uctx.strokeRect(0, 0, nu * dx - 1, nu * dy - 1);

    uctx.restore();
    invalid.next = false;
  }
}

function drawScore() {
  if (invalid.score) {
    html('score', ('00000' + Math.floor(vscore)).slice(-5));
    invalid.score = false;
  }
}

function drawRows() {
  if (invalid.rows) {
    html('rows', rows);
    invalid.rows = false;
  }
}

// Author: Tim Moran
function drawLevel() {
  document.querySelector('#level').innerText = level;
}

// Author: Tim Moran
function increaseLevel() {
  if (score > 499 && score < 1000) {
    level = 2;
    speed.start = 0.55;
    console.log('levelup');
  } else if (score > 999 && score < 1500) {
    level = 3;
    speed.start = 0.5;
  } else if (score > 1499 && score < 2000) {
    level = 4;
    speed.start = 0.45;
  } else if (score > 1999 && score < 2500) {
    level = 5;
    speed.start = 0.4;
  } else if (score > 2499 && score < 3000) {
    level = 6;
    speed.start = 0.35;
  } else if (score > 2999 && score < 3500) {
    level = 7;
    speed.start = 0.3;
  } else if (score > 3499 && score < 4000) {
    level = 8;
    speed.start = 0.25;
  } else if (score > 3999 && score < 4500) {
    level = 9;
    speed.start = 0.2;
  } else if (score > 4499 && score < 5000) {
    level = 10;
    speed.start = 0.15;
  }
}

// Author: Tim Moran
function setScoreStats() {
  localStorage.setItem('score', score);
  localStorage.setItem('level', level);
  localStorage.setItem('lines', rows);
  setHighestScore();
}
// Author: Tim Moran
function setHighestScore() {
  if (localStorage.highestScore) {
    if (localStorage.highestScore < score) {
      localStorage.highestScore = score;
    } else {
      return;
    }
  } else {
    localStorage.setItem('highestScore', score);
  }
}

function drawPiece(ctx, type, x, y, dir) {
  eachblock(type, x, y, dir, function (x, y) {
    drawBlock(ctx, x, y, type.color);
  });
}

function drawBlock(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * dx, y * dy, dx, dy);
  ctx.strokeRect(x * dx, y * dy, dx, dy);
}

//-------------------------------------------------------------------------
// FINALLY, lets run the game
//-------------------------------------------------------------------------

run();

// Animation
