score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        avatar = document.querySelector('.avatar');
        avatar.classList.add('animateAvatar');
        setTimeout(() => {
            avatar.classList.remove('animateAvatar')
        }, 700);
    }
    if (e.keyCode == 39) {
        avatar = document.querySelector('.avatar');
        avatarX = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('left'));
        avatar.style.left = avatarX + 112 + "px";
    }
    if (e.keyCode == 37) {
        avatar = document.querySelector('.avatar');
        avatarX = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('left'));
        avatar.style.left = (avatarX - 112) + "px";
    }
}

setInterval(() => {
    avatar = document.querySelector('.avatar');
    gameOver = document.querySelector('.gameOver');
    enemy = document.querySelector('.enemy');

    dx = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        enemy.classList.remove('enemyAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(enemy, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            enemy.style.animationDuration = newDur + 's';
            
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}