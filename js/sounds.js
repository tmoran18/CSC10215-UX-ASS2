var buttonMouseOnSound;
var buttonMouseOffSound;
var buttonClickSound;
var buttonHoverSound;
var menuMusic;
var musicPlaying;

/* function preload() {
    // ------------------------- Sounds ---------------------------
    buttonMouseOnSound = loadSound('../assets/sounds/menu/button_mouse_on_sound.mp3');
    buttonMouseOffSound = loadSound('../assets/sounds/menu/button_mouse_off_sound.mp3');
    buttonMouseClickSound = loadSound('../assets/sounds/menu/button_click_sound.mp3');
    buttonHoverSound = loadSound('../assets/sounds/menu/button_hover_sound.mp3')

    // ------------------------- Music ----------------------------
    menuMusic = loadSound('../assets/sounds/music/menu_music.mp3');
    gameMusic = loadSound('../assets/sounds/music/game_music.mp3');
} */

/*
    Vanilla JavaScript Alternative to PJ5 Sounds
*/

// Create music Variables
const homeMusic = new Audio('../assets/sounds/music/menu_music.mp3');
const gameMusic = new Audio('../assets/sounds/music/game_music.mp3');
const gameoverMusic = new Audio('../assets/sounds/game/gameover_sound.mp3');
const mouseOnSound = new Audio('../assets/sounds/menu/button_mouse_on_sound.mp3');
const clickSound = new Audio('../assets/sounds/menu/button_click_sound.mp3');

const blockRotate = new Audio('../assets/sounds/game/block_rotate_sound.mp3');
const blockPlace = new Audio('../assets/sounds/game/block_place_sound.mp3');
const levelUp = new Audio('../assets/sounds/game/level_up.wav');
const pressPlay = new Audio('../assets/sounds/game/press_play.wav');
const lineComplete = new Audio('../assets/sounds/game/row_complete/row_complete_sound_1.wav');

// Adjust the volumes
homeMusic.volume = 0.05;
mouseOnSound.volume = 0.07;
gameMusic.volume = 0.07;
blockRotate.volume = 0.05;
blockPlace.volume = 0.05;
gameoverMusic.volume = 0.07;
pressPlay.volume = 0.07;

// Authors: Tim Moran / Rylie Boon-Seaton
// If the url contains X, then play the music specific to that page
if (window.location.pathname.includes('index')) {
  homeMusic.pause();
  homeMusic.loop = true;
} else if (window.location.pathname.includes('game')) {
  gameMusic.play();
  gameMusic.loop = true;
} else if (window.location.pathname.includes('gameover')) {
  gameoverMusic.play();
}

// Author: Tim Moran
// Each mute button on each page has an onclick event for mute()
// The page name is passed into the mute function, which is evaluated in the below switch statment
// The correct music file in then passed to musicPlaying to pause or play the correct music file
function mute(page) {
  switch (page) {
    case 'home':
      musicPlaying = homeMusic;
      break;
    case 'game':
      musicPlaying = gameMusic;
      break;
    default:
      break;
  }
  if (!musicPlaying.paused) {
    musicPlaying.pause();
    document.querySelector('.mute_btn').src = '../assets/images/speaker_mute.png';
  } else {
    musicPlaying.play();
    document.querySelector('.mute_btn').src = '../assets/images/speaker_play.png';
  }
}

/* Author: Tim Moran
 * Loop over all buttons with the .btn class
 * Add event listener for mouseover, play mouse over sound on mouse over
 */
const buttons = document.querySelectorAll('.btn');
for (const button of buttons) {
  button.addEventListener('mouseover', function (event) {
    mouseOnSound.play();
  });
}

// Author Tim Moran
document.querySelector('.play_btn').addEventListener('click', function () {
  pressPlay.play();
});
