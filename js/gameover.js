// Star Animation
var gameOverPage = document.querySelector('.gameover_bg');
for (let i = 0; i < 50; i++) {
    const delay = Math.random() + 's';
    const el = document.createElement('img')
    el.src = '../asssets/images/star.png';
    el.className = 'glitter-star'
    el.style.top = random() + '%'
    el.style.left = random() + '%'
    el.style.animationDelay = delay
    el.style.msAnimationDelay = delay
    el.style.webkitAnimationDelay = delay
    el.style.monAnimationDelay = delay
    gameOverPage.appendChild(el)
}

function random() {
    let r = 50;
    while (40 < r && r < 60) {
        r = Math.random() * 100;
    }
    return r;
}