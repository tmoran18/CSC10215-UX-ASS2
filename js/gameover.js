// Author: Tim Moran
// Get the score & stats from local storage and store in variables
// Game Over page to display when player has failed to remove blocks within the time provided.

let gameoverScore = localStorage.getItem('score');
let gameoverLevel = localStorage.getItem('level');
let gameoverLines = localStorage.getItem('lines');
let gameoverHighScore = localStorage.getItem('highestScore');

// Author: Tim Moran
// Set the score & stats to HTML elements
document.querySelector('#id_score').innerText = gameoverScore;
document.querySelector('#id_level').innerText = gameoverLevel;
document.querySelector('#id_lines').innerText = gameoverLines;
document.querySelector('.highScore').innerText = gameoverHighScore;

//Author: BC Rikko - JS Fiddle
// Glitter Star Animation
// Some extension with Imagery by Tim Moran
var gameOverPage = document.querySelector('.gameover_bg');
for (let i = 0; i < 50; i++) {
  const delay = Math.random() + 's';
  const el = document.createElement('img');
  el.src = '../assets/images/star.png';
  el.className = 'glitter-star';
  el.style.top = random() + '%';
  el.style.left = random() + '%';
  el.style.animationDelay = delay;
  el.style.msAnimationDelay = delay;
  el.style.webkitAnimationDelay = delay;
  el.style.monAnimationDelay = delay;
  gameOverPage.appendChild(el);
}

//Author: BC Rikko - JS Fiddle - https://jsfiddle.net/bc_rikko/qwbfkv6y/2/
// Random function to use in the star animation
function random() {
  let r = 50;
  while (40 < r && r < 60) {
    r = Math.random() * 100;
  }
  return r;
}
