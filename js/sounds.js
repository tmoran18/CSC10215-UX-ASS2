var buttonMouseOnSound;
var buttonMouseOffSound;
var buttonClickSound;
var buttonHoverSound;
var menuMusic

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
const gameoverMusic = new Audio('../assets/sounds/game/gameover_sound.mp3')
const mouseOnSound = new Audio('../assets/sounds/menu/button_mouse_on_sound.mp3');
const clickSound = new Audio('../assets/sounds/menu/button_click_sound.mp3');

const blockRotate = new Audio('../assets/sounds/game/block_rotate_sound.mp3');
const blockPlace = new Audio('../assets/sounds/game/block_place_sound.mp3');

// Adjust the volumes
homeMusic.volume = 0.05;
mouseOnSound.volume = 0.07;
gameMusic.volume = 0.07;
blockRotate.volume = 0.05;
blockPlace.volume = 0.05;
gameoverMusic.volume = 0.07;

// Event Listeners
document.querySelector('.mute_btn').addEventListener('click', mute);

// If the url contains X, then play the music specific to that page
if (window.location.pathname.includes('index')) {
    homeMusic.play();
    homeMusic.loop = true;
} else if (window.location.pathname.includes('game')) {
    gameMusic.play();
    gameMusic.loop = true;
    // add in the music file location
    // adjust volume
    // play()
    // loop
} else if (window.location.pathname.includes('gameover')) {
    gameoverMusic.play();
}


// Mute/Unmute the music if speaker icon clicked on
function mute() {
    if (!homeMusic.paused) {
        homeMusic.pause();
        document.querySelector('.mute_btn').src = "../assets/images/speaker_mute.png";
    } else {
        homeMusic.play();
        document.querySelector('.mute_btn').src = "../assets/images/speaker_play.png";
    }
}

/* 
* Loop over all buttons with the .btn class
* Add event listener for mouseover, play mouse over sound on mouse over
*/
const buttons = document.querySelectorAll('.btn');
for (const button of buttons) {
    button.addEventListener('mouseover', function (event) {
        mouseOnSound.play();
    })
}
