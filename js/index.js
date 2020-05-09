var buttonMouseOnSound;
var buttonMouseOffSound;
var buttonClickSound;
var buttonHoverSound;
var menuMusic

function preload() {
    // ------------------------- Sounds ---------------------------
    buttonMouseOnSound = loadSound('assets/sounds/menu/button_mouse_on_sound.mp3');
    buttonMouseOffSound = loadSound('assets/sounds/menu/button_mouse_off_sound.mp3');
    buttonMouseClickSound = loadSound('assets/sounds/menu/button_click_sound.mp3');
    buttonHoverSound = loadSound('assets/sounds/menu/button_hover_sound.mp3')

    // ------------------------- Music ----------------------------
    menuMusic = loadSound('asssets/sounds/music/menu_music.mp3')
}

var menuMusic = new Audio('../asssets/sounds/music/menu_music.mp3');
menuMusic.volume = 0.03;
menuMusic.play();
menuMusic.loop = true;


// Mute the music
function mute() {
    if (!menuMusic.paused) {
        menuMusic.pause();
        userPausedMusic = true;
        document.querySelector('.mute_btn').src = "../asssets/images/speaker_mute.png";
    } else {
        menuMusic.play();
        userPausedMusic = false;
        document.querySelector('.mute_btn').src = "../asssets/images/speaker_play.png";
    }
}

document.querySelector('.mute_btn').addEventListener('click', mute);