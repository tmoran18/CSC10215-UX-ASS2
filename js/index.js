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
    menuMusic = loadSound('assets/sounds/music/menu_music.mp3')
}



